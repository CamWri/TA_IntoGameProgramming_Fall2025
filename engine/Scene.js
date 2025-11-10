  class Scene {
    gameObjects = []
    start() {
        for (const gameObject of this.gameObjects) {
            gameObject.start()
            gameObject.hasStarted = true
        }
    }
    update() {
        
        //Update everything
        for (const gameObject of this.gameObjects) {
            //Start if the gameObject hasn't started yet
            if (!gameObject.hasStarted) {
                gameObject.start()
                gameObject.hasStarted = true
            }
            gameObject.update()
        }

        //Do Collision Detection
        for(const collisionLayer of Engine.collisionLayers){

            const gameObjectsWithCollidersA = this.gameObjects.filter(go=>go.getComponent(Collider) && go.layer == collisionLayer[0])
            const gameObjectsWithCollidersB = this.gameObjects.filter(go=>go.getComponent(Collider) && go.layer == collisionLayer[1])

            for(let i = 0; i < gameObjectsWithCollidersA.length; i++){
                for(let j = 0; j < gameObjectsWithCollidersB.length; j++){


                    let a = gameObjectsWithCollidersA[i]
                    let b = gameObjectsWithCollidersB[j]

                    if(a == b) continue

                    let response = Collisions.inCollision(a,b)
                    if(response){
                        const aHasRigidBody = a.getComponent(RigidBody)
                        const bHasRigidBody = b.getComponent(RigidBody)
                        if(aHasRigidBody){
                            if(a.transform.position.minus(b.transform.position).dot(response) < 0)
                                response = response.times(-1)
                            a.transform.position.plusEquals(response)
                        }
                        if(bHasRigidBody){
                            if(b.transform.position.minus(a.transform.position).dot(response) < 0)
                                response = response.times(-1)
                            b.transform.position.plusEquals(response)
                        }



                        for(const component of a.components){
                            component.onCollisionEnter?.(b)
                        }
                        for(const component of b.components){
                            component.onCollisionEnter?.(a)
                        }
                    }
                }
            }
        }

        //Delete what needs to be removed
        this.gameObjects = this.gameObjects.filter(go => !go.markForDelete)
    }
    draw(ctx) {

        ctx.save()

        //Camera to Screen Space
        ctx.translate(window.innerWidth/2, window.innerHeight/2)

        //World to Camera Space
        ctx.translate(-Camera.main.transform.position.x, -Camera.main.transform.position.y)

        for(const layer of Engine.layers.filter(l => l != "UI")){
            const gameObjects = this.gameObjects.filter(go => go.layer == layer)
            for (const gameObject of gameObjects) {
                gameObject.draw(ctx)
            }
        }

        ctx.restore()

        const gameObjects = this.gameObjects.filter(go => go.layer == "UI")
        for (const gameObject of gameObjects) {
            gameObject.draw(ctx)
        }
    }
    instantiate(gameObject, position) {
        this.gameObjects.push(gameObject)
        if (position){
            gameObject.transform.position = position
        }

        return gameObject
    }
}

function instantiate(gameObject, position){
    return SceneManager.getActiveScene().instantiate(gameObject, position)
}