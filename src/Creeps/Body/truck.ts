export function getBodyTruck(energy: number) {
    let body: BodyPartConstant[] = [];
    while (energy >= 100){
        body.push(MOVE)
        body.push(CARRY)
        energy -= 100
    }
    return body;
}