class RectangleController extends Component{
    teleportDistance = 200
    teleportCooldown = 2
    teleportLastUse = 0
    hasTeleported = false
    speed = new Vector2(1, 1)

    start(){
        this.nextFireFrame = 10
        this.frame = 0
        this.nextRight = true
    }

    update(){
        this.frame ++

        this.teleportLastUse += 1/60
        let proposedChange = Vector2.zero        
        //Since we are starting to draw from the left side of the sape, we do not need to adjust based on the scale
            //cause it only scaled rightwards
        if(Input.keysDown.includes("ArrowLeft") && this.transform.position.x > 0){
            proposedChange.plusEquals(Vector2.left)

            if(Input.keysDown.includes("Space") && this.teleportLastUse > this.teleportCooldown){
                this.teleport("-X")
            }
        }

        if(Input.keysDown.includes("ArrowRight") && this.transform.position.x + this.transform.scale.x < Engine.canvas.width){
            proposedChange.plusEquals(Vector2.right)

            if(Input.keysDown.includes("Space") && this.teleportLastUse > this.teleportCooldown){
                this.teleport("+X")
            }
        }

        if(Input.keysDown.includes("ArrowUp") && this.transform.position.y > 0){
            proposedChange.plusEquals(Vector2.up)

            if(Input.keysDown.includes("Space") && this.teleportLastUse > this.teleportCooldown){
                this.teleport("-Y")
            }
        }

        if(Input.keysDown.includes("ArrowDown") && this.transform.position.y + this.transform.scale.y < Engine.canvas.height){
            proposedChange.plusEquals(Vector2.down)

            if(Input.keysDown.includes("Space") && this.teleportLastUse > this.teleportCooldown){
                this.teleport("+Y")
            }
        }

        proposedChange = new Vector2(proposedChange.x * this.speed.x, proposedChange.y * this.speed.y)

        this.transform.position.plusEquals(proposedChange.times(Time.deltaTime))

        if(this.frame >= this.nextFireFrame){
            if(this.nextRight){
                instantiate(new LaserGameObject(), this.transform.position.plus(Vector2.right.times(22)))
            } else {
                instantiate(new LaserGameObject(), this.transform.position.plus(Vector2.left.times(22)))
            }
            this.nextRight = !this.nextRight
            this.nextFireFrame = this.frame + 10
        }


        if(this.hasTeleported){
            this.teleportLastUse = 0
            this.hasTeleported = false
        }
    }

    onCollisionEnter(other){
        if(other.name == "Triangle Game Object"){
            this.gameObject.destroy();
        }
    }

    teleport(direction){
        this.hasTeleported = true


        if(direction == "-Y"){
            if(this.transform.position.y - this.teleportDistance > 0){
                this.transform.position.y -= this.teleportDistance
            } else {
                this.transform.position.y = this.transform.scale.y
            }
        }
        if(direction == "+Y"){
            if(this.transform.position.y + this.teleportDistance < Engine.canvas.height){
                this.transform.position.y += this.teleportDistance
            } else {
                this.transform.position.y = Engine.canvas.height - this.transform.scale.y
            }
        }
        if(direction == "-X"){
            if(this.transform.position.x - this.teleportDistance > 0){
                this.transform.position.x -= this.teleportDistance
            } else {
                this.transform.position.x = 0
            }
        }
        if (direction == "+X"){
            if(this.transform.position.x + this.teleportDistance < Engine.canvas.width){
                this.transform.position.x += this.teleportDistance
            } else {
                this.transform.position.x = Engine.canvas.width - this.transform.scale.x
            }
        }
    }
}