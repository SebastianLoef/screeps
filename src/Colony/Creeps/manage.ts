import { ColonyMemory } from "Colony/memory";
import { queueCreep } from "./queue"
import { SourceMemory } from "Room/source";
import { expectedCreeps } from "./expectCreeps";
import { count } from "console";
import { getCreepCost } from "Creeps/getCreepCost";
import { getBody } from "Creeps/getBody";

function countCreeps(creeps: {[creep_id: string]: string}, queue: QueueItem[]) {
    var count: { [role: string]: number } = {};
    for (let creep of Object.keys(creeps)) {
        if (!(count[creep])){
            count[Memory.creeps[creep].role] = 0;
        }
        count[Memory.creeps[creep].role] += 1;
    }
    for (let item of queue) {
        if (!(count[item.memory.role])){
            count[item.memory.role] = 0;
        }
        count[item.memory.role] += 1;
    }
    return count;
}
function countOldCreeps (creeps: {[creep_id: string]: string}, energy: number) {
    var oldCreeps: string[] = [];
    for (let creep_id of Object.keys(creeps)){
        let role: string = creeps[creep_id];
        let creep: Creep = Game.creeps[creep_id];
        let body = creep.body.map((element) => {return element.type});
        let bodyCost: number = getCreepCost(body);
        let expectedCost: number = getCreepCost(getBody(role, energy));
        if (bodyCost < expectedCost){
            oldCreeps.push(creep_id)
        }
    }
    return oldCreeps
}
export function managePopulation(colonyMemory: ColonyMemory, colonyName: string) {
        let controllerId = colonyMemory.controllerId;
        if (!controllerId) {
            return -1;
        }
        let controller = Game.getObjectById(controllerId);
        if (!controller){
            return -1;
        }
        let lvl = controller.level;
        let energy = colonyMemory.room.energyCapacityAvailable;
        if (Object.keys(colonyMemory.creeps).length == 0 || lvl < 2){
            queueCreep("multi", energy, colonyName);
            return 0;
        }
        let num_creeps: {[role: string]: number} = countCreeps(colonyMemory.creeps, colonyMemory.creepQueue)
        let expected: number | undefined;
        for (let key of ["harvester", "multi"]) { 
            expected = expectedCreeps(key, lvl, colonyMemory)
            if (!expected) {
                continue;
            }
            if (!num_creeps[key] || num_creeps[key] < expected){
                console.log("Queueing creep: ", key)
                queueCreep(key, energy, colonyName)
            }
        }
        if (colonyMemory.creepQueue.length != 0) {
            return 0;
        }
        let old_creeps = countOldCreeps(colonyMemory.creeps, energy);
        for (let old_creep of old_creeps) {
            Memory.creeps[old_creep].suicide = true;
        }
        return -1;
}