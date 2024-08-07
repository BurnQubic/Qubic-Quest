import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  Get,
  Query,
  Param,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { ApiTags, ApiOperation, ApiBody, ApiResponse, ApiParam, ApiQuery } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { AuthGuard } from "@nestjs/passport";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("login")
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        email: { type: "string" },
        password: { type: "string" },
      },
    },
  })
  @ApiOperation({ summary: "User login" })
  @ApiResponse({ status: 200, description: "Successful login" })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  async login(@Body() body: { email: string; password: string }) {
    const user = await this.authService.validateUser(body.email, body.password);
    if (!user) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
    return this.authService.login(user);
  }

  @Post("register")
  @ApiOperation({ summary: "Register a new user" })
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        email: { type: "string" },
        password: { type: "string" },
      },
    },
  })
  @ApiResponse({ status: 201, description: "User registered successfully" })
  @ApiResponse({ status: 400, description: "Bad Request" })
  async register(@Body() body: { email: string; password: string }) {
    return this.authService.registerUser(body.email, body.password);
  }

  @Get("google")
  @UseGuards(AuthGuard("google"))
  @ApiOperation({ summary: "Google authentication" })
  @ApiQuery({ name: 'redirectUri', required: false, description: 'Optional redirect URI after authentication' })
  async googleAuth(@Request() req, @Query('redirectUri') redirectUri: string) {}

  @Get("google/callback")
  @UseGuards(AuthGuard("google"))
  @ApiOperation({ summary: "Google authentication callback" })
  @ApiResponse({ status: 200, description: "Successful Google login" })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  @ApiParam({ name: 'code', required: true, description: 'Authorization code from Google' })
  googleAuthRedirect(@Request() req, @Param('code') code: string) {
    return this.authService.googleLogin(req);
  }
}