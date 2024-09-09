import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { DatabaseModule } from '../database/database.module';
import { UserController } from './user.controller';
import { userProviders } from './user.providers';
import { CreateUserDto } from './dto/create-user.dto';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports:[DatabaseModule],
      controllers: [UserController],
      providers: [...userProviders,UserService],
    exports: [UserService]
    }).compile();

    service = module.get<UserService>(UserService);
  });

  describe('Create User', () => {
    it('should create a user', async() => {
      const userInfo: CreateUserDto = {
        email: 'testuser@email.com',
        password: 'my-password',
      }
      const userCreated = await service.createUser(userInfo)
      const userRetrieved = await service.getUserByEmail(userCreated.email)
      expect(userRetrieved.email).toBe(userCreated.email)
      expect(userRetrieved.id).toBe(userCreated.id)
      await service.deleteUser(userCreated.id)
    });
  })
});
