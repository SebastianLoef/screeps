export function mainRoads(spawnPos: RoomPosition){
    for (let x = -1; x < 4; x++){
        let pos = new RoomPosition(spawnPos.x + x, spawnPos.y - 1, spawnPos.roomName)
        pos.createConstructionSite(STRUCTURE_ROAD)
        pos = new RoomPosition(spawnPos.x + x, spawnPos.y + 3, spawnPos.roomName)
    }
    for (let y = -1; y < 4; y++){
        let pos = new RoomPosition(spawnPos.x - 1, spawnPos.y + y, spawnPos.roomName)
        pos.createConstructionSite(STRUCTURE_ROAD)
        pos = new RoomPosition(spawnPos.x + 3, spawnPos.y + y, spawnPos.roomName)
    }
}