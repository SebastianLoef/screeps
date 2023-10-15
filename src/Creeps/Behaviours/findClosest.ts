import { close } from "fs";
import { getDistance } from "utils/getDistance";

export function findClosest(pos: RoomPosition, targets: Structure[] | Resource[]){
    let minDist: number = Number.MAX_VALUE;
    let closest: Structure | Resource = targets[0];
    for (let target of targets){
        let dist = getDistance(target.pos, pos)
        if (dist < minDist) {
            minDist = dist;
            closest = target;
        }
    }
    return closest;
}