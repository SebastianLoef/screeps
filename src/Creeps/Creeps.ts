export function getCreep(creep: CreepMemory["role"]) {
  switch (creep) {
    case "basic":
      return BasicCreep;
    default:
      return BasicCreep;
  }
}

export abstract class CreepBaseClass {
  target: Id<Structure | Source> | undefined = undefined;
  action: string | undefined = undefined;
  id: Id<Creep>;
  abstract setTask(): void;
  abstract doTask(): void;

  constructor(id: Id<Creep>) {
    this.id = id;
    this.setTask();
  }

  run() {
    this.setTask();
    this.doTask();
  }
}

export class BasicCreep extends CreepBaseClass {
  setTask(): void {
    let creep = Game.getObjectById(this.id);
    if (!creep) {
      console.log("Creep not found with id: ", this.id);
      return;
    }
    if (
      creep.store.getUsedCapacity() === 0 ||
      creep.store.getFreeCapacity() === 0
    ) {
      this.action = undefined;
      this.target = undefined;
    }
    if (this.target) return;

    if (creep.store.getFreeCapacity() > 0) {
      this.action = "harvest";
      this.target = creep.room.find(FIND_SOURCES).reduce((prev, curr) => {
        return prev.energy > curr.energy ? prev : curr;
      }).id;
      return;
    }
    if (creep.store.getUsedCapacity() > 0) {
      if (creep.room.controller?.level && creep.room.controller.level < 3) {
        this.action = "upgrade_controller";
        this.target = creep.room.controller.id;
        return;
      }
      this.action = "store";
      this.target = creep.room.find(FIND_MY_SPAWNS)[0].id;
      return;
    }
  }

  doTask(): void {
    if (!this.target || !this.action) return;
    let creep = Game.getObjectById(this.id);
    if (!creep) {
      console.log("Creep not found with id: ", this.id);
      return;
    }

    if (this.action === "harvest") {
      let target = Game.getObjectById(this.target) as Source;
      if (!target) {
        console.log("Target not found with id: ", this.target);
        return;
      }
      if (creep.harvest(target) === ERR_NOT_IN_RANGE) {
        creep.moveTo(target);
      }
      return;
    }
    if (this.action === "upgrade_controller") {
      let target = Game.getObjectById(this.target) as StructureController;
      if (!target) {
        console.log("Target not found with id: ", this.target);
        return;
      }
      if (creep.upgradeController(target) === ERR_NOT_IN_RANGE) {
        creep.moveTo(target);
      }
      return;
    }
    if (this.action === "store") {
      let target = Game.getObjectById(this.target) as StructureSpawn;
      if (!target) {
        console.log("Target not found with id: ", this.target);
        return;
      }
      if (creep.transfer(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
        creep.moveTo(target);
      }
      return;
    }
  }
}
