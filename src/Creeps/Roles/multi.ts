import { findBestSource } from "../Behaviours/findBestSource";
import { findClosest } from "../Behaviours/findClosest";
import { findClosestLocalResource } from "../Behaviours/findClosestLocalResource";


function targetStorage(creep: Creep) {
    let controller: StructureController | undefined = creep.room.controller;
    if (controller && controller.level < 3) {
        return controller.id;
    }
    let targets: Structure[] = creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
            return ((structure.structureType == STRUCTURE_EXTENSION ||
                structure.structureType == STRUCTURE_SPAWN) &&
                structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0);
        }
    });
    if (targets.length > 0) {
        return findClosest(creep.pos, targets).id;
    }
    targets = creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
            return (structure.structureType == STRUCTURE_TOWER &&
                structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0);
        }
    });
    if (targets.length > 0) {
        return findClosest(creep.pos, targets).id;
    }
    targets = creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
            return (structure.structureType == STRUCTURE_STORAGE);
        }
    });
    if (targets.length > 0) {
        return targets[0].id;
    }
    return undefined;
}
function targetSource(creep: Creep) {
    let target: Id<Structure | Source | Resource | ConstructionSite> | undefined =  findClosestLocalResource(creep);
        if (target){
            return target;
        }
        target = findBestSource(creep);
        if (target){
            return target;
        }
        console.log("No Source found for creep: ", creep.name);
        return undefined;
}

function setCurrentJob(creep: Creep) {
    let target = Game.getObjectById(creep.memory.job.target);
    if (creep.store.getUsedCapacity() == 0 && !(target instanceof Source)){
            let target = targetSource(creep);
            creep.memory.job.target = target;
            return 0;
        }
    if (creep.store.getFreeCapacity() == 0){
        creep.memory.job.target = targetStorage(creep);
        return 0;
    }
    return undefined;
}

export function runMulti(creep: Creep) {
    if (!("target" in creep.memory.job)){
        creep.memory.job['target'] = "";
    }
    setCurrentJob(creep);
    let target = Game.getObjectById(creep.memory.job.target);
    if (!target) {
        let new_target = targetSource(creep);
        if (new_target){
            creep.memory.job.target = new_target;
        }
        console.log("No target found for creep: ", creep.name, ". Assigning new target");
        return -1;
    }
    if (target instanceof Source) {
        const sources = creep.room.find(FIND_SOURCES);
        if (creep.harvest(target) == ERR_NOT_IN_RANGE) {
            creep.moveTo(target);
        }
        return 0;
    }
    if (target instanceof Resource) {
        if (creep.pickup(target) == ERR_NOT_IN_RANGE) {
            creep.moveTo(target);
        }
        return 0;
    }
    if (target instanceof StructureContainer || target instanceof StructureLink) {
        if (creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(target);
        }
        return 0;
     
    }
    if (target instanceof StructureController) {
        if (creep.upgradeController(target) == ERR_NOT_IN_RANGE) {
            creep.moveTo(target);
        }
        return 0;
    }
    if (target instanceof Structure) {
        if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(target);
        }
        return 0;
    }
    console.log("No target found for creep: ", creep.name);
   
    return -1;

}