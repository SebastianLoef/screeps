
export interface Source {
    id: string
    container: string | boolean
}
export interface Room {
    name: string
    hostile?: boolean
    border_zone?: boolean
}

export default {
    source
}
