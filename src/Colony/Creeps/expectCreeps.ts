import { ColonyMemory } from "Colony/memory";

export function expectedCreeps(role: string, lvl: number, colonyMemory: ColonyMemory) {
  switch (role) {
    case "multi":
      return expectedMultis(lvl);
    case "harvester":
      return expectedHarvesters(lvl);
    default:
      return undefined;
  }
}
function expectedHarvesters(lvl: number) {
  return 2;
}
function expectedMultis(lvl: number) {
  switch (lvl) {
    default:
      return 0;
  }
}
