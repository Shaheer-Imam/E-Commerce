import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RegisterDTO } from 'src/auth/auth.dto';
import { User } from 'src/types/user';
import { RegisterDTO, LoginDTO } from '../../auth/auth.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService{
    constructor(@InjectModel('User') private userModel: Model<User>){}

    private sanitizeUser(user: User){
        return user.depopulate('password');
    }

    async create(userDTO: RegisterDTO){
        const { username } = userDTO;
        const user = await this.userModel.findOne({username});
        if(user){
            throw new HttpException('User already exist',HttpStatus.BAD_REQUEST);
        }
        const createdUser = new this.userModel(userDTO);
        await createdUser.save();
        return this.sanitizeUser(createdUser);
    }

    async findByLogin(userDTO: LoginDTO){
        const {username, password} = userDTO;
        const user = await this.userModel.findOne({username});
        if(!user){
            throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
        }
        if(await bcrypt.compare(password,user.password)){
            return this.sanitizeUser(user);
        } else {
            throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
        }
    }

    async findByLogin(userDTO: any){}
}
