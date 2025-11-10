class MovingPlatformGameObject extends GameObject{
    constructor(x, y, pathList, speed){
        super("Moving Platform Game Object",  {layer: "platform", tag: "Platform"})

        this.addComponent(new Polygon(), {points: Assets.square, red: 73, green: 97, blue: 107})
        this.addComponent(new Collider())

        this.addComponent(new MovingPlatformController(), {pathList: pathList, speed: speed})

        this.transform.scale = new Vector2(x, y)
    }
}