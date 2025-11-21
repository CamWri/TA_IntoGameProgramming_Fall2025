class ThrowableProjectileController extends Component{
    angle

    speed = 50000

    start(){
        this.rigidBody = this.gameObject.getComponent(RigidBody)

        this.rigidBody.gravity.y = 512
        
        this.rigidBody.velocity.x = Math.cos(this.angle) * this.speed
        this.rigidBody.velocity.y = Math.sin(this.angle) * this.speed
    }

    update(){
        if(this.rigidBody.velocity.x !== 0 || this.rigidBody.velocity.y !== 0){
            this.transform.rotation = Math.atan2(this.rigidBody.velocity.y, this.rigidBody.velocity.x)
        }
    }

    onCollisionEnter(other){
        other.getComponent(HealthPoolController)?.applyDamage(10)

        this.gameObject.destroy()
    }
}