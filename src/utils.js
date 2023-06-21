export function ArrToMap(arr) {
  return arr.reduce((acc, item) => {
    acc[item.id] = item;
    return acc;
  }, {});
}

export async function sleep(delay = 800) {
  return new Promise((resolve) => {
    return setTimeout(resolve, delay);
  });
}
