class Polygon extends Component{
    points = [new Vector2(-1, 1), new Vector2(0, -1), new Vector2(1, 1)];

    red = 0
    green = 0
    blue = 0
    opacity = 1

    draw(ctx){
        ctx.fillStyle = `rgba(${this.red}, ${this.green}, ${this.blue}, ${this.opacity})`

        ctx.beginPath()

        for(const point of this.points){
            ctx.lineTo(point.x, point.y)
        }

        ctx.fill()
    }
}