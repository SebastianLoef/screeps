export function findRichest(targets: Structure[] | Resource[]){
    let maxEnergy = 0;
    let richest = targets[0];
    for (let target of targets){
        let energy: number = -1;
        if (target instanceof Resource){
            energy = target.amount;
        } else if (target instanceof StructureContainer || target instanceof StructureStorage){
            energy = target.store.energy;
        }
        if (energy > maxEnergy) {
            maxEnergy = energy;
            richest = target;
        }
    }
    return richest;
}