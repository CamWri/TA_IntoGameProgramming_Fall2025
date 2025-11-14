class HealthPoolController extends Component{
    currentHP
    maxHP 

    isInvulnerable = false
    invulnerableCurrentTime = 0
    invulnerableLength = 1

    hasInvulnerability = false

    update(){
        if(this.isInvulnerable){
            this.invulnerableCurrentTime += Time.deltaTime
        }

        if(this.invulnerableCurrentTime > this.invulnerableLength){
            this.invulnerableCurrentTime = 0
            this.isInvulnerable = false
        }
    }

    applyDamage(damage){
        if(this.gameObject.getComponent(Polygon).opacity == 1){
            if(!this.isInvulnerable){
                this.currentHP = Math.max(this.currentHP - damage, 0)

                this.gameObject.getComponent(HitEffectController)?.setHitEffect(0.1)

                let damageTextGameObject = instantiate(new DamageTextGameObject(damage), new Vector2(this.transform.position.x + 20, this.transform.position.y - 20))
                damageTextGameObject.transform.scale = new Vector2(1, 1)

                this.isInvulnerable = this.hasInvulnerability
            }

            if(this.currentHP === 0){
                let fadingComponent = this.gameObject.getComponent(FadingController)

                if(fadingComponent != null){
                    fadingComponent.startFading(0.5)
                } else {
                    this.gameObject.destroy()
                }
            }
        }
    }
}