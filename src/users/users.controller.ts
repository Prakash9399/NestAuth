import { Controller, Post, Body, Get, Delete, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import {CreateUserDto} from './Dto/create-user.dto'
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
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
