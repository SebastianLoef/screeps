export {};

declare global {
  interface QueueItem {
    name: string;
    body: BodyPartConstant[];
    cost: number;
    memory: CreepMemory;
  }

  interface CreepMemory {
    role: "harvester" | "upgrader" | "builder" | "basic";
    colonyName: string;
  }
}
