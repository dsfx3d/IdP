import {Cipher, Decipher, Encoding} from "node:crypto";
import {TCipherIvArgs} from "./TCipherIvArgs";
import {TCryptoTransformer} from "./TCryptoTransformer";

export function createCryptoTransformer(
  transformerFactory: (...options: TCipherIvArgs) => Cipher | Decipher,
  inputEncoding: Encoding,
  outputEncoding: Encoding,
  algorithm = "aes-256-cbc",
): TCryptoTransformer {
  return (input, key, iv) => {
    const transformer = transformerFactory(algorithm, key, iv);
    let output = transformer.update(input, inputEncoding, outputEncoding);
    output += transformer.final(outputEncoding);
    return output;
  };
}
