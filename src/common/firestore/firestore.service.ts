import { Injectable } from '@nestjs/common';
import { db } from './firestore.provider';
import { CollectionReference, DocumentData } from 'firebase-admin/firestore';

@Injectable()
export class FirestoreService<T extends DocumentData> {
  private collection: CollectionReference<T>;

  constructor(collectionName: string) {
    this.collection = db.collection(collectionName) as CollectionReference<T>;
  }

  async create(data: T) {
    const docRef = await this.collection.add(data);
    return { id: docRef.id, ...data };
  }

  async findAll() {
    const snapshot = await this.collection.get();
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  }

  async findOne(id: string) {
    const doc = await this.collection.doc(id).get();
    if (!doc.exists) return null;
    return { id: doc.id, ...doc.data() };
  }

  async update(id: string, data: Partial<T>) {
    await this.collection.doc(id).update(data);
    return { id, ...data };
  }

  async remove(id: string) {
    await this.collection.doc(id).delete();
    return { id };
  }
}
