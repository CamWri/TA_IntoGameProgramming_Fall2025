class SlashingAttackGameObject extends GameObject{

    constructor(direction, scale, damage, speed, range){
        super("Slashing Attack Game Object", {layer: "projectile"})
        this.addComponent(new Polygon(), {points: Assets.slashingAttack, red: 255, green: 111, blue: 0})
        this.addComponent(new SlashingAttackController(), {direction: direction, damage: damage, speed: speed})
        this.addComponent(new Collider())
        this.addComponent(new DestroyTimer(), {timeWhenDestroy: range})

        this.transform.scale = scale
    }
}