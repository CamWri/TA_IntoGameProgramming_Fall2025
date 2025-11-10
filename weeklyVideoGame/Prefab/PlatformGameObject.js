class PlatformGameObject extends GameObject{
    constructor(x, y){
        super("Platform Game Object", {layer: "platform", tag: "Platform"})
        this.addComponent(new Polygon(), {points: Assets.square, red: 255, green: 255, blue: 255})
        this.addComponent(new Collider())

        this.transform.scale = new Vector2(x, y)
    }
}