class LaserGameObject extends GameObject{
    constructor(){
        super("Laser Game Object")
        this.addComponent(new Polygon(), {fillStyle: 'green', points: Assets.square})
        this.addComponent(new LaserController())
        this.addComponent(new Collider())

        this.transform.scale = new Vector2(3, 5)
    }
}