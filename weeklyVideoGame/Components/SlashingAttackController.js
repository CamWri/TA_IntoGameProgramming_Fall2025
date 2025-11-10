class SlashingAttackController extends Component{
    direction = new Vector2(0, 0)
    speed = 2
    damage = 2

    start(){
        if(this.direction.x == 1){
            this.transform.rotation = -Math.PI/2
        } else if (this.direction.x == -1){
            this.transform.rotation = Math.PI/2
        } else if (this.direction.y == -1){
            this.transform.rotation = Math.PI
        }
    }

    update(){
        this.transform.position.x += this.direction.x * this.speed * Time.deltaTime
        this.transform.position.y += this.direction.y * this.speed * Time.deltaTime
    }

    onCollisionEnter(other){
        const thisTop = this.transform.position.y - this.transform.scale.y
        const thisBottom = this.transform.position.y + this.transform.scale.y
        const thisLeft = this.transform.position.x - this.transform.scale.x
        const thisRight = this.transform.position.x + this.transform.scale.x

        const otherTop = other.transform.position.y - other.transform.scale.y
        const otherBottom = other.transform.position.y + other.transform.scale.y
        const otherLeft = other.transform.position.x - other.transform.scale.x
        const otherRight = other.transform.position.x + other.transform.scale.x
        
        if(other.name != "Player Game Object"){
            this.gameObject.destroy()
        }

        if(other.name === "Basic Enemy Game Object"){
            other.getComponent(HealthPoolController).applyDamage(this.damage)
        }
    }
}