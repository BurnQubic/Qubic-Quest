import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { PrismaModule } from "./prisma/prisma.module";
import { UsersModule } from "./users/users.module";
import { AuthModule } from "./auth/auth.module";
import { PuzzleModule } from "./puzzle/puzzle.module";
import { ScoreModule } from "./leaderboard/score/score.module";
import { ScoreModule } from "./score/score.module";
import { LeaderboardModule } from "./leaderboard/leaderboard.module";
import { TransactionModule } from "./transaction/transaction.module";
import { AuctionModule } from "./auction/auction.module";
import { DailytriesModule } from "./dailytries/dailytries.module";

@Module({
  imports: [
    PrismaModule,
    UsersModule,
    AuthModule,
    PuzzleModule,
    ScoreModule,
    LeaderboardModule,
    TransactionModule,
    AuctionModule,
    DailytriesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
