import { Worker } from "creeps/workers"

export interface Colony {
    main_room: string
    spawns: string[]
    workers?: Worker
    local_sources?: any[]
    external_sources?: any[]
    controller: string
}

export function run(c: Colony) {
    let clvl = Game.getObjectById(c.controller).clvl

}
export default {}
