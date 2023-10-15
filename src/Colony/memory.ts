import { SourceMemory } from "Room/source";

export interface ColonyMemory {
  spawns: Id<StructureSpawn>[];
  creeps: { [creep_id: string]: string };
  sources: SourceMemory[];
  room: Room;
  controllerId: Id<StructureController> | undefined;
  mineralIds: string[];
  creepQueue: QueueItem[];
}

function initCCreeps() {
  let creeps: { [creep_id: string]: string } = {};
  for (let creep_id of Object.keys(Game.creeps)) {
    let creep: Creep = Game.creeps[creep_id];
    let creepMem: CreepMemory = Memory.creeps[creep_id];
    if (!creepMem) {
      // creep should find a closest colony in this case, suicide for now.
      creep.suicide();
      continue;
    }
    let role: string = creepMem.role;
    let colonyName: string = creepMem.colonyName;
    if (!colonyName || !role) {
      // creep should find a closest colony in this case, suicide for now.
      creep.suicide();
      continue;
    }
    creeps[creep_id] = role;
  }
  return creeps;
}
export function initCMemory(spawn: StructureSpawn) {
  let spawnIds_: Id<StructureSpawn>[] = [spawn.id];
  let creeps_: { [creep_id: string]: string } = initCCreeps();
  let sources_: SourceMemory[] = [];
  spawn.room.find(FIND_SOURCES).forEach((source) => {
    sources_.push(new SourceMemory(source.id, source.pos));
  });
  let room_: Room = spawn.room;
  let controller: StructureController | undefined = spawn.room.controller;
  let controllerId_: Id<StructureController> | undefined = undefined;
  if (controller) {
    controllerId_ = controller.id;
  }
  let minerals = spawn.room.find(FIND_MINERALS);
  let mineralIds_: string[] = [];
  if (minerals) {
    minerals.forEach((mineral) => {
      mineralIds_.push(mineral.id);
    });
  }
  let mem = {
    spawns: spawnIds_,
    creeps: creeps_,
    sources: sources_,
    room: room_,
    controllerId: controllerId_,
    mineralIds: mineralIds_,
    creepQueue: [],
  };
  return mem;
}
export function assertCMemory(colonyName: string, colonyMemory: ColonyMemory) {
  // Memory items in colony
  if (!Memory.colonies) {
    Memory.colonies = {};
  }
  if (!(colonyName in Memory.colonies)) {
    Memory.colonies[colonyName] = colonyMemory;
  }
  for (let creep of Object.keys(Memory.colonies[colonyName].creeps)) {
    if (!(Game.creeps[creep])) {
      delete colonyMemory.creeps[creep];
      delete Memory.colonies[colonyName].creeps[creep];
      delete Memory.creeps[creep];
    }
  }
}
