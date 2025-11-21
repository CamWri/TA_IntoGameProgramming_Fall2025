class ProjectileEnemyGameObject extends GameObject{
    constructor(){
        super("Projectile Enemy Game Object", {layer: "enemy"})

        this.addComponent(new Polygon(), {points: Assets.square, red: 255, green: 0, blue: 0})
        this.addComponent(new Collider())
        this.addComponent(new HealthPoolController(), {maxHP: 20, currentHP: 10})
        this.addComponent(new FadingController())
        this.addComponent(new HitEffectController())
        this.addComponent(new ProjectileEnemeyController())

        this.addComponent(new RigidBody(), {gravity: new Vector2(0, 512)})
        this.transform.scale = new Vector2(10, 10)
    }
}