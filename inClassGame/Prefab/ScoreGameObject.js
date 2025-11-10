class ScoreGameObject extends GameObject{
    constructor(){
        super("Score Game Object")
        this.addComponent(new Text())
        this.addComponent(new ScoreController())
    }
}