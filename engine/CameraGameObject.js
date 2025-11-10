class CameraGameObject extends GameObject{
    constructor(){
        super("Camera Game Object")
        this.addComponent(new Camera())
        this.addComponent(new CameraShake())
    }
}