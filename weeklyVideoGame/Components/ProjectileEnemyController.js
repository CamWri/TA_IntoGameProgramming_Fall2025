class ProjectileEnemeyController extends Component{
    fireRadius = 600
    
    nextShotTime = 3
    currentTime = 3

    start(){
        this.rigidBody = this.gameObject.getComponent(RigidBody)
        this.playerGameObject = GameObject.find("Player Game Object")
    }

    update(){
        this.currentTime += Time.deltaTime

        let diff = this.playerGameObject.transform.position.minus(this.transform.position).clone()
        let opacity = this.playerGameObject.getComponent(Polygon).opacity

        if(diff && opacity == 1){
            if(Math.sqrt((diff.x) ** 2 + (diff.y) ** 2) < this.fireRadius && this.currentTime > this.nextShotTime){
                this.currentTime = 0
                let angleRad = Math.atan2(diff.y, diff.x)

                let offsetX = Math.cos(angleRad) * this.transform.scale.x
                let offsetY = Math.sin(angleRad) * this.transform.scale.y

                instantiate(new EnemyThrowableProjectileGameObject(), new Vector2(this.transform.position.x + offsetX, this.transform.position.y + offsetY))
            }
        }
    }

    onCollisionEnter(other){
        if(other.name == "Platform Game Object"){
            this.rigidBody.velocity.y = 20
        }

        const opacity = this.playerGameObject.getComponent(Polygon).opacity

        if(other.name == "Player Game Object" && opacity == 1){
            other.getComponent(HealthPoolController).applyDamage(1)
        }
    }
}