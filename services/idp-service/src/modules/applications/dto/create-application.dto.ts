import {IsPositive, IsString} from "class-validator";

export class CreateApplicationDto {
  @IsString()
  name: string;

  @IsPositive()
  userId: number;
}
