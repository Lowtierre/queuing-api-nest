declare class PartecipantDto {
    id: string;
    listId?: string;
}
declare class ListItemDto {
    id: string;
    name: string;
    max: number;
    participants?: PartecipantDto[];
    queue?: PartecipantDto[];
}
export declare class CreateEventDto {
    name: string;
    location: string;
    date: string;
    time: string;
    maxParticipants?: number;
    creator: string;
    cover?: string;
    participants?: PartecipantDto[];
    queue?: PartecipantDto[];
    lists?: ListItemDto[];
}
export {};
