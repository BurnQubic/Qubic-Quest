import { PartialType } from "@nestjs/swagger";
import { CreateDailytryDto } from "./create-dailytry.dto";

export class UpdateDailytryDto extends PartialType(CreateDailytryDto) {}
