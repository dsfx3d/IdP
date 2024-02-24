import {BinaryLike, CipherKey} from "node:crypto";

export type TCryptoTransformer = (
  input: string,
  key: CipherKey,
  iv: BinaryLike,
) => string;
