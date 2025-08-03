import { DynamicModule } from '@nestjs/common';
export declare class FirestoreModule {
    static forCollection<T>(collectionName: string): DynamicModule;
}
