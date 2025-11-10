class DestroyTimer extends Component{
    currentTime = 0
    timeWhenDestroy = 5

    start(){
        this.currentTime = Time.time
    }

    update(){
        if(Time.time > this.currentTime + this.timeWhenDestroy){
            this.gameObject.destroy()
        }
    }
}