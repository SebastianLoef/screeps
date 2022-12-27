export interface Worker {
    kind: string
    lvl?: number
    busy?: boolean
}

export function new_creep(kind: string, lvl: number) -> Worker{
    let worker: Worker = {
        kind = kind,
        lvl = lvl
    }
    return worker
}
