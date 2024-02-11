import {shuffle} from './utils';

describe('util package', () => {
  describe('shuffle', () => {
    it('should return an empty array if one is passed', () => {
      expect(shuffle<number>([]).length).toEqual(0);
    });

    it('should return an array of the same size', () => {
      expect(shuffle<number>([1]).length).toEqual(1);
      expect(shuffle<number>([1, 2]).length).toEqual(2);
      expect(shuffle<number>([1, 2, 3]).length).toEqual(3);
    });

    it('should shuffle an array', () => {
      // Create an array 100 numbers to decrease likelihood the shuffled array equals the pre-shuffled array
      const nums = Array(100).fill(0).map((_, i) => i);
      const shuffledNums = shuffle<number>(nums);
      let isShuffled = false;
      for (let i = 0; i < 100; i++) {
        if (nums[i] !== shuffledNums[i]) {
          // We found at least 1 occurrence that the numbers have been shuffled
          isShuffled = true;
          break;
        }
      }
      expect(isShuffled).toBeTrue();
    });

    it('should return the same items in the array', () => {
      const values = ['test', 'ryan', 'test', 'portfolio'];
      const valuesCount = getWordCount(values);

      const shuffledValues = shuffle<string>(values);
      const shuffledValuesCount = getWordCount(shuffledValues);

      expect(values.length).toEqual(shuffledValues.length);
      for (let i = 0; i < values.length; i++) {
        expect(valuesCount.get(values[i])).toEqual(shuffledValuesCount.get(shuffledValues[i]));
      }
    });
  });
});

function getWordCount(array: string[]): Map<string, number> {
  const wordCount = new Map<string, number>();
  array.forEach((value) => {
    if (wordCount.has(value)) {
      wordCount.set(value, wordCount.get(value) + 1);
    }
    wordCount.set(value, 1);
  });
  return wordCount;
}
