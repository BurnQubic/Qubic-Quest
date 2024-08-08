import { PartialType } from "@nestjs/swagger";
import { CreateGameTypeDto } from "./create-gametype.dto";

export class UpdateGameTypeDto extends PartialType(CreateGameTypeDto) {}
