import { Worker } from "creeps/workers"
import { Source, Room } from "misc/environment"

export interface Colony {
    main_room: string
    spawns: string[]
    workers?: Worker
    local_sources?: Sources[]
    controller: string
    creeps_queue?: Worker[]
}


// Returns resources from specified room
function get_sources(room: string) {

    let room = Game.getObjectbyId(room)
    let source_dict: Source[] = []
    for (let source of room.find(FIND_SOURCES)){
        let source_obj: Source = {
            id: source.id,
            container: false
        }
        source_dict.push(source_obj)
    }
    return source_dict
}
function update_sources(c: Colony){
    // Local sources
    let local_sources = get_sources(c.room)
    c.local_sources = c.local_sources.concat(local_sources)
}

export function run(c: Colony) {
    let clvl = Game.getObjectById(c.controller).clvl
    import { run_phase } from "manegerial/phase_lvl" + clvl.toString();
    run_phase(c)
    

}
export default { run }
