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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FirestoreService = void 0;
const common_1 = require("@nestjs/common");
const firestore_provider_1 = require("./firestore.provider");
let FirestoreService = class FirestoreService {
    collection;
    constructor(collectionName) {
        this.collection = firestore_provider_1.db.collection(collectionName);
    }
    async create(data) {
        const docRef = await this.collection.add(data);
        return { id: docRef.id, ...data };
    }
    async findAll() {
        const snapshot = await this.collection.get();
        return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    }
    async findOne(id) {
        const doc = await this.collection.doc(id).get();
        if (!doc.exists)
            return null;
        return { id: doc.id, ...doc.data() };
    }
    async update(id, data) {
        await this.collection.doc(id).update(data);
        return { id, ...data };
    }
    async remove(id) {
        await this.collection.doc(id).delete();
        return { id };
    }
};
exports.FirestoreService = FirestoreService;
exports.FirestoreService = FirestoreService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [String])
], FirestoreService);
//# sourceMappingURL=firestore.service.js.map