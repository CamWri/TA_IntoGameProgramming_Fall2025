class FadingController extends Component{
    fadingCurrentDurationLeft = 0
    fadingTotalDuration = 0

    isFading = false

    drawComponent

    start(){
        this.drawComponent = this.gameObject.getComponent(Polygon) ?? this.gameObject.getComponent(Text)
    }

    update(){
        if(this.isFading){
            this.fadingCurrentDurationLeft -= Time.deltaTime

            this.drawComponent.opacity = Math.max(this.fadingCurrentDurationLeft/this.fadingTotalDuration, 0)
        }

        if(this.drawComponent.opacity == 0){
            this.gameObject.destroy()
        }
    }

    startFading(fadingDuration){
        this.isFading = true
        this.fadingCurrentDurationLeft = fadingDuration
        this.fadingTotalDuration = fadingDuration
    }
}