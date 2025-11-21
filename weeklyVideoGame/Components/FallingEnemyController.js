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
        // Nothing needed here; movement handled by BT nodes
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
            // Hang on platform if not dropped
            if(!this.hasDropped) {
                this.rigidBody.velocity.y = 0;
                this.rigidBody.gravity.y = 0;
            } else {
                // Restore gravity after drop
                this.rigidBody.gravity.y = 512;
            }

            if(thisBottom < otherTop){
                this.rigidBody.velocity.y = 0;   
            }

            // Reverse horizontal movement if hitting edges
            const hitLeftEdge = thisLeft <= otherLeft
            const hitRightEdge = thisRight >= otherRight
            if(hitLeftEdge){
                this.reverseDirection(true)
                if(this.isChasing) this.isChasing = false; // stop chasing when hitting edge
            } else if (hitRightEdge){
                this.reverseDirection(false)
                if(this.isChasing) this.isChasing = false; // stop chasing when hitting edge
            }
        }

        if(other.name == "Player Game Object") {
            const opacity = this.gameObject.getComponent(Polygon).opacity
            if(opacity === 1){
                other.getComponent(HealthPoolController).applyDamage(this.damage)

                if(Math.sign(other.getComponent(RigidBody).velocity.x) != Math.sign(this.rigidBody.velocity.x)){
                    this.reverseDirection()
                }

                this.hitPlayer = true
            }
        }
    }

    reverseDirection(movementDirection =!this.movementRight) {
        this.movementRight = movementDirection
        const rb = this.rigidBody
        const speed = 10
        rb.velocity.x = this.movementRight ? speed : -speed
    }
}