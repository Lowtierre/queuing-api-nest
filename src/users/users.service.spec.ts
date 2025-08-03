import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { FirestoreModule } from '../common/firestore/firestore.module';
import { CreateUserDto } from './dto/create-user.dto';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [FirestoreModule.forCollection<CreateUserDto>('users')],
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
