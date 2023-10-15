export {}

declare global {
    interface QueueItem {
        name: string
        body: BodyPartConstant[]
        cost: number
        memory: CreepMemory
    }

    interface CreepMemory {
        role: string
        colonyName: string
        charging?: Id<StructureSpawn> | boolean
        suicide?: boolean
        job: {[key:string]: any}
    }
}