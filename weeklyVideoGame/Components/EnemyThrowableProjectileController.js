class EnemyThrowableProjectileController extends Component {
    angle
    initialSpeed = 625 

    xSpeed
    ySpeed
    cannotFire = false

    start() {
        this.ridigBody = this.gameObject.getComponent(RigidBody)

        let playerGameObject = GameObject.find("Player Game Object")

        let basePos = playerGameObject?.transform.position

        if(basePos){
            const scatterRadius = 0
            const angle = Math.random() * Math.PI * 2

            const distance = Math.random() * scatterRadius

            const playerPosition = {
                x: basePos.x + Math.cos(angle) * distance,
                y: basePos.y + Math.sin(angle) * distance
            }

                
            this.ridigBody.gravity.y = 512 

            this.computeMinimumVelocityToHit(playerPosition)

            if (!this.cannotFire) {
                this.ridigBody.velocity.x = this.xSpeed
                this.ridigBody.velocity.y = this.ySpeed 
            }
        } else {
            this.gameObject.destroy()
        }
    }

    update() {
        if (this.ridigBody.velocity.x !== 0 || this.ridigBody.velocity.y !== 0) {
            this.transform.rotation = Math.atan2(this.ridigBody.velocity.y, this.ridigBody.velocity.x)
        }
    }

    onCollisionEnter(other) {
        other.getComponent(HealthPoolController)?.applyDamage(10)
        this.gameObject.destroy()
    }

    computeMinimumVelocityToHit(targetPosition) {
        let low = 0;
        let high = 2000; // set based on your game needs
        let velocity = 0;

        for (let i = 0; i < 12; i++) {
            velocity = (low + high) / 2;

            let canHit = this.computeLaunchAngles(targetPosition, velocity);

            if (canHit) {
                high = velocity;
            } else {
                low = velocity;
            }
        }
        this.computeLaunchAngles(targetPosition, high);
    }

    /**
     * @description Computes the required launch angle(s) (theta) needed to hit a target
     * at a fixed initial velocity (v), based on the physics of ballistic trajectory.
     * The chosen solution in this function is the "High Arc" trajectory.
     */
    computeLaunchAngles(targetPosition, v) {
        // --- 1. Calculate Displacements and Constants ---
        const dx = targetPosition.x - this.transform.position.x;
        const absDx = Math.abs(dx)
        const dy = targetPosition.y - this.transform.position.y;
        const g = 512; 
        const v2 = v * v;
        const v4 = v2 * v2;
        
        /*
        What is D:
            Trajectory Equation: dy = dx tan(theta) - (g * (dx)^2)/(2v^2 (cos(theta))^2)
            (cos(0))^2 = 1/(1+(tan(theta)) ^2)
            T = tan(theta)

            Trajectory Equation:  dy = dx T - (g * (dx)^2)/(2v^2) * (1+T^2)
            Multiply both sides by (2v^2) and move everything to one side

            Trajectory Equation:  
            (dx)^2 T ^2 - 2v^2 dx T + (g (dx)^2 + 2v^2 dy) = 0
            A = g (dx)^2
            B = - 2v^2 dx
            C = (g (dx)^2 + 2v^2 dy)
            Its a quadratic where AT^2 + BT + C = 0

            Discriminent (D) = b^2 - 4AC
            = (- 2v^2 dx) ^2 - 4(g (dx)^2)(g (dx)^2 + 2v^2 dy)
            = 4v^4 (dx)^2 - 4g (dx)^2 (g (dx)^2 + 2v^2 dy)
            = 4 (dx)^2 (v^4 - g(g (dx)^2 + 2v^2 dy))
        */
        const D = 4 * dx ** 2 * (v4 - g * (g * dx ** 2 + 2 * v2 * -dy))

        // --- 3. Check Range and Handle Failure ---
        //A Disciminent less than 0 means there is no solution, so, our velocity isn't high enough to reach
        if (D < 0) {
            //this.cannotFire = true;
            //return;
            return false
        }

        // --- 4. Calculate Angle (High Arc) ---
        const sqrtD = Math.sqrt(D);

        /*
        Use the quadratic equation of

        T = tan(theta) = (-b ± Sqrt(D))/(2a)
        */

        //A lob (angle from 45 to 90)
        let theta = Math.atan2(-(-2 * v ** 2 * absDx) + sqrtD, 2 * (g * absDx ** 2))

        //Direct shot (angle from 0 to 45)
        //let theta = Math.atan2(-(-2 * v ** 2 * absDx) - sqrtD, 2 * (g * absDx ** 2))


        this.angle = theta;
        
        // --- 5. Apply Velocity Vectors ---

        // Calculate the horizontal component of the initial velocity.
        // Math.sign(dx) applies the correct direction (+ or -) based on the target's position.
        this.xSpeed = v * Math.cos(theta) * Math.sign(dx)
        
        this.ySpeed = -(v * Math.sin(theta)); 

        return true
    }
}