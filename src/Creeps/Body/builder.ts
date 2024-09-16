export function getBodyBuilder(energy: number) {
    energy = Math.min(energy, 1000) - 200;
    let body: BodyPartConstant[] = [
        WORK, WORK
    ];
    while (energy >= 100) {
        energy -= 100;
        body.push(CARRY);
        body.push(MOVE);
    }
    return body;
}