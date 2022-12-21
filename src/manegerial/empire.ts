import { Colony } from "./colony";



export function add_colony(spawn: any) {
    let room = spawn.room

    let new_colony: Colony = {
        main_room: room.name,
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
