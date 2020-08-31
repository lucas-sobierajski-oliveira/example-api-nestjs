import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './models/user.model';
import { UserController } from './user/user.controller';


@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '127.0.0.1',
      port: 5432,
      username: 'postgres',
      password: 'docker',
      database: 'database',
      entities: [User]
    }),
    TypeOrmModule.forFeature([User])
  ],
  controllers: [AppController, UserController],
  providers: [AppService],
})
export class AppModule { }
