import { PuzzleDifficulty } from "@prisma/client";
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateGameTypeDto {
  @ApiProperty({
    description: "The name of the game type",
    example: "My Puzzle",
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: "A description of the game type",
    example: "A challenging puzzle for experts",
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;
}
