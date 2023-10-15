export function lookAt(pos: RoomPosition, structureType: StructureConstant) {
    let room = Game.rooms[pos.roomName];
    let objects = room.lookAt(pos.x, pos.y);
    // check if any of the objects is of structureType
    let isObstacle = _.any(objects, function (object) {
        return object.type in OBSTACLE_OBJECT_TYPES;
    });
    let isStructure = _.any(objects, function (object) {
        if (object.type == "structure" || object.type == "constructionSite") {
            return object.structure?.structureType == structureType;
        }
        return false;
    });
    return isStructure || isObstacle;
    
}