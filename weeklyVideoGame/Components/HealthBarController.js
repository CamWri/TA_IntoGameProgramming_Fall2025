class HealthBarController extends Component{
    entity
    maxHP
    currentHP
    offsetY = 20
    healthPercent = 1

    start(){
        this.maxHP = this.entity.getComponent(HealthPoolController).maxHP
        this.currentHP = this.entity.getComponent(HealthPoolController).currentHP
    }

    update(){
        this.maxHP = this.entity.getComponent(HealthPoolController).maxHP
        this.currentHP = this.entity.getComponent(HealthPoolController).currentHP
        this.healthPercent = this.currentHP / this.maxHP

        if(this.currentHP == 0){
            this.gameObject.destroy()
        }
    }

    draw(ctx){
        ctx.fillStyle = "rgba(255, 0, 0, 1)"

        ctx.beginPath()

        for(const point of [new Vector2(1, 1), new Vector2(-1, 1), new Vector2(-1, -1), new Vector2(1, -1)]){
            ctx.lineTo(point.x, point.y)
        }

        ctx.fill()

        ctx.fillStyle = "rgba(26, 116, 2, 1)"

        ctx.beginPath()

        for(const point of [new Vector2(-1 + 2 * Math.min(1, this.healthPercent), 1), new Vector2(-1, 1), new Vector2(-1, -1), new Vector2(-1 + 2 * Math.min(1, this.healthPercent), -1)]){
            ctx.lineTo(point.x, point.y)
        }

        ctx.fill()

        if(this.healthPercent > 1){
        ctx.fillStyle = "rgba(13, 0, 255, 1)"

            ctx.beginPath()

            for(const point of [new Vector2(-1 + 2 * Math.min(1, this.healthPercent - 1), 1), new Vector2(-1, 1), new Vector2(-1, -1), new Vector2(-1 + 2 * Math.min(1, this.healthPercent - 1), -1)]){
                ctx.lineTo(point.x, point.y)
            }

            ctx.fill()
        }
    }

}