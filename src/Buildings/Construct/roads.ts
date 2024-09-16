export function constructEarlyGameRoads(spawnId: Id<StructureSpawn>) {
  const spawn = Game.getObjectById(spawnId);
  if (!spawn) {
    console.log("Spawn not found with id: ", spawnId);
    return;
  }

  // find nearest target
  let targets;

  const controllerPos = spawn.room.controller?.pos;
  if (controllerPos) {
    targets = [spawn.pos.findPathTo(controllerPos.x, controllerPos.y)];
  }
  const sources = spawn.room.find(FIND_SOURCES);
  const sourcePaths = sources.map((source) => {
    return spawn.pos.findPathTo(source.pos.x, source.pos.y);
  });

  targets = targets?.concat(sourcePaths);

  // sort by distance
  targets = targets?.sort((a, b) => {
    return a.length - b.length;
  });

  // build roads to nearest target
  if (targets) {
    for (let target of targets) {
      for (let i = 0; i < target.length; i++) {
        const pos = new RoomPosition(target[i].x, target[i].y, spawn.room.name);
        spawn.room.createConstructionSite(pos, STRUCTURE_ROAD);
      }
    }
  }
}
