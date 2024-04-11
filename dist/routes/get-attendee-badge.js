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
exports.getAttendeeBadge = void 0;
const zod_1 = __importDefault(require("zod"));
const prisma_1 = require("../lib/prisma");
function getAttendeeBadge(app) {
    return __awaiter(this, void 0, void 0, function* () {
        app.withTypeProvider().get('/attendees/:attendeeId/badge', {
            schema: {
                summary: 'Retorna o badge de um participante',
                tags: ['Participantes'],
                params: zod_1.default.object({ attendeeId: zod_1.default.string().regex(/^[0-9a-f]{24}$/) }),
                response: {
                    200: zod_1.default.object({
                        badge: zod_1.default.object({
                            name: zod_1.default.string(),
                            email: zod_1.default.string().email(),
                            eventTitle: zod_1.default.string(),
                            checkInURL: zod_1.default.string().url(),
                        }),
                    }),
                    404: zod_1.default.string(),
                },
            },
        }, (request, reply) => __awaiter(this, void 0, void 0, function* () {
            const { attendeeId } = request.params;
            const attendee = yield prisma_1.prisma.attendee.findUnique({
                select: {
                    name: true,
                    email: true,
                    event: { select: { title: true } },
                },
                where: { id: attendeeId },
            });
            if (!attendee) {
                return reply.status(404).send('Attendee not found');
            }
            const baseURL = `${request.protocol}://${request.hostname}`;
            const checkInURL = new URL(`/attendees/${attendeeId}/check-in`, baseURL);
            return reply.send({
                badge: {
                    name: attendee.name,
                    email: attendee.email,
                    eventTitle: attendee.event.title,
                    checkInURL: checkInURL.toString(),
                },
            });
        }));
    });
}
exports.getAttendeeBadge = getAttendeeBadge;
//# sourceMappingURL=get-attendee-badge.js.map