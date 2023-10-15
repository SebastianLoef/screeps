export class SourceMemory {
    id: string;
    pos: RoomPosition;
    harvester?: string;
    harvesterPos?: RoomPosition;
    container?: string;
    link?: string;

    constructor(id: string, pos: RoomPosition, harvester?: string, container?: string, link?: string) {
        this.id = id;
        this.pos = pos;
        this.harvester = harvester;
        this.container = container;
        this.link = link;
        this.harvesterPos = this.getHarvesterPos();
    }
    private getHarvesterPos() {
        let room = Game.rooms[this.pos.roomName];
        for (let i = -1; i < 2; i++) {
            for (let j = -1; j < 2; j++) {
                let objects = room.lookAt(this.pos.x + i, this.pos.y + j);
                // check if any of the objects is in OBSTACLE_OBJECT_TYPES
                let isObstacle = _.any(objects, function (object) {
                    return object.type in OBSTACLE_OBJECT_TYPES;
                });
                if (!isObstacle) {
                    return new RoomPosition(this.pos.x + i, this.pos.y + j, this.pos.roomName);
                }
                
            }
        }
        return undefined;
    }
}
