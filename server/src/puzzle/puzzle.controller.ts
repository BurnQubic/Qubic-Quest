import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { PuzzleService } from "./puzzle.service";
import { CreatePuzzleDto } from "./dto/create-puzzle.dto";
import { UpdatePuzzleDto } from "./dto/update-puzzle.dto";
import { CreateGameTypeDto } from "./dto/create-gametype.dto";
import { UpdateGameTypeDto } from "./dto/update-gametype.dto";

import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from "@nestjs/swagger";

@ApiTags("Puzzle")
@Controller("puzzle")
export class PuzzleController {
  constructor(private readonly puzzleService: PuzzleService) {}

  @Post()
  @ApiOperation({ summary: "Create a new puzzle" })
  @ApiBody({ type: CreatePuzzleDto })
  @ApiResponse({
    status: 201,
    description: "The puzzle has been successfully created.",
  })
  createPuzzle(@Body() createPuzzleDto: CreatePuzzleDto) {
    return this.puzzleService.createPuzzle(createPuzzleDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all puzzles" })
  @ApiResponse({
    status: 200,
    description: "All puzzles have been successfully retrieved.",
  })
  findAllPuzzles() {
    return this.puzzleService.findAllPuzzles();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a puzzle by ID" })
  @ApiParam({ name: "id", type: "number" })
  @ApiResponse({
    status: 200,
    description: "The puzzle has been successfully retrieved.",
  })
  findOnePuzzle(@Param("id") id: string) {
    return this.puzzleService.findOnePuzzle(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update a puzzle by ID" })
  @ApiParam({ name: "id", type: "number" })
  @ApiBody({ type: UpdatePuzzleDto })
  @ApiResponse({
    status: 200,
    description: "The puzzle has been successfully updated.",
  })
  updatePuzzle(
    @Param("id") id: string,
    @Body() updatePuzzleDto: UpdatePuzzleDto,
  ) {
    return this.puzzleService.updatePuzzle(+id, updatePuzzleDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete a puzzle by ID" })
  @ApiParam({ name: "id", type: "number" })
  @ApiResponse({
    status: 200,
    description: "The puzzle has been successfully deleted.",
  })
  removePuzzle(@Param("id") id: string) {
    return this.puzzleService.removePuzzle(+id);
  }

  @Post("/gametype")
  @ApiOperation({ summary: "Create a new game type" })
  @ApiBody({ type: CreateGameTypeDto })
  @ApiResponse({
    status: 201,
    description: "The game type has been successfully created.",
  })
  createGameType(@Body() createGameTypeDto: CreateGameTypeDto) {
    return this.puzzleService.createGameType(createGameTypeDto);
  }

  @Get("/gametype")
  @ApiOperation({ summary: "Get all game types" })
  @ApiResponse({
    status: 200,
    description: "All game types have been successfully retrieved.",
  })
  findAllGameTypes() {
    return this.puzzleService.findAllGameTypes();
  }

  @Get("/gametype/:id")
  @ApiOperation({ summary: "Get a game type by ID" })
  @ApiParam({ name: "id", type: "number" })
  @ApiResponse({
    status: 200,
    description: "The game type has been successfully retrieved.",
  })
  findOneGameType(@Param("id") id: string) {
    return this.puzzleService.findOneGameType(+id);
  }

  @Patch("/gametype/:id")
  @ApiOperation({ summary: "Update a game type by ID" })
  @ApiParam({ name: "id", type: "number" })
  @ApiBody({ type: UpdateGameTypeDto })
  @ApiResponse({
    status: 200,
    description: "The game type has been successfully updated.",
  })
  updateGameType(
    @Param("id") id: string,
    @Body() updateGameTypeDto: UpdateGameTypeDto,
  ) {
    return this.puzzleService.updateGameType(+id, updateGameTypeDto);
  }

  @Delete("/gametype/:id")
  @ApiOperation({ summary: "Delete a game type by ID" })
  @ApiParam({ name: "id", type: "number" })
  @ApiResponse({
    status: 200,
    description: "The game type has been successfully deleted.",
  })
  removeGameType(@Param("id") id: string) {
    return this.puzzleService.removeGameType(+id);
  }
}
