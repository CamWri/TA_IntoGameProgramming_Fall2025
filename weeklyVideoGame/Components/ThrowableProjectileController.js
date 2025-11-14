class ThrowableProjectileController extends Component{
    angle

    speed = 50000

    start(){
        this.rigidBody = this.gameObject.getComponent(RigidBody)

        this.rigidBody.gravity.y = 512

        this.rigidBody.velocity.x = Math.cos(this.angle) * this.speed * Time.deltaTime
        this.rigidBody.velocity.y = Math.sin(this.angle) * this.speed * Time.deltaTime
    }

    update(){
        const vel = this.rigidBody.velocity;

        if (vel.x !== 0 || vel.y !== 0) {
            this.transform.rotation = Math.atan2(vel.y, vel.x) 
        }
    }

    onCollisionEnter(other){
        if(other.name === "Basic Enemy Game Object"){
            other.getComponent(HealthPoolController).applyDamage(20)
        }

        this.gameObject.destroy()
    }
}