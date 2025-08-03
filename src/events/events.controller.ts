import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post(':id/join')
  joinEvent(
    @Param('id') eventId: string,
    @Body() body: { userId: string; listId?: string },
  ) {
    return this.eventsService.join(eventId, body.userId, body.listId);
  }

  @Post(':id/queue')
  addToQueue(
    @Param('id') eventId: string,
    @Body() body: { userId: string; listId?: string },
  ) {
    return this.eventsService.queue(eventId, body.userId, body.listId);
  }

  @Post(':id/unjoin')
  unjoinEvent(
    @Param('id') id: string,
    @Body() body: { userId: string; listId?: string },
  ) {
    return this.eventsService.unjoin(id, body.userId, body.listId);
  }

  @Post(':id/unqueue')
  unquequeEvent(
    @Param('id') id: string,
    @Body() body: { userId: string; listId?: string },
  ) {
    return this.eventsService.unqueue(id, body.userId, body.listId);
  }

  @Post()
  create(@Body() createEventDto: CreateEventDto) {
    return this.eventsService.create(createEventDto);
  }

  @Get('search')
  search(@Query('query') query: string) {
    return this.eventsService.search(query);
  }

  @Get()
  findAll() {
    return this.eventsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
    return this.eventsService.update(id, updateEventDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventsService.remove(id);
  }
}
