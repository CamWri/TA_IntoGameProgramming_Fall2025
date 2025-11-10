class EnemeySpawnerGameObject extends GameObject{
    constructor(){
        super("Enemey Spawner Game Object")

        this.addComponent(new Polygon(), {fillStyle: "yellow", points: Assets.square})
        this.addComponent(new EnemeySpawnController())

        this.transform.scale = new Vector2(25, 25)
    }
}