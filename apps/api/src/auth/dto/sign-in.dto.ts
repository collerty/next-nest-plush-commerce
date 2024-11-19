import {IsNotEmpty, MinLength} from "class-validator";

export class SignInDto {
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
