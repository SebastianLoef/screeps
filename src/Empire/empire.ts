//import { queue } from "wrappers/queue"
import { Colony } from "Colony/colony"
export class Empire {
    private colonies: Colony[];
    constructor() {
        this.colonies = [];
        this.addColony(Game.spawns["C0_0"]);        
    }

    run() {
        cleanCreeps();
        registerCreeps();
        for (let colony of this.colonies) {
            colony.run();
        }
    }

    addColony(spawn: StructureSpawn) {
        this.colonies.push(new Colony(spawn));
    }

    private spawnCreeps() {
        console.log("Spawning creeps");
    }

    private runColonies() {
    }


}

function registerCreeps() {
    for (let creep_id of Object.keys(Game.creeps)) {
        if (Memory.creeps[creep_id] == undefined) {
            Game.creeps[creep_id].suicide();
            continue;
        }
        let colonyName = Memory.creeps[creep_id].colonyName;
        if (colonyName == undefined) {
            continue;
        }
        let colony = Memory.colonies[colonyName];
        if (colony == undefined) {
            continue;
        }
        Memory.colonies[colonyName].creeps[creep_id] = Memory.creeps[creep_id].role;
    }
}

function cleanCreeps () {
    for (let creep_id of Object.keys(Memory.creeps)) {
        if (Game.creeps[creep_id] == undefined) {
            console.log("Deleting creep: " + creep_id)
            delete Memory.creeps[creep_id];
            let colonyName = Memory.creeps[creep_id].colonyName;
            delete Memory.colonies[colonyName].creeps[creep_id];
        }
    }
}