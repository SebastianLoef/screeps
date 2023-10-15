//import { queue } from "wrappers/queue"
import { SourceMemory } from "Room/source";
import { runCreep } from "Creeps/creep";
import { ColonyMemory, initCMemory, assertCMemory } from "./memory";
import { managePopulation } from "./Creeps/manage";
import { spawn } from "child_process";
import { spawnCreep } from "./Creeps/spawn";

export class Colony {
  name: string;
  memory: ColonyMemory;

  constructor(spawn: StructureSpawn) {
    this.name = spawn.name.slice(0, 2);
    if (!Memory.colonies) {
      Memory.colonies = {};
    }
    if (this.name in Memory.colonies) {
      this.memory = Memory.colonies[this.name];
    } else {
      this.memory = initCMemory(spawn)
      Memory.colonies[this.name] = this.memory;
    }
  }

  run() {
    assertCMemory(this.name, this.memory)
    this.runCreeps();
    managePopulation(this.memory, this.name);
    spawnCreep(this.memory.spawns[0], this.name);
  }

  private runCreeps() {
    for (let creep of Object.keys(Memory.colonies[this.name].creeps)) {
      runCreep(creep);
    }
  }
  

  private getAvailableEnery() {
    return this.memory.room.energyAvailable;
  }
}
