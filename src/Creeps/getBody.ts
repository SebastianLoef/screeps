import { getBodyHarvester } from "./Body/harvester";
import { getBodyMulti } from "./Body/multi";

export function getBody(role: string, energy: number) {
  switch (role) {
    case "multi":
      return getBodyMulti(energy);
    case "harvester":
      return getBodyHarvester(energy);
    default:
      return getBodyMulti(energy);
  }
}