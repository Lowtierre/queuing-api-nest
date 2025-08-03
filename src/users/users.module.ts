import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { FirestoreModule } from '../common/firestore/firestore.module';
import { CreateUserDto } from './dto/create-user.dto';

@Module({
  imports: [FirestoreModule.forCollection<CreateUserDto>('users')],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
