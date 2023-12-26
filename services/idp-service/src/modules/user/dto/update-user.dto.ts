import {CreateUserDto} from "./create-user.dto";
import {OmitType, PartialType} from "@nestjs/mapped-types";

export class UpdateUserDto extends OmitType<
  Partial<CreateUserDto>,
  keyof CreateUserDto
>(PartialType(CreateUserDto), ["password"]) {}
