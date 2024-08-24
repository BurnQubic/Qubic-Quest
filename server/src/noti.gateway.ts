import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from "@nestjs/websockets";
import { Server } from "socket.io";
import { PrismaService } from "./prisma/prisma.service";

@WebSocketGateway()
export class NotiGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;
  constructor(private prismaService: PrismaService) {}

  afterInit() {
    console.log("Websocket gateway initialized");
  }

  handleConnection(client: any, ...args: any[]) {
    console.log(`Client connected: ${client.id}`);
    client.join(client.id);
  }

  handleDisconnect(client: any) {
    console.log(`Client disconnected: ${client.id}`);
    client.leave(client.id);
  }

  @SubscribeMessage("message")
  handleMessage(client: any, payload: any): string {
    return "Hello world!";
  }

  @SubscribeMessage("leaderboardUpdate")
  handleLeaderboardUpdate(client: any, payload: any) {
    this.server.emit("leaderboardUpdate", payload);
  }

  @SubscribeMessage("rewardUpdate")
  handleRewardUpdate(client: any, payload: any) {
    this.server.emit("rewardUpdate", payload);
  }

  @SubscribeMessage("messageReceived")
  handleMessageReceived(client: any, payload: any) {
    this.server.to(payload.userId).emit("messageReceived", payload.message);
  }

  @SubscribeMessage("friendRequestReceived")
  handleFriendRequestReceived(client: any, payload: any) {
    this.server
      .to(payload.userId)
      .emit("friendRequestReceived", payload.request);
  }

  @SubscribeMessage("auctionUpdate")
  handleAuctionUpdate(client: any, payload: any) {
    this.server.emit("auctionUpdate", payload);
  }
}
