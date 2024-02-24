import {TAesAlgo} from "./TAesAlgo";
import type {BinaryLike, CipherKey} from "node:crypto";

export type TCreateIvArgs = [TAesAlgo, CipherKey, BinaryLike];
