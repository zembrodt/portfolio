export function shuffle<Type>(array: Type[]): Type[] {
  let i: number = array.length;
  const shuffledArray = [...array];

  while (i !== 0) {
    const rand = Math.floor(Math.random() * i);
    i--;

    const swap = shuffledArray[i];
    shuffledArray[i] = shuffledArray[rand];
    shuffledArray[rand] = swap;
  }
  return shuffledArray;
}
