class CameraShake extends Component {
    basePosition = null
    elapsedTime = 0
    maxDuration = 1
    magnitude = 1
    initialMagnitude = 1
    isShaking = false

    startShake(duration = 0.5, magnitude = 20) {
        this.isShaking = true
        this.maxDuration = duration
        this.magnitude = magnitude
        this.initialMagnitude = magnitude
        this.elapsedTime = 0
    }

    update() {
       if(!this.basePosition) return 

        let offSetX = 0
        let offSetY = 0

       if(this.isShaking){
        const progess = this.elapsedTime / this.maxDuration

        const currentMagnitude = this.initialMagnitude * (1 - progess)

        //Math.random() -0.5 -> 0.5 
        offSetX = (Math.random() - 0.5) * currentMagnitude
        offSetY = (Math.random() - 0.5) * currentMagnitude

        this.elapsedTime += Time.deltaTime

        if(this.elapsedTime > this.maxDuration){
            this.isShaking = false
            this.elapsedTime = 0
        }
       }

       this.transform.position.x = this.basePosition.x + offSetX
       this.transform.position.y = this.basePosition.y + offSetY
    }
}