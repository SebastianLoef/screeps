export function getCreepCost(body: BodyPartConstant[] | undefined) {
  if (!body) {
    return 0;
  }
  let cost = 0;
  for (let part of body) {
    cost += BODYPART_COST[part];
  }
  return cost;
}