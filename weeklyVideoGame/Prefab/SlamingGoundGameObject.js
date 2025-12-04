class SlamingGoundGameObject extends GameObject{
    constructor(){
        super("Slamming Group Game Object")
        this.addComponent(new ParticleSystem(), {
            startParticles: new UniformDistribution(10, 20),
            particleVelocity: new UniformDistribution(2, 3),
            particleLifetime: new UniformDistribution(0.25, 1),
            particleSize: new UniformDistribution(1, 2.5),
            particleColor: new UniformColorDistribution(255, 255, 255, 0, 0, 0),
            particleDirection: new UniformDistribution(Math.PI, Math.PI * 2),
            particleGravity: new ConstantDistribution(0.05),
            //continuousSpawnInterval: new UniformDistribution(1, 1),
            //continousSpawnParticleCount: new ConstantDistribution(5)
            maintainParticleCount: true
        })
    }
}