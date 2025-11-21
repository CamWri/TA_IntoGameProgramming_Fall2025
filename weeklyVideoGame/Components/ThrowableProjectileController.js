class ThrowableProjectileController extends Component{
    angle

    speed = 50000

    start(){
        this.ridigBody = this.gameObject.getComponent(RigidBody)

        this.ridigBody.gravity.y = 512

        this.ridigBody.velocity.x = Math.cos(this.angle) * this.speed * Time.deltaTime
        this.ridigBody.velocity.y = Math.sin(this.angle) * this.speed * Time.deltaTime
    }

    update(){
        if(this.ridigBody.velocity.x !== 0 || this.ridigBody.velocity.y !== 0){
            this.transform.rotation = Math.atan2(this.ridigBody.velocity.y, this.ridigBody.velocity.x)
        }
    }

    onCollisionEnter(other){
        other.getComponent(HealthPoolController)?.applyDamage(10)

        this.gameObject.destroy()
    }
}