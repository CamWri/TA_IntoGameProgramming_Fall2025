class Events{
    static eventHandlers = []

    static addEventListener(signal, listener){
        Events.eventHandlers.push({signal, listener})
    }

    static clearEventListeners(){
        Events.eventHandlers = []
    }

    static fireEvent(signal, event){
        for(const handler of Events.eventHandlers){
            if(handler.signal == signal){
                handler.listener.handleEvent(signal, event)
            }
        }
    }
}