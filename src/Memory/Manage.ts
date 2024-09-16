function manageCreeps() {
  // Check if the creeps memory exists
  if (!Memory.creeps) {
    console.log("No creeps found. Creating new memory object");
    Memory.creeps = {};
  }

  // verify every existing creep still exists
  for (const creepName in Memory.creeps) {
    // Get the creep object
    const creep = Memory.creeps[creepName];

    // check if the creep exists
    if (!Game.creeps[creepName]) {
      console.log("Creep not found: ", creepName, ". Deleting creep");
      delete Memory.creeps[creepName];
    }

    // check if the creep object is in the correct format, otherwise delete
    if (!creep.colonyName || !creep.role) {
      console.log(
        "Creep not in the correct format: ",
        creepName,
        ". Deleting creep"
      );
      delete Memory.creeps[creepName];
    }
  }

  // Iterate through all creeps
  for (const creepName in Game.creeps) {
    // Get the creep object
    const creep = Game.creeps[creepName];

    // check if the creep exists in memory
    if (!Memory.creeps[creepName]) {
      console.log(
        "No memory found for creep: ",
        creepName,
        ". Creating new memory object"
      );
      creep.suicide();
    }
  }
}

function manageColonyMemory() {
  // Check if the colonies memory exists
  if (!Memory.colonies) {
    console.log("No colonies found. Creating new memory object");
    Memory.colonies = {};
  }

  // verify every existing colony still exists
  for (const colonyName in Memory.colonies) {
    // Get the colony object
    const colony = Memory.colonies[colonyName];

    // check if the room exists and it has a controller
    if (!Game.rooms[colonyName] || !Game.rooms[colonyName].controller) {
      console.log(
        "Room not found for colony: ",
        colonyName,
        ". Deleting colony"
      );
      delete Memory.colonies[colonyName];
      return;
    }

    // check if the colony objects is in the correct format, otherwise delete
    if (!colony.spawnIds || !colony.controller) {
      console.log(
        "Colony not in the correct format: ",
        colonyName,
        ". Deleting colony"
      );
      delete Memory.colonies[colonyName];
      return;
    }

    // Check if the controller exists
    if (!Game.getObjectById(colony.controller)) {
      console.log(
        "Controller not found for colony: ",
        colonyName,
        ". Deleting colony"
      );
      delete Memory.colonies[colonyName];
      return;
    }

    // Check if the spawns exist
    for (const spawnId of colony.spawnIds) {
      if (!Game.getObjectById(spawnId)) {
        console.log(
          "Spawn not found for colony: ",
          colonyName,
          ". Deleting spawn"
        );
        colony.spawnIds = colony.spawnIds.filter((id) => id !== spawnId);
      }
    }
  }
  // Iterate through all spawns
  for (const spawnName in Game.spawns) {
    // Get the spawn object
    const spawn = Game.spawns[spawnName];

    if (!spawn.room.controller) {
      console.log(
        "No controller found for room: ",
        spawn.room.name,
        ". Killing spawn"
      );
      spawn.destroy();
      return;
    }

    // check if there is any colony with the in its room
    if (!Memory.colonies[spawn.room.name]) {
      console.log(
        "No colony found for room: ",
        spawn.room.name,
        ". Creating new colony"
      );

      Memory.colonies[spawn.room.name] = {
        spawnIds: [spawn.id],
        controller: spawn.room.controller.id,
      };
    } else {
      // Check if the spawn is already in the colony
      if (!Memory.colonies[spawn.room.name].spawnIds.includes(spawn.id)) {
        console.log("Adding spawn to colony: ", spawn.room.name);
        Memory.colonies[spawn.room.name].spawnIds.push(spawn.id);
      }
    }
  }
}

export function mantaineMemory() {
  if (Game.time % 100 != 0) {
    return;
  }
  console.log("Cleaning Memory");
  manageColonyMemory();
  manageCreeps();
}
