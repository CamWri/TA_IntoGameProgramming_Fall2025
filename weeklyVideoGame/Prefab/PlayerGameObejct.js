class PlayerGameObject extends GameObject{
    constructor(){
        super("Player Game Object", {layer: "player"})
        
        this.addComponent(new PlayerController())
        this.addComponent(new Polygon(), {points: Assets.square, red: GameGlobals.playerRed, green: GameGlobals.playerGreen, blue: GameGlobals.playerBlue})
        this.addComponent(new Collider())
        this.addComponent(new HealthPoolController(), {maxHP: GameGlobals.playerStats.maxHealth, currentHP: GameGlobals.playerStats.maxHealth, hasInvulnerability: true})
        this.addComponent(new RigidBody(), {gravity: new Vector2(0, 10)})
        
        this.transform.scale = new Vector2(10, 10)
    }
}