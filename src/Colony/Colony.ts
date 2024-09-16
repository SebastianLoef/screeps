import { constructEarlyGameRoads } from "Buildings/Construct/roads";
import { CreepBaseClass, getCreep } from "Creeps/Creeps";
import { spawnQueue } from "./spawnQueue";

export class Colony {
  // properties
  colonyName: string;
  spawnIds: Id<StructureSpawn>[];
  controller: string;
  spawnQueue: QueueItem[];
  creeps: CreepBaseClass[] = [];

  constructor(
    colonyName: string,
    spawnIds: Id<StructureSpawn>[],
    controller: string
  ) {
    console.log("Initizalize: Colony");
    this.colonyName = colonyName;
    this.spawnIds = spawnIds;
    this.controller = controller;
    this.spawnQueue = [];
    this.syncCreeps(true);
  }

  // run function
  run() {
    // fill spawn queue
    spawnQueue(this.spawnQueue, this.colonyName);
    // process spawn queue
    this.processSpawnQueue();
    this.syncCreeps();
    // run creeps
    for (let creep of this.creeps) {
      creep.run();
    }
  }

  processSpawnQueue() {
    if (this.spawnQueue.length === 0) return;
    if (Game.time % 10 !== 0) return;

    const queueItem = this.spawnQueue[0];
    // get the first spawn

    for (let spawnId of this.spawnIds) {
      const spawn = Game.getObjectById(spawnId);
      if (!spawn) {
        console.log("Spawn not found with id: ", spawnId);
        continue;
      }
      // check if the spawn can spawn the item
      if (
        spawn.spawnCreep(queueItem.body, queueItem.name, {
          memory: queueItem.memory,
        }) === OK
      ) {
        // remove the item from the queue
        this.spawnQueue.shift();
        return;
      }
    }
  }

  syncCreeps(immediate = false) {
    if (!immediate && Game.time % 100 !== 0) return;
    console.log("Syncing creeps");
    let colonyCreeps = Object.values(Game.creeps).filter(
      (creep) => creep.memory.colonyName === this.colonyName
    );
    if (colonyCreeps.length === 0) return;
    if (colonyCreeps.length === this.creeps.length) return;

    for (let creep of colonyCreeps) {
      if (this.creeps.filter((c) => c.id === creep.id).length > 0) continue;
      const creepClass = getCreep(creep.memory.role);
      this.creeps.push(new creepClass(creep.id));
      console.log("Creep added to colony: ", creep.id);
    }
  }

  constructBuildings() {
    if (Game.time % 100 !== 0) return;
    constructEarlyGameRoads(this.spawnIds);
}
