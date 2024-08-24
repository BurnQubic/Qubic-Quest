import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateScoreDto {
  @IsNotEmpty()
  @IsNumber()
  score: number;

  @IsNotEmpty()
  @IsNumber()
  userId: number;
}
