  class GameObject{
    components = []
    hasStarted = false
    markForDelete = false
    name = "[NO NAME]"
    tag = "[NO TAG]"
    layer = ""

    static idCounter = 0

    constructor(name, options){
      Object.assign(this, options)
      this.addComponent(new Transform())
      this.name = name
      this.id = GameObject.idCounter
      GameObject.idCounter++
    }

    broadCastMessage(name, args){
      for(const component of this.components){
        if(component[name]){
          component[name](...args)
        }
      }
    }

    start(){
      this.broadCastMessage("start", [])
    }

    update(){
      if(!this.hasStarted){
        this.hasStarted = true
        this.start()
      }

      this.broadCastMessage("update", [])
    }

    draw(ctx){
      for(const component of this.components){
        ctx.save()
        
        const worldMatrix = this.transform.getWorldMatrix()
        ctx.setTransform(ctx.getTransform().multiply(worldMatrix))

        //ctx.translate(this.transform.position.x, this.transform.position.y)
        //ctx.scale(this.transform.scale.x, this.transform.scale.y)
        //ctx.rotate(this.transform.rotation)

        component.draw(ctx)
        ctx.restore()
      }
    }

    addComponent(component, values){
      this.components.push(component)
      component.gameObject = this
      Object.assign(component, values)
    }

    getComponent(type){
      return this.components.find(component => component instanceof type)
    }
    
    get transform(){
      return this.components[0]
    }

    destroy(){
      this.markForDelete = true
    }

    static find(name){
      return SceneManager.getActiveScene().gameObjects.find(go => go.name == name)
    }

    static findByTag(tag){
      return SceneManager.getActiveScene().gameObjects.filter(go => go.tag == tag)
    }
}