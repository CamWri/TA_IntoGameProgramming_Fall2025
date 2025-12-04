class Vector2 {
    x
    y

    constructor(x, y) {
        this.x = x
        this.y = y
    }

    static get zero(){return new Vector2(0,0)}
    
    static get left(){return new Vector2(-1,0)}
    static get right(){return new Vector2(1,0)}
    static get up(){return new Vector2(0,-1)}
    static get down(){return new Vector2(0,1)}

    static fromDOMPoint(DOMPoint){
        return new Vector2(DOMPoint.x, DOMPoint.y)
    }

    toDOMPoint(){
        return new DOMPoint(this.x, this.y)
    }

    plusEquals(other) {
        this.x += other.x
        this.y += other.y
    }

    plus(other){
        return new Vector2(this.x + other.x, this.y + other.y)
    }

    minus(other){
        return new Vector2(this.x - other.x, this.y - other.y)
    }

    clone(){
        return new Vector2(this.x, this.y)
    }

    times(scalar){
        return new Vector2(this.x * scalar, this.y * scalar)
    }

    scale(other){
        return new Vector2(this.x * other.x, this.y * other.y)
    }

    dot(other){
        return this.x * other.x + this.y * other.y
    }

    orthogonal(){
        return new Vector2(-this.y, this.x)
    }

    get magnitude(){
        return Math.sqrt(this.x **2 + this.y **2)
    }

    normalize(){
        if(this.magnitude == 0) return this.clone()
        return new Vector2(this.x/this.magnitude, this.y/this.magnitude)
    }

    rotate(radians){
        let radius = this.magnitude
        let currentRadians = Math.atan2(this.y, this.x)
        let newRadians = currentRadians + radians
        let newX = Math.cos(newRadians) * radius
        let newY = Math.sin(newRadians) * radius
        return new Vector2(newX, newY)
    }
}