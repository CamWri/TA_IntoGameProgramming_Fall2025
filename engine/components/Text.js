// @ts-ignore
class Text extends Component{
    text = "[NO TEXT]"
    font = "24px 'Comic Sans MS'" 
    
    textAlign = "left"

    textBaseline = "alphabetic"

    red = 0
    green = 0
    blue = 0
    opacity = 1

    draw(ctx){
        ctx.fillStyle = `rgba(${this.red}, ${this.green}, ${this.blue}, ${this.opacity})`
        ctx.font = this.font
        ctx.textAlign = this.textAlign
        ctx.textBaseline = this.textBaseline


        ctx.fillText(this.text, 0, 0)
    }
}


