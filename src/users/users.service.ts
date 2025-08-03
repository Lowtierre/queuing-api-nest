import { Inject, Injectable } from '@nestjs/common';
import { FirestoreService } from '../common/firestore/firestore.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @Inject('FIRESTORE_SERVICE')
    private readonly firestore: FirestoreService<CreateUserDto>,
  ) {}

  create(data: CreateUserDto) {
    return this.firestore.create(data);
  }

  findAll() {
    return this.firestore.findAll();
  }

  findOne(id: string) {
    return this.firestore.findOne(id);
  }

  update(id: string, data: Partial<CreateUserDto>) {
    return this.firestore.update(id, data);
  }

  remove(id: string) {
    return this.firestore.remove(id);
  }
}
