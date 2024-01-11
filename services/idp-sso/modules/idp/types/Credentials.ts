import {CredentialsDto} from "@/idp-service/src/modules/auth/dto/credentials.dto";

export type Credentials = {
  sessionId: string;
} & CredentialsDto;
