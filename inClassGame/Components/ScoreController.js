class ScoreController extends Component{
    score = 0
    update(){
        this.gameObject.getComponent(Text).text = "Score: " + this.score
    }
}