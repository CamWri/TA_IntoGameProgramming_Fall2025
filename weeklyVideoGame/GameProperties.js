class GameProperties{
    layers = ["platform", "health", "player", "enemy", "projectile", "enemyProjectile"]
    collisionLayers = [["player", "enemy"], ["projectile", "enemy"], 
                        ["platform", "player"], ["platform", "enemy"],["platform", "projectile"],   
                        ["enemyProjectile", "player"], ["enemyProjectile", "platform"]
                    ]
}