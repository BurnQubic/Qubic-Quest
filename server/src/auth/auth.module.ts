import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { PrismaService } from "src/prisma/prisma.service";
import { FirebaseAdminService } from "./auth.service";

@Module({
  providers: [FirebaseAdminService, PrismaService],
  controllers: [AuthController],
})
export class AuthModule {}
