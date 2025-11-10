class MainScene extends Scene{
    constructor(){
        super()
        this.instantiate(new RectangleGameObject(50, 50), new Vector2(500, 800))

        this.instantiate(new EnemeySpawnerGameObject(), new Vector2(500, 350))
        this.instantiate(new EnemeySpawnerGameObject(), new Vector2(250, 100))
        this.instantiate(new EnemeySpawnerGameObject(), new Vector2(100, 100))
        this.instantiate(new EnemeySpawnerGameObject(), new Vector2(200, 300))

        this.instantiate(new EnemeySpawnerGameObject(), new Vector2(800, 350))
        this.instantiate(new EnemeySpawnerGameObject(), new Vector2(900, 100))
        this.instantiate(new EnemeySpawnerGameObject(), new Vector2(700, 100))
        this.instantiate(new EnemeySpawnerGameObject(), new Vector2(1000, 300))

        this.instantiate(new ScoreGameObject(), new Vector2(100, 30))
    }
}