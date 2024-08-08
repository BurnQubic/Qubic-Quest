import { Injectable } from "@nestjs/common";
import { CreateDailytryDto } from "./dto/create-dailytry.dto";
import { UpdateDailytryDto } from "./dto/update-dailytry.dto";

@Injectable()
export class DailytriesService {
  create(createDailytryDto: CreateDailytryDto) {
    return "This action adds a new dailytry";
  }

  findAll() {
    return `This action returns all dailytries`;
  }

  findOne(id: number) {
    return `This action returns a #${id} dailytry`;
  }

  update(id: number, updateDailytryDto: UpdateDailytryDto) {
    return `This action updates a #${id} dailytry`;
  }

  remove(id: number) {
    return `This action removes a #${id} dailytry`;
  }
}
