import { SourceMemory } from "Room/source";

function findSource(creep: Creep){
    let colonyName: string = creep.memory.colonyName;
    let sources: SourceMemory[] = Memory.colonies[colonyName].sources;
    for (let [i, source] of sources.entries()){
        if (!source.harvester || !Game.creeps[source.harvester]){
            let spawn_id: Id<StructureSpawn> = Memory.colonies[colonyName].spawns[0];
            let spawn: StructureSpawn | null = Game.getObjectById(spawn_id);
            if (!spawn){
                continue;
            }
            let pos: RoomPosition = PathFinder.search(spawn.pos, source.pos).path[-1];
            Memory.colonies[colonyName].sources[i].harvester = creep.name;
            Memory.colonies[colonyName].sources[i].harvesterPos = pos;
            creep.memory.job.source = source.id;
            creep.memory.job.pos = pos;
            return;
        }
    }
    return;
}

export function runHarvester(creep: Creep){
    if (!creep.memory.job.source){
        findSource(creep);
    }
    if (creep.memory.job.source){
        let source = Game.getObjectById(creep.memory.job.source);
        if (creep.pos != creep.memory.job.pos) {
            creep.moveTo(creep.memory.job.pos)
            return;
        }
        if (source instanceof Source) {
            creep.harvest(source);
            return;
        }
        console.log("Source of id: ", creep.memory.job.source, " is not of type Source.")
        return;
    }
}