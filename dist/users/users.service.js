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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const firestore_service_1 = require("../common/firestore/firestore.service");
let UsersService = class UsersService {
    firestore;
    constructor(firestore) {
        this.firestore = firestore;
    }
    create(data) {
        return this.firestore.create(data);
    }
    findAll() {
        return this.firestore.findAll();
    }
    findOne(id) {
        return this.firestore.findOne(id);
    }
    update(id, data) {
        return this.firestore.update(id, data);
    }
    remove(id) {
        return this.firestore.remove(id);
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('FIRESTORE_SERVICE')),
    __metadata("design:paramtypes", [firestore_service_1.FirestoreService])
], UsersService);
//# sourceMappingURL=users.service.js.map