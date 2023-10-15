import { runMulti } from "./multi";
import { runHarvester } from "./harvester";
import { chargeCreep } from "./Behaviours/chargeCreep";

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
        default:
            runMulti(creep);
    }
}
