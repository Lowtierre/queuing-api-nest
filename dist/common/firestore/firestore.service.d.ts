import { DocumentData } from 'firebase-admin/firestore';
export declare class FirestoreService<T extends DocumentData> {
    private collection;
    constructor(collectionName: string);
    create(data: T): Promise<{
        id: string;
    } & T>;
    findAll(): Promise<({
        id: string;
    } & T)[]>;
    findOne(id: string): Promise<{
        id: string;
    } & T>;
    update(id: string, data: Partial<T>): Promise<{
        id: string;
    } & Partial<T>>;
    remove(id: string): Promise<{
        id: string;
    }>;
}
