export function chargeCreep(creep: Creep) {
    if (!creep.memory.charging){
        return;
    }
    if (creep.memory.charging == true){
        let colonyName: string = creep.memory.colonyName;
        let spawn: Id<StructureSpawn> = Memory.colonies[colonyName].spawns[0];
        creep.memory.charging = spawn
    }
    let spawn: StructureSpawn | null = Game.getObjectById(creep.memory.charging)
    if (!spawn){
        console.log("Creep can't find spawn with id: ", creep.memory.charging);
        return;
    }
    if (spawn.renewCreep(creep) == ERR_NOT_IN_RANGE){
        creep.moveTo(spawn.pos);
    }
}