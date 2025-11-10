class TriangleGameObject extends GameObject{
    constructor(xSpeed, ySpeed){
        super("Triangle Game Object")

        this.addComponent(new TriangleController())
        this.addComponent(new Polygon(), {fillStyle: "blue", points: Assets.square})
        this.addComponent(new RigidBody(), {velocity: new Vector2(xSpeed, ySpeed)})
        this.addComponent(new Collider())

        this.transform.scale = new Vector2(15, 15)        
    }
}