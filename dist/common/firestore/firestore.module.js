"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var FirestoreModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FirestoreModule = void 0;
const common_1 = require("@nestjs/common");
const firestore_service_1 = require("./firestore.service");
let FirestoreModule = FirestoreModule_1 = class FirestoreModule {
    static forCollection(collectionName) {
        const firestoreProvider = {
            provide: 'FIRESTORE_SERVICE',
            useFactory: () => new firestore_service_1.FirestoreService(collectionName),
        };
        return {
            module: FirestoreModule_1,
            providers: [firestoreProvider],
            exports: [firestoreProvider],
        };
    }
};
exports.FirestoreModule = FirestoreModule;
exports.FirestoreModule = FirestoreModule = FirestoreModule_1 = __decorate([
    (0, common_1.Module)({})
], FirestoreModule);
//# sourceMappingURL=firestore.module.js.map