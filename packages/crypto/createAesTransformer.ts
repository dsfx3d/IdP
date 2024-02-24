import {Cipher, CipherKey, Decipher, Encoding} from "node:crypto";
import {TAesAlgo} from "./TAesAlgo";
import {TAesTransformer} from "./TAesTransformer";
import {TCreateIvArgs} from "./TCreateIvArgs";

export function createAesTransformer(
  transformerFactory: (...options: TCreateIvArgs) => Cipher | Decipher,
  algorithm: TAesAlgo,
  key: CipherKey,
  encoding: {input: Encoding; output: Encoding},
): TAesTransformer {
  return (input, iv) => {
    const transformer = transformerFactory(algorithm, key, iv);
    let output = transformer.update(input, encoding.input, encoding.output);
    output += transformer.final(encoding.output);
    return output;
  };
}
