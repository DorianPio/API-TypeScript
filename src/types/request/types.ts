import { Model, Schema, model } from "mongoose";

/**
 * Extract the basic type given to the Model
 *
 * @example
 * type TMP = ExtractType<Model<IUser, ...>>; // TMP equal IUser
 * type test<T extends Model<any>> = T;
 * // schema is an object --> contains obj --> contains IUser and all propeties
 * // And we had Id to the properties
 */
export type ExtractType<T extends Model<any>> = T["schema"]["obj"] & {
  _id?: Schema.Types.ObjectId;
};

/**
 * P in keyof T is a for on the all function like sort...
 * T[P] become sort
 * extends ...args etc test if its function
 *
 * @example
 * type TMP = {
 *   a: (arg: string) => any,
 *   b: (arg: { c: number }) => any,
 * }
 * type TMP1 = Parametize<TMP>; // TMP1 = { a: string, b: { c: number } };
 */
export type Parametize<T extends {}> = {
  [P in keyof T]?: T[P] extends (...args: any[]) => any
    ? Parameters<T[P]>[0]
    : never;
};

export type Modifier<T extends Model<any>> = Parametize<
  ReturnType<T["findOne"]>
>;

// type TMP = "abc" | "adc" | "bca";
// type TMP2<K extends string> = K extends `a${any}` ? K : never;
// type TMP3 = TMP2<TMP>;

export type ModelFunctions_<Keys extends keyof Model<any>> =
  Keys extends keyof any
    ? Model<any>[Keys] extends (...args: any[]) => any
      ? Keys
      : never
    : never;

/**
 * It's returning the current pure object
 * Likre all the Model content and not the User content or Trainers...
 */
export type ModelFunctions = ModelFunctions_<keyof Model<any>>;

/**
 * // type TMP4<K extends string> = K extends `$${infer R}` ? R : never;
 * // type TMP5 = TMP4<ModelFunctions>;
 *
 * Return all the sring with a $ and delete it
 */

type TMP4<K extends string> = K extends `$${any}` ? never : K;
export type ModelFunctionList = TMP4<ModelFunctions>;

/**
 * Request type can be use for make a request
 *
 * @example
 * type TMP = "get"
 * It's a component for create generic function
 */

type RequestAvailable = "get" | "delete" | "put" | "patch" | "post";

/**
 * Extract the basic type given to the Model
 *
 * @example
 * type TMP = ExtractType<Model<IUser, ...>>; // TMP equal IUser
 * type test<T extends Model<any>> = T;
 * // schema is an object --> contains obj --> contains IUser and all propeties
 * // And we had Id to the properties
 */

/**
 * Properties to use in make<METHOD>Request
 */

export type Creator<T extends Model<any>> = {
  name?: string;
  description?: string;
  path: string;
  filter: (
    | keyof ExtractType<T>
    | {
        key: keyof ExtractType<T>;
        getter: "query" | "body" | ((req: any, res: any) => Promise<string>);
      }
  )[];
  functionPropeties: {
    requestFunction: ModelFunctionList;
    filter?: { [P in keyof ExtractType<T>]: number | string };
    modifiers?: Modifier<T>;
  };
  request: RequestAvailable;
};

/**
 * Types Standars to create type to go in different function
 */

type GETCreatorSimple<T extends Model<any>> = Creator<T>;
type GETCreatorArray<T extends Model<any>> = Creator<T>;

/**
 * Router to redirect in function
 */

export type RouteCreator<T extends Model<any>> =
  | {
      type: "GET_Simple";
    } & GETCreatorSimple<T>;
// | ({
//     type: "GET_Array";
//   } & GETCreatorArray<T>);

export type whereInRequest = "query" | "body";
