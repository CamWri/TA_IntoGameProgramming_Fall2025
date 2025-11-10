class BasicEnemyGameObject extends GameObject{
    constructor(horizontalSpeed){
        super("Basic Enemy Game Object", {layer: "enemy"})

        this.addComponent(new EnemyController(), {speed: new Vector2(horizontalSpeed, 0)})
        this.addComponent(new Polygon(), {points: Assets.square, red: 0, green: 255, blue: 162})
        this.addComponent(new Collider())
        this.addComponent(new HealthPoolController(), {maxHP: 20, currentHP: 10})
        this.addComponent(new FadingController())
        this.addComponent(new HitEffectController())

        this.addComponent(new RigidBody(), {gravity: new Vector2(0, 10)})
        this.transform.scale = new Vector2(10, 10)
    }
}