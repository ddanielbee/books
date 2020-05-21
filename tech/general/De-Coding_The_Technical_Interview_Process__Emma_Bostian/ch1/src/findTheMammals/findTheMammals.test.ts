/* 
Description: 

Given an array containing animals, return an array containing only those which are mammals. 

Data structure: 

animals = [
  {
    type: "Dog",
    mammal: true
  },
  {
    type: "Snake",
    mammal: false
  },
  {
    type: "Cheetah",
    mammal: true
  }
]
*/

interface Animal {
  type: string;
  mammal: boolean;
}

type AnimalsList = ReadonlyArray<Animal>;

const findTheMammals = (animals: AnimalsList): AnimalsList =>
  animals.filter((animal) => animal.mammal);

const findTheMammalsWithoutFilter = (animals: AnimalsList): AnimalsList => {
  const mammals = [];
  for (let i = 0; i < animals.length; i++) {
    if (animals[i].mammal) {
      mammals.push(animals[i]);
    }
  }
  return mammals;
};

describe('findTheMammals', () => {
  it('should return an empty array when the input is empty', () => {
    const emptyAnimals: AnimalsList = [];

    expect(findTheMammals(emptyAnimals)).toEqual([]);
    expect(findTheMammalsWithoutFilter(emptyAnimals)).toEqual([]);
  });

  it('should return an empty array when there are no mammals', () => {
    const noMammals: AnimalsList = [{ type: 'Snake', mammal: false }];

    expect(findTheMammals(noMammals)).toEqual([]);
    expect(findTheMammalsWithoutFilter(noMammals)).toEqual([]);
  });

  it('should return the same array when there are only mammals', () => {
    const onlyMammals: AnimalsList = [{ type: 'Dog', mammal: true }];

    expect(findTheMammals(onlyMammals)).toEqual(onlyMammals);
    expect(findTheMammalsWithoutFilter(onlyMammals)).toEqual(onlyMammals);
  });

  it('should filter out non-mammals', () => {
    const mixedAnimals: AnimalsList = [
      { type: 'Dog', mammal: true },
      { type: 'Snake', mammal: false },
      { type: 'Cheetah', mammal: true },
    ];

    const onlyMammals: AnimalsList = [
      { type: 'Dog', mammal: true },
      { type: 'Cheetah', mammal: true },
    ];

    expect(findTheMammals(mixedAnimals)).toEqual(onlyMammals);
    expect(findTheMammalsWithoutFilter(mixedAnimals)).toEqual(onlyMammals);
  });
});
