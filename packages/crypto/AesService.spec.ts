import {AesService} from "./AesService";
import {describeEncryptionService} from "./describeEncryptionService";
import {randomBytes} from "node:crypto";

describeEncryptionService(AesService.name, new AesService(randomBytes(32)));
