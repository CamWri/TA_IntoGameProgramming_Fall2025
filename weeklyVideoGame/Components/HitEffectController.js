class HitEffectController extends Component {
    isRed = false
    redTimer = 0

    polygonComponent
    originalRed
    originalGreen
    originalBlue

    start() {
        this.polygonComponent = this.gameObject.getComponent(Polygon)
        this.originalRed = this.polygonComponent.red
        this.originalGreen = this.polygonComponent.green
        this.originalBlue = this.polygonComponent.blue
    }

    update() {
        if(this.isRed){
            this.redTimer -= Time.deltaTime

            this.polygonComponent.red = 255
            this.polygonComponent.green = 0
            this.polygonComponent.blue = 0

            if(this.redTimer <= 0){
                this.isRed = false
                this.polygonComponent.red = this.originalRed
                this.polygonComponent.green = this.originalGreen
                this.polygonComponent.blue = this.originalBlue
            }
        }
    }

    setHitEffect(duration) {
        this.isRed = true
        this.redTimer = duration
    }
}
