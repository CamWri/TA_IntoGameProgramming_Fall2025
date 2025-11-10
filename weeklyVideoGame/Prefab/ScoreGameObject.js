class ScoreGameObject extends GameObject{
    constructor(){
        super("Score Game Object", {layer: "UI"})
        this.addComponent(new Text(), {red: 0, green: 0, blue: 0})
        this.addComponent(new ScoreController())
    }
}