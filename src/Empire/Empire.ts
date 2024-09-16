import { Colony } from "Colony/Colony";
import { mantaineMemory } from "../Memory/Manage";

function syncColonies(colonies: { [name: string]: Colony }) {
  for (const colonyName in Memory.colonies) {
    const colony = Memory.colonies[colonyName];
    if (!colonies[colonyName]) {
      colonies[colonyName] = new Colony(
        colonyName,
        colony.spawnIds,
        colony.controller
      );
    }
  }
}
export class Empire {
  colonies: { [name: string]: Colony };
  constructor() {
    console.log("Initizalize: Empire class");
    this.colonies = {};
    syncColonies(this.colonies);
  }

  run() {
    mantaineMemory();
    if (Game.time % 10 === 0) {
      syncColonies(this.colonies);
    }

    for (const colonyName in this.colonies) {
      this.colonies[colonyName].run();
    }
  }
}
