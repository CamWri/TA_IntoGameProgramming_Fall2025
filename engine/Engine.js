class Engine{
    static layers = ["",  "UI"]

    static collisionLayers = [["", ""]]

    static canvas

    static ctx

    static lastRequestAnimationFrame = performance.now()

    /**
     * 
     * @param {GameProperties} gameProperties 
     */
    static start(gameProperties){
        if(gameProperties){
            Engine.layers.push(...gameProperties.layers)
            if(gameProperties.collisionLayers){
                Engine.collisionLayers = gameProperties.collisionLayers
            }
        }

        Engine.canvas = document.querySelector("#canv")
        Engine.ctx = Engine.canvas.getContext("2d")

        addEventListener("keydown", Input.keydown)
        addEventListener("keyup", Input.keyup)

        addEventListener("mousedown", Input.mousedown)
        addEventListener("mouseup", Input.mouseup)

        addEventListener("mousemove", Input.mousemove)
        SceneManager.update()
        SceneManager.getActiveScene().start()
        Engine.gameLoop()
    }

    static update(){
        SceneManager.getActiveScene().update()
    }

    static draw(){        
        Engine.canvas.width = window.innerWidth
        Engine.canvas.height = window.innerHeight

        Engine.ctx.fillStyle = Camera.main.getComponent(Camera).backgroundColor
        Engine.ctx.beginPath()
        Engine.ctx.rect(0, 0, Engine.canvas.width, Engine.canvas.height)
        Engine.ctx.fill()

        SceneManager.getActiveScene().draw(Engine.ctx)
    }

    static gameLoop(currentTime){
        const elapsedTime = currentTime - Engine.lastRequestAnimationFrame
        Time.deltaTime = elapsedTime/1000

        Engine.lastRequestAnimationFrame = currentTime

        SceneManager.update()
        Engine.update()
        Engine.draw()
        Input.update()
        Time.update()
        requestAnimationFrame(Engine.gameLoop)
    }
}