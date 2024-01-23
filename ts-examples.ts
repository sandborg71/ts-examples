// Example

document.addEventListener('click', function (event) {
  console.log(event.button); //
});

document.addEventListener('scroll', function (event) {
  console.log(event.button); // error
});

// Basics

let variableName1: string;
let variableName2: number = 2;
const constantName: number = 3;

let variableName3 = 4;
variableName3 = "hej";

let items = [1, 2, 3, null];

let items2 = [0, 1, null, 'Hi'];

let arr = [new Date(), new RegExp('d+')];

let items3: typeof items2;
type t2 = typeof items2;
let items4: t2;

let employee = {
  firstName: 'John',
  lastName: 'Doe',
  age: 25,
  jobTitle: 'Web Developer'
};

employee = 3;

interface Person {
  firstName: string;
  middleName?: string;
  lastName: string;
}

function getFullName(person: Person) {
  return `${person.firstName} ${person.lastName}`;
}

let john = {
  firstName: 'John',
  lastName: 'Doe'
};

let kalle: Person = {
  firstName: 'Kalle',
  lastName: 'Doe',
  someOtherName: 'Sven'
};

let peter = {
  firstName: 'Peter'
};

console.log(getFullName(john));
console.log(getFullName(peter));

type PersonWithoutLastname = Omit<Person, 'lastName'>;

let jimmy: PersonWithoutLastname = {
  firstName: 'Jimmy',
  lastName: 'Doe'
};

////////////////////////////////////////////////////////////////////////
// advanced type checking

interface Point {
  x: number;
  y: number;
  z?: number;
}

function multiply(x: number, y: number): number {
  return x * y;
}

function calc(p: Point) {
  const { x, y, z } = p;
  Math.floor(x * y * z);

  if (typeof z === 'number') {
    Math.floor(x * y * z);
  }
  // alternative:
  if (z) {
    Math.floor(x * y * z);
  }

  return x * y * z;
}

interface BusinessPartner {
  name: string;
  credit: number;
}

interface Contact {
  email: string;
  phone: string;
}

type Customer = BusinessPartner & Contact;

let c: Customer = {
  name: 'ABC Inc.',
  credit: 1000000,
  email: 'sales@abcinc.com',
  phone: '(408)-897-5735'
};

// "as" keyword for casting
interface MyData {
  name: string;
  age: number;
}
const jsonString = '{"name": "John", "age": 25}';
const parsedData = JSON.parse(jsonString) as MyData;

console.log(parsedData.name); // "John"
console.log(parsedData.age); // "25"
console.log(parsedData.city); // error


////////////////////////////////////////////////////////////////

// unknown type

function processInput(input: unknown): string {

  if (typeof input === 'string') {
    return input.toUpperCase();
  } else if (Array.isArray(input)) {
    return input.join(', ');
  } else {
    return 'Unsupported input type';
  }
}

const result1 = processInput('Hello'); 
const result2 = processInput([1, 2, 3]); 
const result3 = processInput({ key: 'value' });

///////////////////////////////////////////////////////////////
//// type guard


function isPerson(obj: any): obj is { name: string, age: number } {
  return typeof obj === 'object' && 'name' in obj && 'age' in obj;
}

function printPersonInfo(person: { name: string, age: number } | string): string {
  if (isPerson(person)) {
    return `Name: ${person.name}, Age: ${person.age}`;
  } else {
    // we know it is a string
    return `Invalid person data: ${person}`;
  }
}

const validPerson = { name: 'John', age: 25 };
const invalidPerson = 'Invalid Data';

// generics
function getRandomStringElement(items: string[]): string {
  let randomIndex = Math.floor(Math.random() * items.length);
  return items[randomIndex];
}

function getRandomElement<T>(items: T[]): T {
  let randomIndex = Math.floor(Math.random() * items.length);
  return items[randomIndex];
}

let numbers = [1, 5, 7, 4, 2, 9];
let colors = ['red', 'green', 'blue'];

console.log(getRandomElement(numbers));
console.log(getRandomElement(colors));

// generic constraints

function merge<U, V>(obj1: U, obj2: V) {
  return {
    ...obj1,
    ...obj2
  };
}

merge(1, 2);

function merge2<U extends object, V extends object>(obj1: U, obj2: V) {
  return {
    ...obj1,
    ...obj2
  };
}

merge2(1, 2);

function prop<T, K>(obj: T, key: K) {
  return obj[key];
}

function prop2<T, K extends keyof T>(obj: T, key: K) {
  return obj[key];
}


////////////////////////////////////////////////////////////////

// advanced example with optional params
interface MyObject {
  data: string;
}

function processData(obj: MyObject, doExtraProcessing: true, processingParam: string): void;

function processData(obj: MyObject, doExtraProcessing: false): void;

function processData(obj: MyObject, doExtraProcessing?: boolean, processingParam?: string): void {
  console.log(obj.data);

  if (doExtraProcessing) {
    console.log(`Performing extra processing with param: ${processingParam?.toUpperCase()}`);
  }
}

const myObj: MyObject = { data: 'example' };

processData(myObj, false);

processData(myObj, true, 'additional');

processData(myObj, true);

////////////////////////////////////////////////////////////////

// create types from keys and values of objects

const myObject = {
  key1: 'value1',
  key2: 'value2',
  key3: 'value3'
} as const;

type MyObjectKeys = keyof typeof myObject;
type MyObjectValues = (typeof myObject)[MyObjectKeys];

const exampleValue: MyObjectValues = 'value1';
const exampleValueError: MyObjectValues = 'value111';
const exampleKey: MyObjectKeys = 'key2';
const exampleKeyError: MyObjectKeys = 'key22';

// Generic implementation
type ObjectKeys<T> = keyof T;
type ObjectValues<T> = T[keyof T];

type MyObjectKeys2 = ObjectKeys<typeof myObject>;
type MyObjectValues2 = ObjectValues<typeof myObject>;

const exampleKey2: MyObjectKeys = 'key2';
const exampleValue2: MyObjectValues = 'value2';

// let john = {
//   firstName: 'John',
//   lastName: 'Doe'
// };

const firstNameKeyOfJohn: ObjectKeys<typeof john> = 'firstName';
// error
const firstNameOfJohn: ObjectValues<typeof john> = 'noError';

// as const
let robert = {
  firstName: 'Robert',
  lastName: 'Doe'
} as const;

const firstNameKeyOfRobert: ObjectKeys<typeof robert> = 'firstName';
const firstNameOfRobert: ObjectValues<typeof robert> = 'Error';

////////////////////////////////////////////////////////////////////////

// string checking templates

type EmailTemplate = `${string}@${string}.${'com' | 'org' | 'net' | 'edu' | 'gov'}`;

const validEmail: EmailTemplate = 'john.doe@example.com';
const invalidEmail: EmailTemplate = 'invalid-email';
const invalidTopLevelDomain: EmailTemplate = 'john.doe@example.xyz';

////////////////////////////////////////////////////////////////////////

// infer
type ExtractType<T> = T extends Array<infer U> ? U : never;

const arr1: number[] = [1, 2, 3];
type ElementType = ExtractType<typeof arr1>;
