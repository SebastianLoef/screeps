import { Colony } from "./colony";
import colony from "./colony";
import { get_adjacent_rooms } from "utils/tools"


export function add_colony(spawn: any) {
    let room = spawn.room
    let adjacent_rooms = get_adjacent_rooms(room.name, 2)
    let new_colony: Colony = {
        main_room: room.name,
        adjacent_rooms: adjacent_rooms,
        spawns: [spawn.id],
        controller: room.controller.id
    }
    Memory.colonies["mame"] = new_colony
}

function add_colonies() {
   return 0 
}


function test_func(m: string) {
    console.log(m)
}

function run(){

    for (let i = 0; i < 10; i++){
        global.os.schedule(test_func, ["a string"])
    }    
    return 0
}

export default { run }
