class EnemeySpawnController extends Component{
    start(){
        this.nextEnemeySpawnFrame = 250
        this.frame = 250
        this.spawnCounter = 0
    }

    update(){
        this.frame ++

        if(this.frame > this.nextEnemeySpawnFrame){
            this.spawnCounter++

            let randomXSpeed = Math.random() * 75 + 50
            let randomYSpeed = Math.random() * 75 + 50


            if(Math.random() > 0.5){
                randomXSpeed *= -1
            }

            if(Math.random() > 0.5){
                randomYSpeed *= -1
            }

            instantiate(new TriangleGameObject(randomXSpeed, randomYSpeed), this.gameObject.transform.position.clone())
            this.nextEnemeySpawnFrame = this.frame + 250
        }
    }
}