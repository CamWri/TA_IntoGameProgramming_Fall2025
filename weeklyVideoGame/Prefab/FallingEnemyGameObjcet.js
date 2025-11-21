class FallingEnemyGameObject extends GameObject{
    constructor(){
        super("Falling Enemy Game Object", {layer: "enemy"})

        //Left and Right Movement
        const moveLeftSequence = new BTSequence([new BTShouldMoveLeft(), new BTMoveLeft()])
        const moveRightSequence = new BTSequence([new BTShouldMoveRight(), new BTMoveRight()])

        const baseMovement = new BTSelector([moveLeftSequence, moveRightSequence])

        const dropDownAttack = new BTSequence([new BTAbovePlayer(), new BTDropOnPlayer()])

        const onCielingMovement = new BTParallel(dropDownAttack, baseMovement)

        const onFloorMovement = new BTSelector([new BTChasePlayer(), baseMovement])

        const movement = new BTSelector([onCielingMovement, onFloorMovement])

        this.addComponent(new BehaviorTree(), {node: new BTRepeater(movement)})

        this.addComponent(new FallingEnemyController())
        this.addComponent(new Polygon(), {points: Assets.square, red: 162, green: 255, blue: 162})
        this.addComponent(new Collider())
        this.addComponent(new HealthPoolController(), {maxHP: 20, currentHP: 10})
        this.addComponent(new FadingController())
        this.addComponent(new HitEffectController())
        this.addComponent(new RigidBody(), {gravity: new Vector2(0, 512)})
        this.transform.scale = new Vector2(15, 5)
    }
}

class BTAbovePlayer{
    update(tree){
        const enemy = tree.gameObject
        const ec = tree.gameObject.getComponent(FallingEnemyController)

        const player = GameObject.find("Player Game Object")
        
        if(!player || ec.hasDropped){
            return BehaviorTree.FAILED
        }

        const dx = Math.abs(enemy.transform.position.x - player.transform.position.x)
        const toleranceX = 20;

        if(dx <= toleranceX && player.transform.position.y > enemy.transform.position.y){
            return BehaviorTree.SUCCEEDED
        }

        return BehaviorTree.RUNNING
    }
}

class BTDropOnPlayer{
   update(tree){
        const enemy = tree.gameObject
        const ec = enemy.getComponent(FallingEnemyController)
        const rb = enemy.getComponent(RigidBody)

        ec.hasDropped = true;
        ec.isChasing = true;

        rb.gravity.y = 512
        rb.velocity.y = 150

        return BehaviorTree.SUCCEEDED
    }
}

class BTChasePlayer{
    update(tree){
        const enemy = tree.gameObject
        const ec = enemy.getComponent(FallingEnemyController)
        const rb = enemy.getComponent(RigidBody)

        const player = GameObject.find("Player Game Object")

        if(!player || !ec.hasDropped){
            return BehaviorTree.FAILED
        }

        if(!ec.isChasing){
            return BehaviorTree.FAILED
        }

        const enemyX = enemy.transform.position.x
        const playerX = player.transform.position.x

        const dir = playerX > enemyX ? 1 : -1

        rb.velocity.x = dir * 70

        return BehaviorTree.RUNNING
    }
}
