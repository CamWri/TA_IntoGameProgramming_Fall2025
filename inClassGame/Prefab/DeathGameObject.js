class DeathGameObject extends GameObject{
    constructor(){
        super("Death Game Object")
        this.addComponent(new DeathController())
    }
}