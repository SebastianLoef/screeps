import { Room } from "misc/environment"

function is_room_friendly(room_name: string, friendly: boolean){
    return 0
}


export function get_adjacent_rooms(room: string, distance: number) {
    let adjacent_rooms: any[] = []
    const exits: {[index: string]: any} = Game.map.describeExits(room)
    for (let a_room_idx in exits){
        let a_room = exits[a_room_idx]
        let room_obj: Room = {
            name: room
        }
        adjacent_rooms.push(room_obj)
        if (distance > 0){
            adjacent_rooms = adjacent_rooms.concat(
                get_adjacent_rooms(a_room, distance - 1)
            )
        }
    }
    // returns rooms without duplicates
    adjacent_rooms = [...new Set(adjacent_rooms)]
    return adjacent_rooms
}
