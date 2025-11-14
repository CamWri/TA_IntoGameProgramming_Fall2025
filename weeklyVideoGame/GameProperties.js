class GameProperties{
    layers = ["platform", "health", "player", "enemy", "projectile"]
    collisionLayers = [["player", "enemy"], ["projectile", "enemy"], 
                        ["platform", "player"], ["platform", "enemy"],["platform", "projectile"],
                    ]
}