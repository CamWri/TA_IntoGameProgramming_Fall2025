class Camera extends Component{
    backgroundColor = "magenta"
    static get main(){
        return GameObject.find("Camera Game Object")
    }

    static screenToWorldSpace(screenSpace){
        let screen = new DOMPoint(screenSpace.x, screenSpace.y)
        let matrix = new DOMMatrix()
        matrix.translateSelf(window.innerWidth/2, window.innerHeight/2)
        matrix.translateSelf(-Camera.main.transform.position.x, -Camera.main.transform.position.y)
        let screenMatrix = matrix.inverse()
        let worldPoint = screenMatrix.transformPoint(screen)
        return new Vector2(worldPoint.x, worldPoint.y)
    }
}