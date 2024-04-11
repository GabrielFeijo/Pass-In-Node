"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkIn = void 0;
const zod_1 = __importDefault(require("zod"));
const prisma_1 = require("../lib/prisma");
function checkIn(app) {
    return __awaiter(this, void 0, void 0, function* () {
        app.withTypeProvider().get('/attendees/:attendeeId/check-in', {
            schema: {
                summary: 'Check-in de um participante',
                tags: ['Check-in'],
                params: zod_1.default.object({ attendeeId: zod_1.default.string().regex(/^[0-9a-f]{24}$/) }),
                response: { 201: zod_1.default.null(), 409: zod_1.default.string() },
            },
        }, (request, reply) => __awaiter(this, void 0, void 0, function* () {
            const { attendeeId } = request.params;
            const attendeeCheckIn = yield prisma_1.prisma.checkIn.findUnique({
                where: { attendeeId },
            });
            if (attendeeCheckIn) {
                return reply.status(409).send('Attendee already checked in');
            }
            yield prisma_1.prisma.checkIn.create({
                data: {
                    attendeeId,
                },
            });
            return reply.status(201).send();
        }));
    });
}
exports.checkIn = checkIn;
//# sourceMappingURL=check-in.js.map