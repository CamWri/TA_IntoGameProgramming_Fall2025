class WallGameObject extends GameObject{
    constructor(x, y){
        super("Wall Game Object", {layer: "platform"})
        this.addComponent(new Polygon(), {points: Assets.square, red: 163, green: 77, blue: 11})
        this.addComponent(new Collider())

        this.transform.scale = new Vector2(x, y)
    }
}