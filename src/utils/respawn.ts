import { add_colony} from "manegerial/empire";

export function isRespawned(){
    if (Object.keys(Game.structures).length != 2 &&
        Object.keys(Game.creeps).length != 0) {
        return 2
    }
    let spawn = Game.spawns[Object.keys(Game.spawns)[0]]
    for (let ckey in Memory.colonies){
        let colony_spawns = Memory.colonies[ckey].spawns
        if (colony_spawns.includes(spawn.id)) {
            return 1
        }
    }
    Memory.colonies = {}
    console.log("Adding new colony.")
    add_colony(spawn)
    return 0
}
