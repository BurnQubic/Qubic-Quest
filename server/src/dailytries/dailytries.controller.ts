import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { DailytriesService } from "./dailytries.service";
import { CreateDailytryDto } from "./dto/create-dailytry.dto";
import { UpdateDailytryDto } from "./dto/update-dailytry.dto";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Daily Tries")
@Controller("dailytries")
export class DailytriesController {
  constructor(private readonly dailytriesService: DailytriesService) {}

  @Post()
  create(@Body() createDailytryDto: CreateDailytryDto) {
    return this.dailytriesService.create(createDailytryDto);
  }

  @Get()
  findAll() {
    return this.dailytriesService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.dailytriesService.findOne(+id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateDailytryDto: UpdateDailytryDto,
  ) {
    return this.dailytriesService.update(+id, updateDailytryDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.dailytriesService.remove(+id);
  }
}
