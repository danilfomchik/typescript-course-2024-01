// Create and use a type guard
function exercise29() {
  type TWidget = {
    name: string;
  };
  type TGadget = {
    os: string;
  };
  type TThing = TWidget | TGadget;

  // TODO: implement isWidget function to be a type guard
  function isWidget(arg: TThing): arg is TWidget {
    return (arg as TWidget).name !== undefined;
  }
  console.log(isWidget({ name: 'widget' }));

  function printThingDescription(arg: TThing): void {
    console.log(arg);
    // TODO: uncomment the following code
    if (isWidget(arg)) {
      console.log(arg.name);
    } else {
      console.log(arg.os);
    }
  }
  printThingDescription({ name: 'widget' });
  printThingDescription({ os: 'android' });
}
// exercise29();

// Create an overloaded function definitions
function exercise30() {
  type TWidget = {
    name: string;
    cost?: number;
  };
  type TGadget = {
    os: string;
    cost?: number;
  };
  type TThing = TWidget | TGadget;

  // TODO: add function overloading here to ensure that function return type matches the input value type
  function assignWidgetCost(obj: TWidget): TWidget;
  function assignWidgetCost(obj: TGadget): TGadget;
  function assignWidgetCost(obj: TThing): TThing {
    obj.cost = 100;

    return obj;
  }

  // TODO: fix problem - typeof a: TThing, not TWidget
  const a = assignWidgetCost({ name: 'widget' } as TWidget);
  // TODO: fix same here - typeof b: TThing, not TGadget
  const b = assignWidgetCost({ os: 'android' } as TGadget);

  console.log(a, b);
}
// exercise30();

// Create call signatures
function exercise31() {
  // TODO: implement handleSaveUserSubmit function with function overrides
  function handleSaveUserSubmit(firstName: string, lastName: string): void;
  function handleSaveUserSubmit(
    firstName: string,
    lastName: string,
    email: string,
  ): void;

  function handleSaveUserSubmit(
    firstName: string,
    lastName: string,
    email?: string,
  ) {
    if (!email) {
      console.log(firstName, lastName);
    } else {
      console.log(firstName, lastName, email);
    }
  }
  handleSaveUserSubmit('John', 'Smith');

  // TODO: add call signatures here. Add overrides for optional email param
  type TSaveUserCallback = {
    (firstName: string, lastName: string): void;
    (firstName: string, lastName: string, email?: string): void;
  };
  // TODO: implement handleSaveUserSubmit function with this type
  const handleSaveUserSubmitv2: TSaveUserCallback = (
    firstName: string,
    lastName: string,
    email?: string,
  ) => {
    if (!email) {
      console.log(firstName, lastName);
    } else {
      console.log(firstName, lastName, email);
    }
  };
  handleSaveUserSubmitv2('Peter', 'Parker');

  // TODO: add call signatures here. Add overrides for optional email param
  interface ISaveUserCallback {
    (firstName: string, lastName: string): void;
    (firstName: string, lastName: string, email?: string): void;
  }
  // TODO: implement handleSaveUserSubmit function with this type and interface
  const handleSaveUserSubmitv3: ISaveUserCallback = (
    firstName: string,
    lastName: string,
    email?: string,
  ) => {
    if (!email) {
      console.log(firstName, lastName);
    } else {
      console.log(firstName, lastName, email);
    }
  };
  handleSaveUserSubmitv2('Harry', 'Potter');

  function createForm(onSubmit: TSaveUserCallback) {
    const firstName = 'John';
    const lastName = 'Smith';

    // ++TODO: delete the following line
    // console.log(firstName, lastName, onSubmit);

    // TODO: uncomment the following line
    onSubmit(firstName, lastName);
  }
  // TODO: remove type assertion, fix the error
  createForm(handleSaveUserSubmit);

  function createForm2(onSubmit: ISaveUserCallback) {
    const firstName = 'John';
    const lastName = 'Smith';
    const email = 'jsmith@somemail.some.com';

    // ++TODO: delete the following line
    // console.log(firstName, lastName, email, onSubmit);

    // TOOD: uncomment the following line
    onSubmit(firstName, lastName, email);
  }
  // TODO: remove type assertion, fix the error
  createForm2(handleSaveUserSubmit);

  // *** add constructor signatures here ***
  type TUserConstructor = {
    new (name: string): void;
  };

  function createAndPrintUser(ctor: TUserConstructor) {
    // TOOD: uncomment the following lines
    const user = new ctor('John Smith');
    console.log(user);
    // TODO: delete the following line
    // console.log(ctor);
  }
  // TODO: create instance of TUserConstructor type
  const Ctor: TUserConstructor = class User {
    constructor(public name: string) {}
  };
  // TODO: update the following line, call createAndPrintUser, pass the constructor
  createAndPrintUser(Ctor);
}
exercise31();

// Create an abstract class and concrete classes
function exercise32() {
  // TODO: make this class abstract
  abstract class Animal {
    constructor(public name: string) {
      this.name = name;
    }
    // TODO: add abstract method named makeSound
    // makeSound ...
    abstract makeSound(sound: string): void;

    eat(): void {
      console.log('eating');
    }
  }
  // ++TODO: observe the error and comment out next 2 lines
  // const animal = new Animal('Rex');
  // console.log(animal.name);

  // TODO: inherit from Animal and implement makeSound method
  class Dog extends Animal {
    makeSound(sound: string): void {
      console.log(`${sound}! ${sound}!`);
    }
  }

  // TODO: uncomment the following lines, fix the errors
  const myDog = new Dog('Buddy');
  myDog.eat();
  myDog.makeSound('woof');
}
// exercise32();

// Create a type for a dictionary with string keys and number values
export function exercise33() {
  // TODO: create a type TDictionary, key is a string, value is a number
  type TDictionary = {
    [key: string]: number;
  };

  // TODO: const dictionary variable of TDictionary type, assign some values (1, 2, 3)
  const dictionary: TDictionary = {
    a1: 1,
    b1: 2,
    c1: 3,
  };

  // TODO: uncomment the following lines, fix the errors
  dictionary['c'] = 3;
  // dictionary['d'] = '3'; // should cause an error error
  dictionary['d'] = +'3'; // should cause an error error

  // TODO: implement a function that calculates number of characters
  // in a string using the dictionary type, and returns a most frequent character
  function getMostFrequentCharacter(str: string): string {
    const dictionary: TDictionary = {};

    for (let i = 0; i < str.length; i++) {
      let counter: number = 1;

      if (str[i] in dictionary) {
        dictionary[str[i]] += counter;
      } else {
        dictionary[str[i]] = counter;
      }
    }

    let result: string = '';

    if (str.length > 0) {
      result = Object.entries(dictionary).sort((a, b) => b[1] - a[1])[0][0];
    }

    return result;
  }
  console.log(getMostFrequentCharacter('She sells seashells by the seashore.'));

  return { getMostFrequentCharacter };
}
// exercise33();
// TODO: exporrt getMostFrequentCharacter function, and add a test for it in lesson7-homework.test.ts

// Use index signature and caching
function exercise34() {
  // TODO: Define a dictionary of student grades, add type definition using index signature
  // key is a student name, value is an array of grades (numbers)
  type TStudentsMap = {
    [name: string]: number[];
  };

  const studentGrades = [
    {
      name: 'John',
      grades: [100, 90, 80, 70, 90],
    },
    {
      name: 'Jane',
      grades: [90, 80, 70, 60, 50],
    },
    {
      name: 'Jack',
      grades: [80, 70, 60, 50, 40],
    },
  ];

  // TODO: Define a dictionary of cached results, add type definition using index signature
  const studentsMap: TStudentsMap = {};

  studentGrades.forEach((student) => {
    studentsMap[student.name] = student.grades;
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  type TStudentsCachedMap = {
    [name: string]: number;
  };
  const cachedResults: TStudentsCachedMap = {};

  // TODO: Implement function to calculate the average grade for a student
  function calculateAverageGrade(studentName: string): number | string {
    // TODO: check if chached result exists, return it if it does

    if (cachedResults[studentName]) {
      // TODO: return cached result
      return cachedResults[studentName];
    } else {
      // TODO: calculate average grade
      const averageGrade: number =
        studentsMap[studentName].reduce((acum, item) => acum + item, 0) /
        studentsMap[studentName].length;

      // TODO: set cached result
      cachedResults[studentName] = averageGrade;

      // TODO: return average grade
      return averageGrade;
    }
  }

  studentGrades.forEach((student) => {
    console.log(calculateAverageGrade(student.name));
  });

  // TODO: find the student with the highest average grade
  const highestAverageGrade: [string, number] = Object.entries(
    cachedResults,
  ).sort((a, b) => b[1] - a[1])[0];
  console.log(highestAverageGrade);
}
// exercise34();

const test = 'test';
export default test;