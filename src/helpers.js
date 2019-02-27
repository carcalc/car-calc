// sek per km
export function fuelCosts({ type, consumption }, { kwhPrice, gasPrice }) {
  return type === 'electric' ? (consumption * kwhPrice) / 100 : (consumption * gasPrice) / 100;
}

export function totalCost(fuelCost, evBonus, car, { distance, ownership }) {
  const cost = fuelCost * distance * ownership + car.price;
  return car.type === 'electric' ? cost - evBonus : cost;
}
