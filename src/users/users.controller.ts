import { Controller, Post, Body, Get, Delete, Param } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async register(@Body() body: { email: string; password: string }) {
    return this.usersService.create(body.email, body.password);
  }

  @Get()
  async getAllUser(){
    return this.usersService.findAll();
  }

  @Delete(':id')
  async deleteUser(@Param('id')id:string){
    return this.usersService.deleteUser(id)
  }
}
