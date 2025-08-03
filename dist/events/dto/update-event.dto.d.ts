import { CreateEventDto } from './create-event.dto';
declare class ParticipantDto {
    id: string;
    listId: string;
}
declare const UpdateEventDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateEventDto>>;
export declare class UpdateEventDto extends UpdateEventDto_base {
    participants?: ParticipantDto[];
    queue?: ParticipantDto[];
}
export {};
