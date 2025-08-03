import { DynamicModule, Module, Provider } from '@nestjs/common';
import { FirestoreService } from './firestore.service';

@Module({})
export class FirestoreModule {
  static forCollection<T>(collectionName: string): DynamicModule {
    const firestoreProvider: Provider = {
      provide: 'FIRESTORE_SERVICE',
      useFactory: () => new FirestoreService<T>(collectionName),
    };

    return {
      module: FirestoreModule,
      providers: [firestoreProvider],
      exports: [firestoreProvider],
    };
  }
}
