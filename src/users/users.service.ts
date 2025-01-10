import { Injectable,HttpException,HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/users.schemas';
import * as bcrypt from 'bcrypt';
import {CreateUserDto} from "./Dto/create-user.dto"
@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto:CreateUserDto): Promise<User> {
  
     const isPresent=await this.userModel.findOne({email:createUserDto.email})

    if(isPresent){
      throw new HttpException('User already exists', HttpStatus.CONFLICT);
    }
     const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
   
    const newUser = new this.userModel({ email:createUserDto.email, password: hashedPassword });
    return newUser.save();
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async findAll():Promise<CreateUserDto[]>{
    return this.userModel.find().exec()
  }

  async deleteUser(_id:string){
    return this.userModel.deleteOne({_id})
  }
}
