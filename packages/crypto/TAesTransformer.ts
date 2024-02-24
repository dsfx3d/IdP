import {BinaryLike} from "node:crypto";
export type TAesTransformer = (input: string, iv: BinaryLike) => string;
