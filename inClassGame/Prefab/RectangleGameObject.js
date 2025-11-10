class RectangleGameObject extends GameObject{
    constructor(xSpeed, ySpeed){
        super("Rectangle Game Object")

        this.addComponent(new RectangleController(), {speed: new Vector2(xSpeed, ySpeed)})
        this.addComponent(new Polygon(), {fillStyle: "red", points: Assets.square})
        this.addComponent(new RigidBody())
        this.addComponent(new Collider())

        this.transform.scale = new Vector2(20, 20)              
    }
}