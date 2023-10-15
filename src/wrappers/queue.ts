import { priorityQueue } from "sys/priorityQueue"

export function queue(
  func: Function,
  priority: number,
  occurance: number = 1
) {
    if (Game.time % occurance == 0) {
      priorityQueue.add({priority: priority, func: func});
    }
 
}
// add function to global namespace
global.queue = queue;