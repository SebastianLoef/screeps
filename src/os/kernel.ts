import { Process } from './process'



function run_process (p: Process) {
    try {
        let func = p.task
        func(...p.args)
        return 0
    } catch(e) { // Log errors
        return 1
    }
}

function run_processes (queue: Process[]){
    while (queue.length > 0) {
        let p: Process = queue[queue.length - 1]
        if (!run_process(p)) {
            queue.length--
        }
    }
}
export class Kernel {
    priority_queue: Process[]
    constructor() {
        this.priority_queue = []
    }

    schedule(task: any, args: any[]){
        const p: Process = {
            id: 0, 
            priority: 0,
            task: task, 
            args: args
        }
        this.priority_queue.push(p)
    }
    run(){
        console.log(this.priority_queue.length)
        run_processes(this.priority_queue)
    }
    

}
/*
function extend_priority_queue(queue: Process[], new_processes: Process[]) {
    // Currently naive addition
    for (let process of new_processes) {
        queue.push(process)
    }
}
function run() {
    let priority_queue: Process[] = Memory.priority_queue
    // get new tasks by running the empire
    let new_processes = empire.run()
    extend_priority_queue(priority_queue, new_processes)

    run_processes(priority_queue)
}
*/
export default { }
