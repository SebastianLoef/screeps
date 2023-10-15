import { findClosest } from "./findClosest";

export function findClosestLocalResource(creep: Creep, filter?: any){
    let room: Room = creep.room;
    let targets: Resource[] | AnyStructure[];
    targets = room.find(FIND_DROPPED_RESOURCES);
    if (targets.length > 0){
        return findClosest(creep.pos, targets).id;
    }
    targets = room.find(FIND_STRUCTURES).filter((structure) => {
    return structure.structureType == (STRUCTURE_CONTAINER || STRUCTURE_LINK)
        && structure.store[RESOURCE_ENERGY] > 0;
    });
    if (targets.length > 0){
        return findClosest(creep.pos, targets).id;
    }
    return;
};