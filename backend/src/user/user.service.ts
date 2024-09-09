import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { USER_REPOSITORY } from '../constants';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY)
    private userRepository: Repository<User>
  ){}

  async createUser(createUserDto: CreateUserDto) {
    const hashPassword = await bcrypt.hash(createUserDto.password, 10);
    const newUser = new User({email: createUserDto.email, password: hashPassword});
    const {id, email} = await this.userRepository.save(newUser);
    return {id, email};
  }

  async getUserByEmail(email: string){
    return await this.userRepository.findOneBy({email})
  }

  async getUserById(id: number){
    return await this.userRepository.findOneBy({id})
  }

  async getUserTasks(userId: number) {
    const user = await this.userRepository.findOne({relations: {tasks: true}, where: {id: userId}})
    return user.tasks;
  }

  async deleteUser(id: number) {
    const userToDelete = await this.getUserById(id);
    await this.userRepository.delete({id});
    return userToDelete;
  }

}
