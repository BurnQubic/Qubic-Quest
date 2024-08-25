import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateTransactionDto {
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsNumber()
  userId: number;
}
