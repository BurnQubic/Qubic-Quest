import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreatePuzzleDto } from "./dto/create-puzzle.dto";
import { UpdatePuzzleDto } from "./dto/update-puzzle.dto";
import { CreateGameTypeDto } from "./dto/create-gametype.dto";
import { UpdateGameTypeDto } from "./dto/update-gametype.dto";

@Injectable()
export class PuzzleService {
  constructor(private prisma: PrismaService) {}

  async createPuzzle(createPuzzleDto: CreatePuzzleDto) {
    return this.prisma.puzzle.create({
      data: createPuzzleDto,
    });
  }

  async findAllPuzzles() {
    return this.prisma.puzzle.findMany();
  }

  async findOnePuzzle(id: number) {
    return this.prisma.puzzle.findUnique({
      where: { id },
    });
  }

  async updatePuzzle(id: number, updatePuzzleDto: UpdatePuzzleDto) {
    return this.prisma.puzzle.update({
      where: { id },
      data: updatePuzzleDto,
    });
  }

  async removePuzzle(id: number) {
    return this.prisma.puzzle.delete({
      where: { id },
    });
  }
  async createGameType(createGameType: CreateGameTypeDto) {
    return this.prisma.gameType.create({
      data: createGameType,
    });
  }

  async findAllGameTypes() {
    return this.prisma.gameType.findMany();
  }

  async findOneGameType(id: number) {
    return this.prisma.gameType.findUnique({
      where: { id },
    });
  }

  async updateGameType(id: number, updateGameType: UpdateGameTypeDto) {
    return this.prisma.gameType.update({
      where: { id },
      data: updateGameType,
    });
  }

  async removeGameType(id: number) {
    return this.prisma.gameType.delete({
      where: { id },
    });
  }
}
