export function getBodyHarvester (energy: number) {
    energy = Math.min(energy, 1000) - 200;
    let body: BodyPartConstant[] = [
        WORK, CARRY, MOVE
    ];
    while (energy >= 150) {
        energy -= 150;
        body.push(WORK);
        body.push(MOVE);
    }
    return body;
}