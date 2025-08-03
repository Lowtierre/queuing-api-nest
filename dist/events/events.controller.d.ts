import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
export declare class EventsController {
    private readonly eventsService;
    constructor(eventsService: EventsService);
    joinEvent(eventId: string, body: {
        userId: string;
        listId?: string;
    }): Promise<{
        success: boolean;
    }>;
    addToQueue(eventId: string, body: {
        userId: string;
        listId?: string;
    }): Promise<{
        success: boolean;
    }>;
    unjoinEvent(id: string, body: {
        userId: string;
        listId?: string;
    }): Promise<{
        success: boolean;
    }>;
    unquequeEvent(id: string, body: {
        userId: string;
        listId?: string;
    }): Promise<{
        success: boolean;
    }>;
    create(createEventDto: CreateEventDto): Promise<{
        id: string;
    } & CreateEventDto>;
    search(query: string): Promise<({
        id: string;
    } & CreateEventDto)[]>;
    findAll(): Promise<({
        id: string;
    } & CreateEventDto)[]>;
    findOne(id: string): Promise<{
        id: string;
    } & CreateEventDto>;
    update(id: string, updateEventDto: UpdateEventDto): Promise<{
        id: string;
    } & Partial<CreateEventDto>>;
    remove(id: string): Promise<{
        id: string;
    }>;
}
