class HealthTextController extends Component{
    healthBarGameObject
    healthBarController    

    start(){
        this.healthBarController = this.healthBarGameObject.getComponent(HealthBarController)
    }

    update(){
        if(!this.healthBarController) return

        this.gameObject.getComponent(Text).text = `${this.healthBarController.currentHP}/${this.healthBarController.maxHP}`
    }
}