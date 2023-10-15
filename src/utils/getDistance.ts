export function getDistance(pos1: RoomPosition, pos2: RoomPosition){
    return Math.sqrt((pos2.x - pos1.x )^2 + (pos2.y - pos1.y)^2)
}