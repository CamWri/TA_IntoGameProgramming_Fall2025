class SelectionScene extends Scene{
    constructor(){
        super();

        const cameraGameObject = new CameraGameObject();
        cameraGameObject.getComponent(Camera).backgroundColor = "gray";
        this.instantiate(cameraGameObject, new Vector2(0, 0))

        const startSceneControllerGameObject= new GameObject("Start Scene Controller Game Object")
        startSceneControllerGameObject.addComponent(new StartSceneController())
        startSceneControllerGameObject.addComponent(new Polygon(), {red: 0, green: 0, blue: 0, points: Assets.triangle})
        startSceneControllerGameObject.transform.scale = new Vector2(10, 10)
        this.instantiate(startSceneControllerGameObject, new Vector2(0, 0))

        //Tank
        const tankUIContainerGameObject = this.instantiate(new GameObject("Tank UI Container Game Object"), new Vector2(-400, 0))

        const tankModelGameObject = new GameObject("Tank Game Object", {tag: "Player Options"})
        tankModelGameObject.addComponent(new Polygon(), {red: 200, green: 0, blue: 255, points: Assets.square})
        tankModelGameObject.addComponent(new CharacterStatsController(), {playerArchetype: 0})
        tankModelGameObject.transform.scale = new Vector2(50, 50)
        this.instantiate(tankModelGameObject, new Vector2(0 ,0))

        tankModelGameObject.transform.setParent(tankUIContainerGameObject.transform)

        const tankTextGameObject = new GameObject("Tank Text Game Object")
        tankTextGameObject.addComponent(new Text(), {red: 0, green: 0, blue: 0, text: "Tank", textAlign: "center"})
        tankTextGameObject.transform.scale = new Vector2(1, 1)
        this.instantiate(tankTextGameObject, new Vector2(0, -75))

        tankTextGameObject.transform.setParent(tankUIContainerGameObject.transform)

        //Sniper
        const sniperUIContainerGameObject = this.instantiate(new GameObject("Sniper UI Container Game Object"), new Vector2(0, 0))

        const sniperModelGameObject = new GameObject("Sniper Game Object", {tag: "Player Options"})
        sniperModelGameObject.addComponent(new Polygon(), {red: 19, green: 74, blue: 86, points: Assets.square})
        sniperModelGameObject.addComponent(new CharacterStatsController(), {playerArchetype: 1})
        sniperModelGameObject.transform.scale = new Vector2(50, 50)
        this.instantiate(sniperModelGameObject, new Vector2(0 ,0))

        sniperModelGameObject.transform.setParent(sniperUIContainerGameObject.transform)

        const sniperTextGameObject = new GameObject("Sniper Text Game Object")
        sniperTextGameObject.addComponent(new Text(), {red: 0, green: 0, blue: 0, text: "Sniper", textAlign: "center"})
        sniperTextGameObject.transform.scale = new Vector2(1, 1)
        this.instantiate(sniperTextGameObject, new Vector2(0, -75))

        sniperTextGameObject.transform.setParent(sniperUIContainerGameObject.transform)

        //Assualt
        const assualtUIContainerGameObject = this.instantiate(new GameObject("Sniper UI Container Game Object"), new Vector2(400, 0))

        const assualtModelGameObject = new GameObject("Sniper Game Object", {tag: "Player Options"})
        assualtModelGameObject.addComponent(new Polygon(), {red: 255, green: 0, blue: 111, points: Assets.square})
        assualtModelGameObject.addComponent(new CharacterStatsController(), {playerArchetype: 2})
        assualtModelGameObject.transform.scale = new Vector2(50, 50)
        this.instantiate(assualtModelGameObject, new Vector2(0 ,0))

        assualtModelGameObject.transform.setParent(assualtUIContainerGameObject.transform)

        const assualtTextGameObject = new GameObject("ASsualt Text Game Object")
        assualtTextGameObject.addComponent(new Text(), {red: 0, green: 0, blue: 0, text: "Assualt", textAlign: "center"})
        assualtTextGameObject.transform.scale = new Vector2(1, 1)
        this.instantiate(assualtTextGameObject, new Vector2(0, -75))

        assualtTextGameObject.transform.setParent(assualtUIContainerGameObject.transform)
    }
}