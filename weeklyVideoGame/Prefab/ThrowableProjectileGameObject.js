class ThrowableProjectileGameObject extends GameObject{
    constructor(angle, speed){
        super("Throwing Projectile Game Object", {layer: "projectile"})
        
        this.addComponent(new ThrowableProjectileController(), {angle: angle, speed: speed})
        this.addComponent(new Polygon(), {points: Assets.throwingTriangle, red: 107, green: 92, blue: 77})
        this.addComponent(new Collider())
        this.addComponent(new RigidBody())

        this.transform.scale = new Vector2(10, 5)
    }
}