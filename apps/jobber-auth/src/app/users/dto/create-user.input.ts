import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, IsString, IsStrongPassword } from "class-validator";

@InputType()
export class CreateUserInput {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  @IsString()
  password: string;
}
