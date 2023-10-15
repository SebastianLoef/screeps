
export function spawnCreep(spawnId: Id<StructureSpawn>, colonyName: string) {
    let spawn = Game.getObjectById(spawnId);
    if (!spawn) {
        console.log("Spawn: ", spawnId, " not found")
        return -1;
    }
    let creep = Memory.colonies[colonyName].creepQueue[0];
    if (creep.cost > spawn.room.energyCapacityAvailable) {
        Memory.colonies[colonyName].creepQueue.shift();
    }
    if (creep.cost > spawn.room.energyAvailable) {
        return ERR_NOT_ENOUGH_ENERGY;
    }
    if (spawn.spawning) {
        return ERR_BUSY;
     }
    console.log("Spawning creep: " + colonyName);
    if (spawn.spawnCreep(creep.body, creep.name, {memory: creep.memory}) == 0) {
        Memory.colonies[colonyName].creepQueue.shift();
    }
    return -1;
  }