class PlayerController extends Component {
    horzVelocity = 100
    jumpVelocity = 300
    terminalVelocity = 400
    jumpsLeft = 0
    sideCollisionWithWall = false
    jumpXDirection = 0

    inAir = false
    inAirMaxHeight = Infinity
    
    nextShotTime = 1
    currentTime = 1

    specialAttackCooldown = 10
    specialAttackTimer = 10
    spawnSpecialAttack = false

    projectileAttackCooldowm = 20
    projectileAttackTimer = 20

    start() {
        this.rigidBody = this.gameObject.getComponent(RigidBody)
        this.characterStats = this.gameObject.getComponent(CharacterStatsController)
        this.playerStats = GameGlobals.playerStats

        this.horzVelocity = this.playerStats.horzSpeed

        this.nextShotTime = GameGlobals.playerStats.basicAttackCooldown
        this.currentTime = GameGlobals.playerStats.basicAttackCooldown

        this.specialAttackCooldown = GameGlobals.playerStats.abilityOneCooldown
        this.specialAttackTimer = GameGlobals.playerStats.abilityOneCooldown

        this.rigidBody.gravity.y = 512
        Camera.main.transform.position = this.transform.position.clone()
    }

    update() {
        
        this.currentTime += Time.deltaTime
        this.specialAttackTimer += Time.deltaTime

        if(this.rigidBody.velocity.y !== 0 && !this.sideCollisionWithWall){
            this.inAir = true
        }

        if(this.inAir && this.transform.position.y < this.inAirMaxHeight){
            this.inAirMaxHeight = this.transform.position.y
        }

        if(!this.sideCollisionWithWall){
            this.rigidBody.gravity.y = 512
            this.rigidBody.acceleration.x = 0
        }

        // Horizontal movement
        this.rigidBody.velocity.x = 0
        if (Input.keysDown.includes("ArrowLeft")){
            this.rigidBody.velocity.x = -this.horzVelocity
            this.sideCollisionWithWall = false
        }

        if (Input.keysDown.includes("ArrowRight")){
            this.rigidBody.velocity.x = this.horzVelocity
            this.sideCollisionWithWall = false
        }

        // Jumping
        if (Input.keysDownThisFrame.includes("ArrowUp") && this.jumpsLeft > 0) {
            this.rigidBody.velocity.y = -this.jumpVelocity
            this.rigidBody.velocity.x = this.jumpXDirection * 100

            this.sideCollisionWithWall = false
            this.jumpXDirection = 0

            this.jumpsLeft -= 1
        }

        if(this.currentTime > this.nextShotTime){
            switch(true){
                case Input.keysDownThisFrame.includes("KeyW"):
                    instantiate(new SlashingAttackGameObject(new Vector2(0, -1), new Vector2(10, 10), this.playerStats.basicAttackDamage, this.playerStats.projectileSpeed, this.playerStats.basicAttackRange), new Vector2(this.transform.position.x, this.transform.position.y - this.transform.scale.y))
                    this.currentTime = 0
                    break
                case Input.keysDownThisFrame.includes("KeyA"):
                    instantiate(new SlashingAttackGameObject(new Vector2(-1, 0), new Vector2(10, 10), this.playerStats.basicAttackDamage, this.playerStats.projectileSpeed, this.playerStats.basicAttackRange), new Vector2(this.transform.position.x - this.transform.scale.x, this.transform.position.y - this.transform.scale.y/2))
                    this.currentTime = 0
                    break
                case Input.keysDownThisFrame.includes("KeyD"):
                    instantiate(new SlashingAttackGameObject(new Vector2(1, 0), new Vector2(10, 10), this.playerStats.basicAttackDamage, this.playerStats.projectileSpeed, this.playerStats.basicAttackRange), new Vector2(this.transform.position.x + this.transform.scale.x, this.transform.position.y - this.transform.scale.y/2))
                    this.currentTime = 0
                    break
            }
        }

        if(this.specialAttackTimer > this.specialAttackCooldown && this.inAir){
            if(Input.keysDownThisFrame.includes("KeyS")){
                this.spawnSpecialAttack = true
                this.rigidBody.velocity.y = 250
            }
        }

        if(Input.buttonsDownThisFrame.includes(0)){
            let mouseWorldSpace = Camera.screenToWorldSpace(Input.mousePosition)
            let directionFromPlayer = mouseWorldSpace.minus(this.transform.position)

            let angleRad = Math.atan2(directionFromPlayer.y, directionFromPlayer.x)

            let offsetX = Math.cos(angleRad) * this.transform.scale.x/2
            let offsetY = Math.sin(angleRad) * this.transform.scale.y/2

            instantiate(new ThrowableProjectileGameObject(angleRad, directionFromPlayer.magnitude), new Vector2(this.transform.position.x + offsetX, this.transform.position.y + offsetY))
        }

        // Clamp fall speed
        if (this.rigidBody.velocity.y > this.terminalVelocity)
            this.rigidBody.velocity.y = this.terminalVelocity

        Camera.main.getComponent(CameraShake).basePosition = this.transform.position
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

        // General Platform Collision
        if (thisBottom <= otherTop){
            this.jumpsLeft = 3
            this.rigidBody.velocity.y = 0
            this.inAir = false

            let fallenHeight = this.transform.position.y - this.inAirMaxHeight
            let baseDamage = 5

            let damage = Math.max(Math.ceil(baseDamage * (fallenHeight / 50)), baseDamage)

            if(this.spawnSpecialAttack){
                instantiate(new SlashingAttackGameObject(new Vector2(-1, 0), new Vector2(15, 15), damage, this.playerStats.projectileSpeed, this.playerStats.abilityOneRange), new Vector2(this.transform.position.x - this.transform.scale.x, this.transform.position.y - this.transform.scale.y))
                instantiate(new SlashingAttackGameObject(new Vector2(1, 0), new Vector2(15, 15), damage, this.playerStats.projectileSpeed, this.playerStats.abilityOneRange), new Vector2(this.transform.position.x + this.transform.scale.x, this.transform.position.y - this.transform.scale.y))
                instantiate(new SlamingGoundGameObject(), this.transform.position.clone())
                this.specialAttackTimer = 0
                this.spawnSpecialAttack = false
                Camera.main.getComponent(CameraShake).startShake(0.5, 20)
            }

            this.inAirMaxHeight = Infinity

        }
        
        //Hitting your head on the wall
        if(thisTop >= otherBottom){
            this.rigidBody.velocity.y = 512 * Time.deltaTime
        }

        // Wall Climbing Collision
        if(other.name === "Wall Game Object" && thisTop >= otherTop){
            if(thisRight <= otherLeft){
                this.jumpXDirection = -1
            }
            if(thisLeft >= otherRight){
                this.jumpXDirection = 1
            }

            this.rigidBody.gravity.y = 0
            this.rigidBody.velocity.y = 0
            this.sideCollisionWithWall = true
            this.jumpsLeft = 3
            this.inAir = false
        }

        
    }
}
