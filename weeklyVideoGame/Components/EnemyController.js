class EnemyController extends Component{
    speed = new Vector2(10, 0)
    damage = 5

    start(){
        this.rigidBody = this.gameObject.getComponent(RigidBody)
        this.rigidBody.gravity.y = 512
        this.rigidBody.velocity = this.speed
    }

    update(){

    }

    onCollisionEnter(other) {
        const thisTop = this.transform.position.y - this.transform.scale.y
        const thisBottom = this.transform.position.y + this.transform.scale.y
        const thisLeft = this.transform.position.x - this.transform.scale.x
        const thisRight = this.transform.position.x + this.transform.scale.x

        const otherTop = other.transform.position.y - other.transform.scale.y
        const otherBottom = other.transform.position.y + other.transform.scale.y
        const otherLeft = other.transform.position.x - other.transform.scale.x
        const otherRight = other.transform.position.x + other.transform.scale.x

        const opacity = this.gameObject.getComponent(Polygon).opacity

        if(other.name == "Platform Game Object"){
            this.rigidBody.velocity.y = 0

            if(thisLeft < otherLeft || thisRight > otherRight){
                this.rigidBody.velocity.x = -this.rigidBody.velocity.x
            }
        }

        if(other.name == "Player Game Object" && opacity == 1){
            other.getComponent(HealthPoolController).applyDamage(this.damage)
        }
    }
}