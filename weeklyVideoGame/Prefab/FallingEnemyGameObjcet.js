class FallingEnemyGameObject extends GameObject{
    constructor(){
        super("Falling Enemy Game Object", {layer: "enemy"})

        const moveLeftSequence = new BTSequence([new BTShoudlMoveLeft(),new BTMoveLeft()])
        const moveRightSequence = new BTSequence([new BTShoudlMoveRight(),new BTMoveRight()])

        const baseMovement = new BTSelector([moveLeftSequence, moveRightSequence])

        const dropDownAttack = new BTSequence([new BTAbovePlayer(), new BTDropOnPlayer()])

        const onCeilingMovemment = new BTParallel(dropDownAttack, baseMovement)

        const onFloorMovement = new BTSelector([new BTChasePlayer(), baseMovement])

        const movement = new BTSelector([onCeilingMovemment, onFloorMovement])

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

class BTAbovePlayer {
    update(tree){
        const enemy = tree.gameObject;
        const player = GameObject.find("Player Game Object");
        const ec = enemy.getComponent(FallingEnemyController);

        if(!player || ec.hasDropped) 
            return BehaviorTree.FAILED;

        const dx = Math.abs(enemy.transform.position.x - player.transform.position.x);
        const toleranceX = 20;

        const playerBelow = player.transform.position.y > enemy.transform.position.y;

        if(dx <= toleranceX && playerBelow){
            return BehaviorTree.SUCCEEDED; // allow drop
        }

        return BehaviorTree.RUNNING;
    }
}

class BTDropOnPlayer {
    update(tree){
        const enemy = tree.gameObject;
        const rb = enemy.getComponent(RigidBody);
        const ec = enemy.getComponent(FallingEnemyController);

        ec.hasDropped = true;
        ec.isChasing = true;

        rb.gravity.y = 512;
        rb.velocity.y = 150;

        return BehaviorTree.SUCCEEDED;
    }
}

class BTChasePlayer {
    update(tree){
        const enemy = tree.gameObject;
        const player = GameObject.find("Player Game Object");
        const rb = enemy.getComponent(RigidBody);
        const ec = enemy.getComponent(FallingEnemyController);

        if(!player || !ec.hasDropped)
            return BehaviorTree.FAILED;

        if(!ec.isChasing){
            return BehaviorTree.FAILED;
        }

        const enemyX = enemy.transform.position.x;
        const playerX = player.transform.position.x;

        const dir = playerX > enemyX ? 1 : -1;

        rb.velocity.x = dir * 70; // chase speed

        return BehaviorTree.RUNNING;
    }
}

