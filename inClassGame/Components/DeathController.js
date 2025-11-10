class DeathController extends Component{
    start(){

    }

    update(){
        if(Input.keysDown.includes("Space")){
            Engine.currentScene = new MainScene();
        }
    }
}