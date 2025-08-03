import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { FirestoreModule } from '../common/firestore/firestore.module';
import { CreateEventDto } from './dto/create-event.dto';

@Module({
  imports: [FirestoreModule.forCollection<CreateEventDto>('events')],
  controllers: [EventsController],
  providers: [EventsService],
})
export class EventsModule {}
