class BehaviorTree extends Component{
    static FAILED = 0
    static SUCCEEDED = 1
    static RUNNING = 2

    node

    update(){
        this.node.update(this)
    }
}

class BTRepeater{
    constructor(node){
        this.node = node
    }

    update(tree){
        if(this.node.update(tree) == BehaviorTree.RUNNING){
            return BehaviorTree.RUNNING
        }
        this.node.reset?.()
        return BehaviorTree.RUNNING
    }
}

class BTSequence{
    constructor(nodes){
        this.nodes = nodes
        this.currentNode = 0
    }

    reset(){
        this.currentNode = 0
        this.nodes.forEach(n => n.reset?.())
    }

    update(tree){
        while(this.currentNode < this.nodes.length){
            const result = this.nodes[this.currentNode].update(tree)

            if(result != BehaviorTree.SUCCEEDED){
                return result
            }
            this.currentNode++
        }
        return BehaviorTree.SUCCEEDED
    }
}

class BTDuration{
    constructor(duration){
        this.duration = duration
    }

    reset(){
        delete this.startTime
    }

    update(tree){
        if(!this.startTime){
            this.startTime = Time.time
        }

        if(Time.time > this.startTime + this.duration){
            return BehaviorTree.SUCCEEDED
        }
        return BehaviorTree.RUNNING
    }
}

class BTParallel{
    constructor(one, two){
        this.one = one
        this.two = two
    }

    reset(){
        this.one.reset?.()
        this.two.reset?.()
    }

    update(tree){
        if(this.two.update(tree) != BehaviorTree.RUNNING){
            this.two.reset?.()
        }

        return this.one.update(tree)
    }
}

class BTSelector{
    constructor(nodes){
        this.nodes = nodes
        this.currentNode = 0
    }

    reset(){
        this.currentNode = 0
        this.nodes.forEach(n => n.reset?.())
    }

    update(tree){
        while(this.currentNode < this.nodes.length){
            const result = this.nodes[this.currentNode].update(tree)

            if(result != BehaviorTree.FAILED){
                return result
            }
            this.currentNode++
        }
        return BehaviorTree.FAILED
    }
}