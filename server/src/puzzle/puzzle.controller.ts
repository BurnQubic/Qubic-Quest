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
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from "@nestjs/swagger";

@ApiTags("puzzle")
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
  create(@Body() createPuzzleDto: CreatePuzzleDto) {
    return this.puzzleService.create(createPuzzleDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all puzzles" })
  @ApiResponse({
    status: 200,
    description: "All puzzles have been successfully retrieved.",
  })
  findAll() {
    return this.puzzleService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a puzzle by ID" })
  @ApiParam({ name: "id", type: "number" })
  @ApiResponse({
    status: 200,
    description: "The puzzle has been successfully retrieved.",
  })
  findOne(@Param("id") id: string) {
    return this.puzzleService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update a puzzle by ID" })
  @ApiParam({ name: "id", type: "number" })
  @ApiBody({ type: UpdatePuzzleDto })
  @ApiResponse({
    status: 200,
    description: "The puzzle has been successfully updated.",
  })
  update(@Param("id") id: string, @Body() updatePuzzleDto: UpdatePuzzleDto) {
    return this.puzzleService.update(+id, updatePuzzleDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete a puzzle by ID" })
  @ApiParam({ name: "id", type: "number" })
  @ApiResponse({
    status: 200,
    description: "The puzzle has been successfully deleted.",
  })
  remove(@Param("id") id: string) {
    return this.puzzleService.remove(+id);
  }
}
