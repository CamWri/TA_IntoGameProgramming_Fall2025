class EnemyThrowableProjectileController extends Component {
    angle
    initialSpeed = 625 

    xSpeed
    ySpeed
    cannotFire = false

    start() {
        this.rigidBody = this.gameObject.getComponent(RigidBody)

        this.rigidBody.gravity.y = 512

        let playerGameObject = GameObject.find("Player Game Object")

        let basePos = playerGameObject?.transform.position

        if(basePos){
            const scatterRadius = 0
            const angle = Math.random() * Math.PI * 2

            const distance = Math.random() * scatterRadius

            const playerPosition = new Vector2(basePos.x + Math.cos(angle) * distance, basePos.y + Math.sin(angle) * distance)
            
            this.computeMinimumVelocityToHit(playerPosition)

            this.rigidBody.velocity.x = this.xSpeed
            this.rigidBody.velocity.y = this.ySpeed
        } else {
            this.gameObject.destroy()
        }
    }

    update() {
        if(this.rigidBody.velocity.x !== 0 || this.rigidBody.velocity.y !== 0){
            this.transform.rotation = Math.atan2(this.rigidBody.velocity.y, this.rigidBody.velocity.x)
        }
    }

    onCollisionEnter(other) {
        other.getComponent(HealthPoolController)?.applyDamage(2)
        this.gameObject.destroy()
    }

    computeMinimumVelocityToHit(targetPosition) {
        let low = 0
        let high = 2000
        let velocity = 0

        for(let i = 0; i < 12; i++){
            velocity = (high + low)/2

            let canHit = this.computeLaunchAngles(targetPosition, velocity)

            if(canHit){
                high = velocity
            } else {
                low = velocity
            }
        }

        this.computeLaunchAngles(targetPosition, high)
    }

    /**
     * @description Computes the required launch angle(s) (theta) needed to hit a target
     * at a fixed initial velocity (v), based on the physics of ballistic trajectory.
     * The chosen solution in this function is the "High Arc" trajectory.
     */
    computeLaunchAngles(targetPosition, v) {
        const dx = targetPosition.x - this.transform.position.x
        const absDx = Math.abs(dx)

        const dy = targetPosition.y - this.transform.position.y

        const g = 512
        const v2 = v * v
        const v4 = v2 * v2
        
        /*
        T = tan(theta)


        dy = dx * T - (g * (dx)^2)/(2v^2) * (1+T^2)

        0 = (dx)^2 T ^ 2 - 2v^2 dx T + (g * (dx)^2 + 2v^2 dy)

        A = (dx)^2
        B = - 2v^2 dx
        C = (g * (dx)^2 + 2v^2 dy)

        0 = A T^2 + B T + C

        Discriment D = B^2 - 4AC
        */

        const D = 4 * dx ** 2 * (v4 - g * (g * dx ** 2 + 2 * v2 * -dy))

        if(D < 0){
            return false
        }

        const sqrtD = Math.sqrt(D)

        /*
        T = tan(theta) = (-b +- Sqrt(D)/(2A))

        theta = atan2((-b +- Sqrt(D)/(2A)))
        Addition form gives a lob where its from 45 to 90 degrees
        Subtraction form gives a direct shot where its from 0 to 45 degrees 
        */

        let theta = Math.atan2(-(-2 * v **2 * absDx) - sqrtD, 2 * (g * absDx ** 2))

        this.angle = theta

        this.xSpeed = v * Math.cos(theta) * Math.sign(dx)
        this.ySpeed = -(v * Math.sin(theta))

        return true

    }
}