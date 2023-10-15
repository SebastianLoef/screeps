import { lookAt } from "./lookAt";

export function constructMain(spawnId: Id<StructureSpawn>, colonyName: string) {
    let spawn: StructureSpawn | null = Game.getObjectById(spawnId);
    if (!spawn) {
        console.log("Spawn: ", spawnId, " not found");
        return -1;
    }
    let pos = spawn.pos;
    pos = new RoomPosition(pos.x + 2, pos.y, pos.roomName);
    if (!lookAt(pos, STRUCTURE_SPAWN)) {
        spawn.room.createConstructionSite(pos, STRUCTURE_SPAWN);
    }
    pos = new RoomPosition(pos.x, pos.y + 2, pos.roomName);
    if (!lookAt(pos, STRUCTURE_SPAWN)) {
        spawn.room.createConstructionSite(pos, STRUCTURE_SPAWN);
    }
    pos = new RoomPosition(pos.x + 2, pos.y + 2, pos.roomName);
    if (!lookAt(pos, STRUCTURE_STORAGE)) {
        spawn.room.createConstructionSite(pos, STRUCTURE_STORAGE);
    }
    pos = new RoomPosition(pos.x + 1, pos.y + 2, pos.roomName);
    if (!lookAt(pos, STRUCTURE_LINK)) {
        spawn.room.createConstructionSite(pos, STRUCTURE_LINK);
    }
    return 0;

}