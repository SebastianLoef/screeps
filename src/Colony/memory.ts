export {};

declare global {
  interface ColonyMemory {
    spawnIds: Id<StructureSpawn>[];
    controller: string;
  }
}
