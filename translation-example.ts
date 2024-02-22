const translations = {
  swedish: {
    vehicle: {
      brand: 'märke',
      color: 'färg'
    },
    furniture: {
      chair: 'stol',
      table: 'bord',
      type: {
        plastic: 'plast',
        steel: 'stål'
      }
    }
  },
  english: {
    vehicle: {
      brand: 'brand',
      color: 'color'
    },
    furniture: {
      chair: 'chair',
      table: 'table',
      type: {
        plastic: 'plastic',
        steel: 'steel'
      }
    }
  }
} as const;

type TranslationType = typeof translations;

type Language = keyof TranslationType;
// type Language = "swedish" | "english"

type ConcatNestedKeys<T> = T extends object
  ? {
      [K in keyof T]: `${K & string}${string &
        (T[K] extends object ? `.${ConcatNestedKeys<T[K]>}` : '')}`;
    }[keyof T]
  : '';

type TranslationParams = ConcatNestedKeys<TranslationType[Language]>;
// type TranslationParams = "vehicle.brand" | "vehicle.color" | "furniture.chair" | "furniture.table" | "furniture.type.plastic" | "furniture.type.steel"

type FlattenObjectValues<T> = T extends object
  ? { [K in keyof T]: FlattenObjectValues<T[K]> }[keyof T]
  : T;

type AllTranslatedStrings = FlattenObjectValues<TranslationType>;
// type AllTranslatedStrings = "märke" | "färg" | "stol" | "bord" | "plast" | "stål" | "brand" | "color" | "chair" | "table" | "plastic" | "steel"

type NestedKeys<T> = T extends object ? { [K in keyof T]: K | NestedKeys<T[K]> }[keyof T] : never;

type AllKeys = NestedKeys<TranslationType[Language]>;
// type AllKeys = "brand" | "color" | "chair" | "table" | "plastic" | "steel" | "vehicle" | "furniture" | "type"

type ObjectOrSubPaths<T> = {
  [K in keyof T]: T[K] extends object ? ObjectOrSubPaths<T[K]> : T[K];
};

type TranslationsAllSubPaths = ObjectOrSubPaths<TranslationType>;

// translate function

function translate(
  language: Language,
  keys: TranslationParams
): AllTranslatedStrings | typeof keys {
  const keysArray = keys.split('.') as AllKeys[];

  let currentObjectOrString = translations as TranslationsAllSubPaths;

  for (const key of [language, ...keysArray]) {
    if (
      typeof currentObjectOrString === 'object' &&
      currentObjectOrString !== null &&
      key in currentObjectOrString
    ) {
      currentObjectOrString = currentObjectOrString[key];
    }
  }

  if (typeof currentObjectOrString === 'string') {
    // needed or typescript will complain
    return currentObjectOrString;
  }
  return keys;
}

const validTranslation = translate('swedish', 'vehicle.brand');
const validTranslation2 = translate('swedish', 'furniture.type.plastic');

console.log('### validTranslation:', validTranslation);
console.log('### validTranslation2:', validTranslation2);

// TS ERROR
const invalidTranslation = translate('swedish', 'vehicle');
const invalidTranslation2 = translate('swedish', 'vehicle.color.nonexistent');
const invalidTranslation3 = translate('swedish', 'furniture.type');

console.log('### invalidTranslation3:', invalidTranslation3);
