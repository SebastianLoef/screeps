import { find } from "lodash";
import { findBestSource } from "../Behaviours/findBestSource";
import { findClosest } from "../Behaviours/findClosest";
import { findRichestLocalResource } from "../Behaviours/findRichestLocalResource";


function findClosestConstructSite(creep: Creep) {
    let targets: ConstructionSite[] = creep.room.find(FIND_CONSTRUCTION_SITES);
    if (targets.length > 0) {
        return findClosest(creep.pos, targets).id;
    }
    return undefined;
}
function targetSource(creep: Creep) {
    let target;
    target = findRichestLocalResource(creep, 100);
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

function setCurrentJob(creep: Creep){
    if (creep.store.getUsedCapacity() == 0 && creep.memory.job.building){
        creep.memory.job.target = targetSource(creep);
        creep.memory.job.building = false;
        return 0;
    }
    if (creep.store.getFreeCapacity() == 0 && !creep.memory.job.building){
        creep.memory.job.target = findClosestConstructSite(creep);
        creep.memory.job.building = true;
        return 0;
    }
    return;
}

export function runBuilder(creep: Creep){
    if (!creep.memory.job.target){
        creep.memory.job.target = "";
    }
    if (!creep.memory.job.building){
        creep.memory.job.building = false;
    }
    setCurrentJob(creep);
    let target = Game.getObjectById(creep.memory.job.target);
    if (!target) {
        console.log("No target found for creep: ", creep.name, "Assisning new.");
        creep.memory.job.target = targetSource(creep);
        return;
    }
    if (target instanceof ConstructionSite) {
        if (creep.build(target) == ERR_NOT_IN_RANGE) {
            creep.moveTo(target, {reusePath: 10, visualizePathStyle: {stroke: '#ffffff'}});
        }
        return 0;
    }
    if (target instanceof Source) {
        const sources = creep.room.find(FIND_SOURCES);
        if (creep.harvest(target) == ERR_NOT_IN_RANGE) {
            creep.moveTo(target, {reusePath: 10});
        }
        return 0;
    }
    if (target instanceof Resource) {
        if (creep.pickup(target) == ERR_NOT_IN_RANGE) {
            creep.moveTo(target, {reusePath: 10});
        }
        return 0;
    }
    if (target instanceof StructureContainer || target instanceof StructureLink) {
        if (creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(target, {reusePath: 10});
        }
        return 0;
    }
    return -1;
}