import { Model } from "mongoose";
import { Creator } from "./types";
import { User } from "../../database/Schema/User";
import { StatusType } from "../status/status";

/**
 * Type to get a message by a status code
 * @example
 * type Description200 = GetStatusDescription<200>; // "OK"
 */

export type GetStatusDescription<Code extends keyof StatusType & number> =
  Code extends keyof StatusType
    ? StatusType[Code] extends { description: infer Desc }
      ? Desc
      : never
    : never;

/**
 * Type to get a message by a status code
 * @example
 * type TMP2 = Creator<typeof User>;
 * type TMP = ResponseType<TMP2, 400, true, "<Your auth token> or response can be empty">;
 */

export type ResponseParserType<
  K extends keyof StatusType & number,
  L extends any
> = {
  statusCode: K;
  description: GetStatusDescription<K>;
  data: L;
};

type TMP2 = Creator<typeof User>;
type TMP = ResponseParserType<
  400,
  "<Your auth token> or response can be empty"
>;

// const mavar: TMP = {
//   statusCode: 400,
//   description: "Bad Request",
//   data: "Y",
// };
