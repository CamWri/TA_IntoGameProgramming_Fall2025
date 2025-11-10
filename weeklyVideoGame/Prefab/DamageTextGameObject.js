class DamageTextGameObject extends GameObject{
    constructor(damage){
        super("Damage Text Game Object", {layer: "health"})
        this.addComponent(new Text(), {red: 255, green: 0, blue: 0, text: `-${damage}`, font: "10px 'Comic Sans MS'" })
        this.addComponent(new DestroyTimer(), {timeWhenDestroy: 2})
        this.addComponent(new FadingController(), {isFading: true, fadingCurrentDurationLeft: 2, fadingTotalDuration: 2})
    }
}