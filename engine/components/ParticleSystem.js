class ConstantDistribution{
    constructor(value){
        this.value = value
    }

    sample(){
        return this.value
    }
}

class UniformDistribution{
    constructor(low, high){
        this.low = low
        this.high = high
    }

    sample(){
        return Math.random() * (this.high - this.low) + this.low
    }
}

class ConstantColorDistribution{
    constructor(r, g, b){
        this.r = r
        this.g = g 
        this.b = b
    }

    sample(){
        return {r: this.r, g: this.g, b: this.b}
    }
}

class UniformColorDistribution{
    r
    g
    b
    r2
    g2
    b2

    constructor(r, g, b, r2, g2, b2){
        Object.assign(this, {r, g, b, r2, g2, b2})
    }

    sample(){
        const rand = Math.random()
        return {
            r: (1-rand) * this.r + rand * this.r2, 
            g: (1-rand) * this.g + rand * this.g2, 
            b: (1-rand) * this.b + rand * this.b2, 

        }
    }
}

class Particle{
    position = Vector2.zero
    velocity = 1
    direction = Math.random() * Math.PI * 2
    lifetime = 1
    size = 1
    startAlpha = 1
    endAlpha = 0
    color = {r: 255, g: 255, b: 255}
    gravity = 0

    constructor(params){
        Object.assign(this, params)
        this.startTime = Time.time

        // Convert direction + speed into velocity components
        this.vx = this.velocity * Math.cos(this.direction)
        this.vy = this.velocity * Math.sin(this.direction)
    }

    update(){
        // Apply gravity (accelerate downward)
        this.vy += this.gravity

        // Move particle using velocity components
        this.position.x += this.vx
        this.position.y += this.vy

        if(this.startTime + this.lifetime < Time.time){
            this.isDead = true
        }
    }

    getAlpha(){
        const percent = (Time.time - this.startTime)/(this.lifetime)
        return (1-percent) * this.startAlpha + percent * this.endAlpha
    }
}

class ParticleSystem extends Component{
    particles = []
    startParticles = new ConstantDistribution(10)
    particleVelocity = new ConstantDistribution(1)
    particleLifeTime = new ConstantDistribution(1)
    particleSize = new ConstantDistribution(1)
    particleColor = new ConstantColorDistribution(255, 255, 255)
    particleDirection = new UniformDistribution(0, Math.PI * 2)
    particleGravity = new ConstantDistribution(0)
    continuousSpawnInterval = new ConstantDistribution(1)
    continousSpawnParticleCount = new ConstantDistribution(0)
    maintainParticleCount = false

    spawnTimer = 0

    start(){
        for(let i = 0; i < this.startParticles.sample(); i++){
            this.particles.push(
                new Particle({
                    velocity: this.particleVelocity.sample(),
                    lifetime: this.particleLifeTime.sample(),
                    size: this.particleSize.sample(),
                    color: this.particleColor.sample(),
                    direction: this.particleDirection.sample(),
                    gravity: this.particleGravity.sample(),
                })
            )
        }

        this.currentInverval = this.continuousSpawnInterval.sample()

    }

    update(){
        this.spawnTimer += Time.deltaTime

        for(const particle of this.particles){
            particle.update()
        }

        this.particles = this.particles.filter(p => !p.isDead)

        let particleDifference = this.startParticles.sample() - this.particles.length

        if(this.maintainParticleCount && particleDifference > 0){
            for(let i = 0; i < particleDifference; i++){
                this.particles.push(
                    new Particle({
                        velocity: this.particleVelocity.sample(),
                        lifetime: this.particleLifeTime.sample(),
                        size: this.particleSize.sample(),
                        color: this.particleColor.sample(),
                        direction: this.particleDirection.sample(),
                        gravity: this.particleGravity.sample(),
                    })
                )
            }
        }
        
        if(this.spawnTimer >= this.currentInverval && this.currentInverval > 0){
            for(let i = 0; i < this.continousSpawnParticleCount.sample(); i++){
                this.particles.push(
                        new Particle({
                            velocity: this.particleVelocity.sample(),
                            lifetime: this.particleLifeTime.sample(),
                            size: this.particleSize.sample(),
                            color: this.particleColor.sample(),
                            direction: this.particleDirection.sample(),
                            gravity: this.particleGravity.sample(),
                        })
                )
            }

            this.spawnTimer = 0
            this.currentInverval = this.continuousSpawnInterval.sample()
        }

        if(this.particles.length <= 0){
            this.gameObject.destroy()
        }
    }

    draw(ctx){
        for(const particle of this.particles){
            ctx.fillStyle = `rgba(${particle.color.r}, ${particle.color.g}, ${particle.color.b}, ${particle.getAlpha()})`
            ctx.beginPath()
            ctx.arc(particle.position.x, particle.position.y, particle.size, 0, 2 * Math.PI)
            ctx.fill()
        }
    }
}