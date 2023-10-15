export function getCreepCost(body: BodyPartConstant[]) {
  let cost = 0;
  for (let part of body) {
    cost += BODYPART_COST[part];
  }
  return cost;
}