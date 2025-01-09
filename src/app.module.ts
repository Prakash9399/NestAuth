import { Module, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';
import { MongooseModule, InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    MongooseModule.forRoot(
      'mongodb+srv://rajputprakash9399:dOEn7aPAWdXXQAnm@cluster0.fwrtz.mongodb.net/authDB?retryWrites=true&w=majority&appName=Cluster0',
    )
  ],
  controllers: [AppController, AuthController, UsersController],
  providers: [AppService, AuthService, UsersService],
})
export class AppModule implements OnModuleInit {
  constructor(@InjectConnection() private readonly connection: Connection) {}

  async onModuleInit() {
    this.connection.on('connected', () => {
      console.log('MongoDB connected successfully.');
    });

    this.connection.on('error', (err) => {
      console.error('MongoDB connection error:', err);
    });

    this.connection.on('disconnected', () => {
      console.warn('MongoDB connection disconnected.');
    });
  }
}
