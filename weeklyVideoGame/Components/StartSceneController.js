class StartSceneController extends Component{
    playerOptions = []
    
    currentlySelectedIndex = 0
    currentlySelectedPlayer

    start(){
        this.playerOptions = GameObject.findByTag("Player Options")

        this.currentlySelectedPlayer = this.playerOptions[this.currentlySelectedIndex]
    }

    update(){
        let worldMatrix = this.currentlySelectedPlayer.transform.getWorldMatrix()
        this.transform.position = new Vector2(worldMatrix.m41, worldMatrix.m42 - 150)

        if(Input.keysDownThisFrame.includes("ArrowLeft")){
            if(this.currentlySelectedIndex == 0){
                this.currentlySelectedIndex = this.playerOptions.length - 1
            } else {
                this.currentlySelectedIndex -= 1
            }
        }

        if(Input.keysDownThisFrame.includes("ArrowRight")){
            if(this.currentlySelectedIndex == this.playerOptions.length - 1){
                this.currentlySelectedIndex = 0
            } else {
                this.currentlySelectedIndex += 1
            }
        }

        this.currentlySelectedPlayer = this.playerOptions[this.currentlySelectedIndex]

        if(Input.keysDownThisFrame.includes("Space")){
            let polygon = this.currentlySelectedPlayer.getComponent(Polygon)

            GameGlobals.playerRed = polygon.red
            GameGlobals.playerGreen = polygon.green
            GameGlobals.playerBlue = polygon.blue

            GameGlobals.playerStats = this.currentlySelectedPlayer.getComponent(CharacterStatsController)

            SceneManager.loadScene(new MainScene())
        }
    }
}