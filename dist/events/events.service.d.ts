import { CreateEventDto } from './dto/create-event.dto';
import { FirestoreService } from '../common/firestore/firestore.service';
export declare class EventsService {
    private readonly firestore;
    constructor(firestore: FirestoreService<CreateEventDto>);
    create(data: CreateEventDto): Promise<{
        id: string;
    } & CreateEventDto>;
    findAll(): Promise<({
        id: string;
    } & CreateEventDto)[]>;
    findOne(id: string): Promise<{
        id: string;
    } & CreateEventDto>;
    update(id: string, data: Partial<CreateEventDto>): Promise<{
        id: string;
    } & Partial<CreateEventDto>>;
    remove(id: string): Promise<{
        id: string;
    }>;
    search(query: string): Promise<({
        id: string;
    } & CreateEventDto)[]>;
    join(eventId: string, userId: string, listId?: string): Promise<{
        success: boolean;
    }>;
    queue(eventId: string, userId: string, listId?: string): Promise<{
        success: boolean;
    }>;
    unjoin(eventId: string, userId: string, listId?: string): Promise<{
        success: boolean;
    }>;
    unqueue(eventId: string, userId: string, listId?: string): Promise<{
        success: boolean;
    }>;
}
