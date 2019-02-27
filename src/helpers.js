//for future use
export function fuelCosts({ type, consumption }, { kwhPrice, gasPrice }) {
  return type === 'electric' ? (consumption * kwhPrice) / 100 : (consumption * gasPrice) / 100;
}
