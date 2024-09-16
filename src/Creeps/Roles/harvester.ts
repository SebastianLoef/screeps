import { SourceMemory } from "Room/source";

function findSource(creep: Creep){
    let colonyName: string = creep.memory.colonyName;
    let sources: SourceMemory[] = Memory.colonies[colonyName].sources;
    for (let [i, source] of sources.entries()){
        if (source.harvester && Game.creeps[source.harvester]){
            continue;
        }
        let spawn_id: Id<StructureSpawn> = Memory.colonies[colonyName].spawns[0];
        let spawn: StructureSpawn | null = Game.getObjectById(spawn_id);
        if (!spawn){
            continue;
        }
        if (!spawn.pos || !source.pos){
            console.log("Spawn or source has no pos. Skipping.")
            continue;
        }
        let pos: RoomPosition | undefined = PathFinder.search(source.pos, spawn.pos, {swampCost: 1}).path[0];
        if (!pos){
            console.log("No path found from spawn to source. Skipping.")
            continue;
        }
        Memory.colonies[colonyName].sources[i].harvester = creep.name;
        Memory.colonies[colonyName].sources[i].harvesterPos = pos;
        creep.memory.job.source = source.id;
        creep.memory.job.pos = pos;
        return;
    }
    return;
}

export function runHarvester(creep: Creep){
    if (!creep.memory.job.source || !creep.memory.job.pos){
        console.log("Creep: ", creep.name, " has no source assigned. Assigning new.")
        findSource(creep);
    }
    if (creep.memory.job.source){
        let source = Game.getObjectById(creep.memory.job.source);
        let temp = creep.memory.job.pos;
        let pos: RoomPosition = new RoomPosition(temp.x, temp.y, temp.roomName);
        if (!creep.pos.isEqualTo(pos)){
            creep.moveTo(pos);
            return;
        }
        if (source instanceof Source){

            creep.harvest(source);
            return;
        }
    }
}