"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventsService = void 0;
const common_1 = require("@nestjs/common");
const firestore_service_1 = require("../common/firestore/firestore.service");
let EventsService = class EventsService {
    firestore;
    constructor(firestore) {
        this.firestore = firestore;
    }
    create(data) {
        return this.firestore.create(data);
    }
    findAll() {
        return this.firestore.findAll();
    }
    findOne(id) {
        return this.firestore.findOne(id);
    }
    update(id, data) {
        return this.firestore.update(id, data);
    }
    remove(id) {
        return this.firestore.remove(id);
    }
    async search(query) {
        const allEvents = await this.firestore.findAll();
        const lower = query.toLowerCase();
        return allEvents.filter((event) => event.name?.toLowerCase().includes(lower) ||
            event.location?.toLowerCase().includes(lower));
    }
    async join(eventId, userId, listId) {
        const event = await this.firestore.findOne(eventId);
        if (!event)
            throw new common_1.NotFoundException('Event not found');
        const user = { id: userId };
        if (listId) {
            const list = event.lists?.find((l) => l.id === listId);
            if (!list)
                throw new common_1.NotFoundException('List not found');
            const isInList = list.participants?.some((p) => p.id === userId);
            if (isInList)
                throw new common_1.BadRequestException('User already joined this list');
            const currentCount = list.participants?.length || 0;
            if (currentCount >= list.max)
                throw new common_1.BadRequestException('List is full');
            list.participants = [...(list.participants || []), user];
        }
        else {
            const isInEvent = event.participants?.some((p) => p.id === userId);
            if (isInEvent)
                throw new common_1.BadRequestException('User already joined the event');
            const currentCount = event.participants?.length || 0;
            if (event.maxParticipants && currentCount >= event.maxParticipants) {
                throw new common_1.BadRequestException('Event is full');
            }
            event.participants = [...(event.participants || []), user];
        }
        await this.firestore.update(eventId, event);
        return { success: true };
    }
    async queue(eventId, userId, listId) {
        const event = await this.firestore.findOne(eventId);
        if (!event)
            throw new common_1.NotFoundException('Event not found');
        const user = { id: userId };
        if (listId) {
            const list = event.lists?.find((l) => l.id === listId);
            if (!list)
                throw new common_1.NotFoundException('List not found');
            const isAlreadyQueued = list.queue?.some((p) => p.id === userId);
            if (isAlreadyQueued)
                throw new common_1.BadRequestException('User already in list queue');
            list.queue = [...(list.queue || []), user];
        }
        else {
            const isAlreadyQueued = event.queue?.some((p) => p.id === userId);
            if (isAlreadyQueued)
                throw new common_1.BadRequestException('User already in queue');
            event.queue = [...(event.queue || []), user];
        }
        await this.firestore.update(eventId, event);
        return { success: true };
    }
    async unjoin(eventId, userId, listId) {
        const event = await this.firestore.findOne(eventId);
        if (!event)
            throw new common_1.NotFoundException('Event not found');
        if (listId) {
            const list = event.lists?.find((l) => l.id === listId);
            if (!list)
                throw new common_1.NotFoundException('List not found');
            list.participants = (list.participants || []).filter((p) => p.id !== userId);
        }
        else {
            event.participants = (event.participants || []).filter((p) => p.id !== userId);
        }
        await this.firestore.update(eventId, event);
        return { success: true };
    }
    async unqueue(eventId, userId, listId) {
        const event = await this.firestore.findOne(eventId);
        if (!event)
            throw new common_1.NotFoundException('Event not found');
        if (listId) {
            const list = event.lists?.find((l) => l.id === listId);
            if (!list)
                throw new common_1.NotFoundException('List not found');
            list.queue = (list.queue || []).filter((p) => p.id !== userId);
        }
        else {
            event.queue = (event.queue || []).filter((p) => p.id !== userId);
        }
        await this.firestore.update(eventId, event);
        return { success: true };
    }
};
exports.EventsService = EventsService;
exports.EventsService = EventsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('FIRESTORE_SERVICE')),
    __metadata("design:paramtypes", [firestore_service_1.FirestoreService])
], EventsService);
//# sourceMappingURL=events.service.js.map