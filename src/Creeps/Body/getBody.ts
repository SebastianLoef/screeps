import { getBodyBuilder } from "./builder";
import { getBodyHarvester } from "./harvester";
import { getBodyMulti } from "./multi";
import { getBodyTruck } from "./truck";


export function getBody(role: string, energy: number) {
  switch (role) {
    case "multi":
      return getBodyMulti(energy);
    case "harvester":
      return getBodyHarvester(energy);
    case "truck":
      return getBodyTruck(energy);
    case "builder":
      return getBodyBuilder(energy);
    default:
      return;
  }
}