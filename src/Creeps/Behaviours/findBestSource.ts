export function findBestSource (creep: Creep) {
    let targets = creep.room.find(FIND_SOURCES);
    if (targets.length > 0) {
        // return source with most energy
        let maxEnergy = 0;
        let bestSource = targets[0];
        for (let source of targets) {
            if (source.energy > maxEnergy) {
                maxEnergy = source.energy;
                bestSource = source;
            }
        }
        return bestSource.id;
    }
    return;
}