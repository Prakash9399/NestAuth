import { Injectable,HttpException,HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/users.schemas';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(email: string, password: string): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);
    // const isPresent=this.findByEmail(email);
    // if(!isPresent){
    //   throw new HttpException('User already exists', HttpStatus.CONFLICT);
    // }
    const newUser = new this.userModel({ email, password: hashedPassword });
    return newUser.save();
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async findAll():Promise<User[]>{
    return this.userModel.find().exec()
  }

  async deleteUser(_id:string){
    return this.userModel.deleteOne({_id})
  }
}
