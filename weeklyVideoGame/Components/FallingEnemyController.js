class FallingEnemyController extends Component {
    speed = new Vector2(10, 0)
    damage = 7

    movementRight = false
    hitPlayer = false

    hasDropped = false
    isChasing = false
    
    start() {
        this.rigidBody = this.gameObject.getComponent(RigidBody)
    }

    update() {

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

        if(other.name == "Platform Game Object") {
            if(!this.hasDropped){
                this.rigidBody.velocity.y = 0
                this.rigidBody.gravity.y = 0
            } else {
                this.rigidBody.gravity.y = 512
            }

            if(thisBottom < otherTop){
                this.rigidBody.velocity.y = 0
            }

            if(thisLeft <= otherLeft){
                this.reverseDirection(true)
                if(this.isChasing) this.isChasing = false
            } else if (thisRight >= otherRight){
                this.reverseDirection(false)
                if(this.isChasing) this.isChasing = false
            }

        }

        if(other.name == "Player Game Object") {
            const opacity = this.gameObject.getComponent(Polygon).opacity
            if(opacity === 1){
                other.getComponent(HealthPoolController).applyDamage(this.damage)

                if(Math.sign(other.getComponent(RigidBody).velocity.x) != Math.sign(this.rigidBody.velocity.x) && Math.abs(thisBottom - otherBottom) < 3){
                    this.reverseDirection()
                }

                this.hitPlayer = true
            }
        }
    }

    reverseDirection(movementDirection = !this.movementRight){
        this.movementRight = movementDirection
        this.rigidBody.velocity.x = this.movementRight ? 10 : -10
    }
}