class MovingPlatformController extends Component{
    pathList
    speed

    currentPoint
    currentIndex

    theta


    start(){
        this.currentPoint = this.pathList[0]
    }

    update(){
      let distance = Math.sqrt((this.currentPoint.x - this.transform.position.x) ** 2 + (this.currentPoint.y - this.transform.position.y) ** 2)

      if(distance < 5){
        if(this.currentIndex < this.pathList.length - 1){
            this.currentIndex++
        } else {
            this.currentIndex = 0
        }
        this.currentPoint = this.pathList[this.currentIndex]
      } else {
        this.theta = Math.atan2(this.currentPoint.y - this.transform.position.y, this.currentPoint.x - this.transform.position.x)

        this.transform.position.x += (this.speed * Math.cos(this.theta) * Time.deltaTime)
        this.transform.position.y += (this.speed * Math.sin(this.theta) * Time.deltaTime)
      }
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

        if(other.name == "Player Game Object"){
            if(otherBottom <= thisTop){
              other.getComponent(RigidBody).velocity.y = 60
            }
        }
    }
}