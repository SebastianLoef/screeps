import { count_source_adj_spots } from "utils/tools";
import { new_creep, Worker } from "creeps/workers"

function queue_creeps(c: Colony) {
    let harvester: Worker  = new_creep("harvester", 1)
    let hauler: Worker  = new_creep("hauler", 1)
    

    let total_spots: number = 0
    for (let source of c.sources) {
        total_spots += count_source_adj_spots(source.id)
    } 
    let total_harvs: number = (
        c.workers.filter(worker => worker.type == 'harvester').length +
        c.queue.filter(worker => worker.type == 'harvester').length
    )
    let diff: number ) total_harvs - total_spots
    for (let i = 0; i < diff; i++){
        c.creeps_queue.push(harvester)
        c.creeps_queue.push(hauler)
    }
    return 0
}


export function run_phase(c: Colony) {
    let room = Game.getObjectbyId(c.room)
    // This phase always assume everything is destroyed


    queue_creeps(c)
    // spawn creeps, how many?
    // as many harvesters per source as possible
    // as many carriers as needed
    // a couple of builders/upgraders.
    // in that order
    // main goal not to waste resources
    //
    // No structures in this phase
    //
    // Call to actions
    //
    
}
