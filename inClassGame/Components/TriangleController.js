class TriangleController extends Component{
    start(){
        this.velocity = this.gameObject.getComponent(RigidBody).velocity
    }

    update(){
        if(this.transform.position.x > Engine.canvas.width || this.transform.position.x + this.transform.scale.x < 0){
            this.velocity.x *= -1
        }

        if(this.transform.position.y > Engine.canvas.height || this.transform.position.y + this.transform.scale.y < 0){
            this.velocity.y *= -1
        }

        this.transform.position.plusEquals(this.velocity.times(Time.deltaTime))
    }

    onCollisionEnter(other){
        if(other.name == "Laser Game Object"){
            this.gameObject.destroy();
            GameObject.find("Score Game Object").getComponent(ScoreController).score ++
        }
    }
}