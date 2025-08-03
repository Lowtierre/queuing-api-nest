import {
  Inject,
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { FirestoreService } from '../common/firestore/firestore.service';

type User = { id: string };

@Injectable()
export class EventsService {
  constructor(
    @Inject('FIRESTORE_SERVICE')
    private readonly firestore: FirestoreService<CreateEventDto>,
  ) {}

  create(data: CreateEventDto) {
    return this.firestore.create(data);
  }

  findAll() {
    return this.firestore.findAll();
  }

  findOne(id: string) {
    return this.firestore.findOne(id);
  }

  update(id: string, data: Partial<CreateEventDto>) {
    return this.firestore.update(id, data);
  }

  remove(id: string) {
    return this.firestore.remove(id);
  }

  async search(query: string) {
    const allEvents = await this.firestore.findAll();

    const lower = query.toLowerCase();
    return allEvents.filter(
      (event) =>
        event.name?.toLowerCase().includes(lower) ||
        event.location?.toLowerCase().includes(lower),
    );
  }

  async join(eventId: string, userId: string, listId?: string) {
    const event = await this.firestore.findOne(eventId);
    if (!event) throw new NotFoundException('Event not found');

    const user: User = { id: userId };

    if (listId) {
      const list = event.lists?.find((l) => l.id === listId);
      if (!list) throw new NotFoundException('List not found');

      const isInList = list.participants?.some((p) => p.id === userId);
      if (isInList)
        throw new BadRequestException('User already joined this list');

      const currentCount = list.participants?.length || 0;
      if (currentCount >= list.max)
        throw new BadRequestException('List is full');

      list.participants = [...(list.participants || []), user];
    } else {
      const isInEvent = event.participants?.some((p) => p.id === userId);
      if (isInEvent)
        throw new BadRequestException('User already joined the event');

      const currentCount = event.participants?.length || 0;
      if (event.maxParticipants && currentCount >= event.maxParticipants) {
        throw new BadRequestException('Event is full');
      }

      event.participants = [...(event.participants || []), user];
    }

    await this.firestore.update(eventId, event);
    return { success: true };
  }

  async queue(eventId: string, userId: string, listId?: string) {
    const event = await this.firestore.findOne(eventId);
    if (!event) throw new NotFoundException('Event not found');

    const user: User = { id: userId };

    if (listId) {
      const list = event.lists?.find((l) => l.id === listId);
      if (!list) throw new NotFoundException('List not found');

      const isAlreadyQueued = list.queue?.some((p) => p.id === userId);
      if (isAlreadyQueued)
        throw new BadRequestException('User already in list queue');

      list.queue = [...(list.queue || []), user];
    } else {
      const isAlreadyQueued = event.queue?.some((p) => p.id === userId);
      if (isAlreadyQueued)
        throw new BadRequestException('User already in queue');

      event.queue = [...(event.queue || []), user];
    }

    await this.firestore.update(eventId, event);
    return { success: true };
  }

  async unjoin(eventId: string, userId: string, listId?: string) {
    const event = await this.firestore.findOne(eventId);
    if (!event) throw new NotFoundException('Event not found');

    if (listId) {
      const list = event.lists?.find((l) => l.id === listId);
      if (!list) throw new NotFoundException('List not found');

      list.participants = (list.participants || []).filter(
        (p) => p.id !== userId,
      );
    } else {
      event.participants = (event.participants || []).filter(
        (p) => p.id !== userId,
      );
    }

    await this.firestore.update(eventId, event);
    return { success: true };
  }

  async unqueue(eventId: string, userId: string, listId?: string) {
    const event = await this.firestore.findOne(eventId);
    if (!event) throw new NotFoundException('Event not found');

    if (listId) {
      const list = event.lists?.find((l) => l.id === listId);
      if (!list) throw new NotFoundException('List not found');

      list.queue = (list.queue || []).filter((p) => p.id !== userId);
    } else {
      event.queue = (event.queue || []).filter((p) => p.id !== userId);
    }

    await this.firestore.update(eventId, event);
    return { success: true };
  }
}
