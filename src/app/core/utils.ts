export function shuffle(array: any[]): any[] {
  let i: number = array.length;

  while (i !== 0) {
    const rand = Math.floor(Math.random() * i);
    i--;

    const swap = Object.assign({}, array[i]);
    array[i] = Object.assign({}, array[rand]);
    array[rand] = swap;
  }
  return array;
}
