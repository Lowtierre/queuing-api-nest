import { Test, TestingModule } from '@nestjs/testing';
import { EventsService } from './events.service';
import { FirestoreModule } from '../common/firestore/firestore.module';
import { CreateEventDto } from './dto/create-event.dto';

describe('EventsService', () => {
  let service: EventsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [FirestoreModule.forCollection<CreateEventDto>('events')],
      providers: [EventsService],
    }).compile();

    service = module.get<EventsService>(EventsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
