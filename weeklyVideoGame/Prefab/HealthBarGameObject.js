class HealthBarGameObject extends GameObject{
    constructor(entity){
        super("Health Bar Game Object", {layer: "health"})
        this.addComponent(new HealthBarController(), {entity: entity})
        this.transform.scale = new Vector2(20/entity.transform.scale.x, 7/entity.transform.scale.y)
    }
}