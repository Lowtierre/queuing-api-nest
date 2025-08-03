type ListProps = {
  id: string;
  name: string;
  max: number;
  participants?: PartecipantProps[];
  queue?: PartecipantProps[];
};

type PartecipantProps = {
  id: string;
  listId: string;
};

type CoverProps = {};

export class Event {
  id: string;
  name: string;
  location: string;
  date: string;
  time: string;
  maxParticipants?: number;
  cover?: CoverProps;
  participants?: PartecipantProps[];
  queue?: PartecipantProps[];
  lists?: ListProps[];
  creator: string;
}
