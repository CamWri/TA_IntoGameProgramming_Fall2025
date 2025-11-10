class MainScene extends Scene {
  constructor() {
    super();

    // Camera
    const cameraGameObject = new CameraGameObject();
    cameraGameObject.getComponent(Camera).backgroundColor = "skyblue";
    this.instantiate(cameraGameObject);

    // UI
    this.instantiate(new ScoreGameObject(), new Vector2(20, 30));

    // Environment Layout
    this.instantiate(new PlatformGameObject(800, 40), new Vector2(400, 700));

    this.instantiate(new PlatformGameObject(100, 20), new Vector2(150, 600));
    this.instantiate(new PlatformGameObject(150, 20), new Vector2(350, 550));
    this.instantiate(new PlatformGameObject(200, 20), new Vector2(600, 500));

    this.instantiate(new PlatformGameObject(100, 20), new Vector2(850, 450));
    this.instantiate(new MovingPlatformGameObject(
      80,
      20,
      [new Vector2(1000, 400), new Vector2(1200, 400), new Vector2(1000, 300)],
      50
    ), new Vector2(1000, 300));

    this.instantiate(new WallGameObject(25, 300), new Vector2(1400, 800));

    this.instantiate(new PlatformGameObject(200, 20), new Vector2(1400, 300));
    this.instantiate(new PlatformGameObject(150, 20), new Vector2(1650, 250));

    this.instantiate(new PlatformGameObject(300, 40), new Vector2(1900, 700));

    // Player
    let playerGameObject = this.instantiate(new PlayerGameObject(), new Vector2(100, 650));
    let playerHealthBarGameObject = this.instantiate(new HealthBarGameObject(playerGameObject), new Vector2(0, -20/playerGameObject.transform.scale.y));
    playerHealthBarGameObject.transform.setParent(playerGameObject.transform)

    //Enemies
    let enemy1GameObject = this.instantiate(new BasicEnemyGameObject(50), new Vector2(600, 460))
    let enemy1HealthBarGameObject = this.instantiate(new HealthBarGameObject(enemy1GameObject), new Vector2(0, -20/enemy1GameObject.transform.scale.y));
    enemy1HealthBarGameObject.transform.setParent(enemy1GameObject.transform)

    let enemy2GameObject = this.instantiate(new BasicEnemyGameObject(70), new Vector2(1000, 250))
    let enemy2HealthBarGameObject = this.instantiate(new HealthBarGameObject(enemy2GameObject), new Vector2(0, -20/enemy2GameObject.transform.scale.y));
    enemy2HealthBarGameObject.transform.setParent(enemy2GameObject.transform)

    let enemy3GameObject = this.instantiate(new BasicEnemyGameObject(70), new Vector2(1950, 660))
    let enemy3HealthBarGameObject = this.instantiate(new HealthBarGameObject(enemy3GameObject), new Vector2(0, -20/enemy3GameObject.transform.scale.y));
    enemy3HealthBarGameObject.transform.setParent(enemy3GameObject.transform)

    let enemy4GameObject = this.instantiate(new BasicEnemyGameObject(70), new Vector2(400, 460))
    let enemy4HealthBarGameObject = this.instantiate(new HealthBarGameObject(enemy4GameObject), new Vector2(0, -20/enemy4GameObject.transform.scale.y));
    enemy4HealthBarGameObject.transform.setParent(enemy4GameObject.transform)
  }
}
