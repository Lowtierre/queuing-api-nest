import {
  IsString,
  IsOptional,
  IsNumber,
  MaxLength,
  MinLength,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class PartecipantDto {
  @IsString()
  id: string;

  @IsString()
  @IsOptional()
  listId?: string;
}

class ListItemDto {
  @IsString()
  id: string;

  @IsString()
  @MinLength(1)
  name: string;

  @IsNumber()
  max: number;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PartecipantDto)
  participants?: PartecipantDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PartecipantDto)
  queue?: PartecipantDto[];
}

export class CreateEventDto {
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  name: string;

  @IsString()
  @MinLength(3)
  @MaxLength(100)
  location: string;

  @IsString()
  date: string;

  @IsString()
  time: string;

  @IsOptional()
  @IsNumber()
  maxParticipants?: number;

  @IsString()
  creator: string;

  @IsOptional()
  @IsString()
  cover?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PartecipantDto)
  participants?: PartecipantDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PartecipantDto)
  queue?: PartecipantDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ListItemDto)
  lists?: ListItemDto[];
}
