import { ParamPosition } from "../enums/param-position";

export interface ParamMetadata {
  position: ParamPosition;
  parameterIndex: number;
  key: string;
}