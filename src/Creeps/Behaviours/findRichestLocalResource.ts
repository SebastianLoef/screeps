import { findRichest } from "./findRichest";

export function findRichestLocalResource(creep: Creep, minAmount: number = 0){
    let room: Room = creep.room;
    let targets: Resource[] | AnyStructure[];
    targets = room.find(FIND_DROPPED_RESOURCES);
    if (targets.length > 0){
        let richest = findRichest(targets);
        if (richest instanceof Resource && richest.amount >= minAmount){
            return richest.id;
        }
    }
    targets = room.find(FIND_STRUCTURES).filter((structure) => {
    return structure.structureType == (STRUCTURE_CONTAINER || STRUCTURE_LINK)
        && structure.store[RESOURCE_ENERGY] > 0;
    });
    if (targets.length > 0){
        let richest = findRichest(targets);
        if (richest instanceof StructureContainer && richest.store[RESOURCE_ENERGY] >= minAmount){
            return richest.id;
        }
    }
    return;
};