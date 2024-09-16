export function spawnQueue(queue: QueueItem[], colonyName: string) {
  if (queue.length > 5) return;
  console.log(
    "Added basic to spawn queue, new queue length: ",
    queue.length + 1
  );
  queue.push({
    name: "basic_" + Game.time,
    body: [WORK, CARRY, MOVE],
    cost: 200,
    memory: {
      role: "basic",
      colonyName: colonyName,
    },
  });
}
