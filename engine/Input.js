class Input {
    static keysDown = []
    static keysDownThisFrame = []
    static keysUpThisFrame = []
    
    static buttonsDown = []
    static buttonsDownThisFrame = []
    static buttonsUpThisFrame = []


    static mousePosition

    static keydown(event) {
        if (!Input.keysDown.includes(event.code)){
            Input.keysDown.push(event.code)
            Input.keysDownThisFrame.push(event.code)
        }

    }

    static keyup(event) {
        Input.keysDown = Input.keysDown.filter(k => k != event.code)
        Input.keysUpThisFrame.push(event.code)
    }

    static mousedown(event) {
        if (!Input.buttonsDown.includes(event.button)) {
            Input.buttonsDown.push(event.button)
            Input.buttonsDownThisFrame.push(event.button)
        }
    }

    static mouseup(event) {
        Input.buttonsDown = Input.buttonsDown.filter(b => b != event.button)
        Input.buttonsUpThisFrame.push(event.button)
    }

    static mousemove(event){
        Input.mousePosition = new Vector2(event.clientX, event.clientY)
    }

    static update(){
        Input.keysDownThisFrame = []
        Input.keysUpThisFrame = []
        Input.buttonsDownThisFrame = []
        Input.buttonsUpThisFrame = []
    }
}