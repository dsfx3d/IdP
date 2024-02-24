import type {BinaryLike, CipherKey} from "node:crypto";

type Algorithm = string;
export type TCipherIvArgs = [Algorithm, CipherKey, BinaryLike];
