import { Module } from "@nestjs/common";
import { DailytriesService } from "./dailytries.service";
import { DailytriesController } from "./dailytries.controller";

@Module({
  controllers: [DailytriesController],
  providers: [DailytriesService],
})
export class DailytriesModule {}
