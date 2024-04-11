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
exports.getEvent = void 0;
const zod_1 = __importDefault(require("zod"));
const prisma_1 = require("../lib/prisma");
function getEvent(app) {
    return __awaiter(this, void 0, void 0, function* () {
        app.withTypeProvider().get('/events/:eventId', {
            schema: {
                summary: 'Retorna um evento',
                tags: ['Eventos'],
                params: zod_1.default.object({
                    eventId: zod_1.default.string().regex(/^[0-9a-f]{24}$/),
                }),
                response: {
                    200: zod_1.default.object({
                        id: zod_1.default.string().regex(/^[0-9a-f]{24}$/),
                        title: zod_1.default.string(),
                        slug: zod_1.default.string(),
                        details: zod_1.default.string().nullable(),
                        maximumAttendees: zod_1.default.number().int().positive().nullable(),
                        attendeesAmount: zod_1.default.number().int().positive(),
                    }),
                    404: zod_1.default.string(),
                },
            },
        }, (request, reply) => __awaiter(this, void 0, void 0, function* () {
            const { eventId } = request.params;
            const event = yield prisma_1.prisma.event.findUnique({
                select: {
                    id: true,
                    title: true,
                    slug: true,
                    details: true,
                    maximumAttendees: true,
                    _count: { select: { attendees: true } },
                },
                where: { id: eventId },
            });
            if (!event) {
                return reply.status(404).send('Event not found');
            }
            return reply.send({
                id: event.id,
                slug: event.slug,
                title: event.title,
                details: event.details,
                maximumAttendees: event.maximumAttendees,
                attendeesAmount: event._count.attendees,
            });
        }));
    });
}
exports.getEvent = getEvent;
//# sourceMappingURL=get-event.js.map