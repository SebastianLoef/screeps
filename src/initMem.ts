import { queueItem } from "sys/priorityQueue";

declare global {
    interface Memory {
        priorityQueue: queueItem[];
    }
}
export function initMemory() {

}