

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://rajputprakash9399:dOEn7aPAWdXXQAnm@cluster0.fwrtz.mongodb.net/authDB?retryWrites=true&w=majority&appName=Cluster0'),
    AuthModule,
    UsersModule,
  ],
})
export class AppModule {}
