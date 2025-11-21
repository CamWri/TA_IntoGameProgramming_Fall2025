class BasicEnemyGameObject extends GameObject{
    constructor(horizontalSpeed){
        super("Basic Enemy Game Object", {layer: "enemy"})

        this.addComponent(new BasicEnemyController(), {speed: new Vector2(horizontalSpeed, 0)})
        
        const sprintSequence = new BTParallel(new BTDuration(1), new BTSprint())

        const handleHit = new BTSequence([new BTHandleHitPlayer(), sprintSequence])

        const moveLeftSequence = new BTSequence([new BTShoudlMoveLeft(),new BTMoveLeft()])

        const moveRightSequence = new BTSequence([new BTShoudlMoveRight(),new BTMoveRight()])

        const movementSelect = new BTSelector([handleHit, moveLeftSequence, moveRightSequence])

        this.addComponent(new BehaviorTree(), {node: new BTRepeater(movementSelect)})

        this.addComponent(new Polygon(), {points: Assets.square, red: 0, green: 255, blue: 162})
        this.addComponent(new Collider())
        this.addComponent(new HealthPoolController(), {maxHP: 20, currentHP: 10})
        this.addComponent(new FadingController())
        this.addComponent(new HitEffectController())

        this.addComponent(new RigidBody(), {gravity: new Vector2(0, 512)})
        this.transform.scale = new Vector2(15, 5)
    }
}

class BTMoveRight{
    update(tree){
        let rb = tree.gameObject.getComponent(RigidBody)
        const ec = tree.gameObject.getComponent(BasicEnemyController) ?? tree.gameObject.getComponent(FallingEnemyController)

        rb.velocity.x = ec.speed.x
        return BehaviorTree.SUCCEEDED
    }
}

class BTMoveLeft{
    update(tree){
        let rb = tree.gameObject.getComponent(RigidBody)
        const ec = tree.gameObject.getComponent(BasicEnemyController) ?? tree.gameObject.getComponent(FallingEnemyController)
        rb.velocity.x = -ec.speed.x
        return BehaviorTree.SUCCEEDED
    }
}

class BTSprint {
    update(tree) {
        const ec = tree.gameObject.getComponent(BasicEnemyController) ?? tree.gameObject.getComponent(FallingEnemyController)
        const rb = tree.gameObject.getComponent(RigidBody)

        const sprintSpeed = ec.speed.x * 4
        const dir = ec.movementRight ? 1 : -1

        rb.velocity.x = sprintSpeed * dir

        return BehaviorTree.RUNNING
    }
}

class BTShoudlMoveRight{
    update(tree){
        const ec = tree.gameObject.getComponent(BasicEnemyController) ?? tree.gameObject.getComponent(FallingEnemyController)
        if(ec.movementRight){
            return BehaviorTree.SUCCEEDED
        }
        return BehaviorTree.FAILED
    }
}

class BTShoudlMoveLeft{
    update(tree){
        const ec = tree.gameObject.getComponent(BasicEnemyController) ?? tree.gameObject.getComponent(FallingEnemyController)
        if(!ec.movementRight){
            return BehaviorTree.SUCCEEDED
        }
        return BehaviorTree.FAILED
    }
}

class BTHandleHitPlayer {
    update(tree){
        const ec = tree.gameObject.getComponent(BasicEnemyController) ?? tree.gameObject.getComponent(FallingEnemyController)
        if(ec.hitPlayer){
            ec.hitPlayer = false
            return BehaviorTree.SUCCEEDED
        }
        return BehaviorTree.FAILED
    }
}