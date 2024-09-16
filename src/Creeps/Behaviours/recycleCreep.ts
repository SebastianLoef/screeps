export function recycleCreep(creep: Creep) {
    const spawn = creep.pos.findClosestByPath(FIND_MY_SPAWNS);
    if (spawn) {
        if (spawn.recycleCreep(creep) == ERR_NOT_IN_RANGE) {
            creep.moveTo(spawn);
        }
    }
}