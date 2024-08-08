import { PuzzleDifficulty } from "@prisma/client";
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreatePuzzleDto {
  @ApiProperty({ description: "The name of the puzzle", example: "My Puzzle" })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: "A description of the puzzle",
    example: "A challenging puzzle for experts",
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: "The difficulty level of the puzzle",
    example: "HARD",
    enum: PuzzleDifficulty,
  })
  @IsNotEmpty()
  @IsEnum(PuzzleDifficulty)
  difficulty: PuzzleDifficulty;

  @ApiProperty({ description: "The ID of the game type", example: 1 })
  @IsNotEmpty()
  @IsNumber()
  gameTypeId: number;
}
