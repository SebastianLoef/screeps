import { runMulti } from "./Roles/multi";
import { runHarvester } from "./Roles/harvester";
import { chargeCreep } from "./Behaviours/chargeCreep";
import { recycleCreep } from "./Behaviours/recycleCreep";
import { runTruck } from "./Roles/truck";
import { runBuilder } from "./Roles/builder";

function removeFromMemory (creep_id: string) {
    //let colonyName: string = Memory.creeps[creep_id].colonyName;
    delete Memory.creeps[creep_id];
    //delete Memory.colonies[colonyName].creeps[creep_id];
}

function runRole(creep: Creep){
    switch (creep.memory.role){
        case "multi":
            runMulti(creep);
            break;
        case "harvester":
            runHarvester(creep);
            break;
        default:
            console.log("No role defined for: ", creep.name);
            return;
    }
}
export function runCreep (creep_id: string) {
    const creep: Creep | undefined = Game.creeps[creep_id];
    if (!creep) {
        removeFromMemory(creep_id);
        return;
    }
    // Suicide creep if it has a suicide flag
    if (creep.memory.suicide){
        recycleCreep(creep);
    }
    // Charge creep if it's about to die
    if (creep.memory.role != "multi" && creep.ticksToLive && creep.ticksToLive < 200){
        creep.memory.charging = true;
    }
    if (creep.memory.charging){
        if (creep.ticksToLive && creep.ticksToLive > 1400){
            creep.memory.charging = false;
        } else {
            chargeCreep(creep);
        return;
        }
    }
    switch (creep.memory.role) {
        case "multi":
            runMulti(creep);
            break;
        case "harvester":
            runHarvester(creep);
            break;
        case "truck":
            runTruck(creep);
            break;
        case "builder":
            runBuilder(creep);
            break;
        default:
            console.log("No instructions for creep of with role: ", creep.memory.role)
            break;
    }
}
