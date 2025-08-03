import { FirestoreService } from '../common/firestore/firestore.service';
import { CreateUserDto } from './dto/create-user.dto';
export declare class UsersService {
    private readonly firestore;
    constructor(firestore: FirestoreService<CreateUserDto>);
    create(data: CreateUserDto): Promise<{
        id: string;
    } & CreateUserDto>;
    findAll(): Promise<({
        id: string;
    } & CreateUserDto)[]>;
    findOne(id: string): Promise<{
        id: string;
    } & CreateUserDto>;
    update(id: string, data: Partial<CreateUserDto>): Promise<{
        id: string;
    } & Partial<CreateUserDto>>;
    remove(id: string): Promise<{
        id: string;
    }>;
}
