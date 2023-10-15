import { getBody } from "Creeps/getBody";
import { getCreepCost } from "Creeps/getCreepCost";

export function queueCreep(
  role: string,
  energyAvailable: number,
  colonyName: string
) {
  let name_: string = role + Game.time.toString();
  let body_: BodyPartConstant[] = getBody(role, energyAvailable);
  let cost_: number = getCreepCost(body_)

  let creepMem: CreepMemory = {
    role: role,
    colonyName: colonyName,
    job: {}
  };
  let item: QueueItem = {
    name: name_,
    body: body_,
    cost: cost_,
    memory: creepMem
  }
  if (!Memory.colonies[colonyName].creepQueue) {
    Memory.colonies[colonyName].creepQueue = [];
  }
  if (Memory.colonies[colonyName].creepQueue.length < 10) {
    Memory.colonies[colonyName].creepQueue.push(item)
  } else {
    Memory.colonies[colonyName].creepQueue = Memory.colonies[colonyName].creepQueue.slice(0, 10);
  }
}
