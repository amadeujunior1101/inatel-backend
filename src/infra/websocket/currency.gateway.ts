import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { CORS_CONFIG } from '@local:src/constants';

@Injectable()
@WebSocketGateway(CORS_CONFIG)
export class CurrencyGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;

  constructor(@Inject(CACHE_MANAGER) private cacheService: Cache) {}

  handleConnection(client: Socket) {
    console.log('Client connected:', client.id);
    this.sendCurrencyData(client);
  }

  handleDisconnect(client: Socket) {
    console.log('Client disconnected:', client.id);
  }

  async sendCurrencyData(client: Socket) {
    const cachedData = await this.cacheService.get('cache-1');
    if (cachedData) {
      // console.log('Sending currency data to client:', cachedData); // Log para verificar dados
      client.emit('currencyData', cachedData);
    }
  }

  async broadcastCurrencyData() {
    const cachedData = await this.cacheService.get('cache-1');
    if (cachedData) {
      // console.log('Broadcasting currency data:', cachedData); // Log para verificar dados
      this.server.emit('currencyData', cachedData);
    }
  }
}
