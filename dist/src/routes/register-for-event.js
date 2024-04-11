"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerForEvent = void 0;
const zod_1 = __importDefault(require("zod"));
const prisma_1 = require("../lib/prisma");
async function registerForEvent(app) {
    app.withTypeProvider().post('/events/:eventId/attendees', {
        schema: {
            summary: 'Inscreve-se em um evento',
            tags: ['Participantes'],
            body: zod_1.default.object({
                name: zod_1.default.string().min(4),
                email: zod_1.default.string().email(),
            }),
            params: zod_1.default.object({
                eventId: zod_1.default.string().regex(/^[0-9a-f]{24}$/),
            }),
            response: {
                201: zod_1.default.object({
                    attendeeId: zod_1.default.string().regex(/^[0-9a-f]{24}$/),
                }),
                409: zod_1.default.string(),
            },
        },
    }, async (request, reply) => {
        const { eventId } = request.params;
        const { name, email } = request.body;
        const attendeeFromEmail = await prisma_1.prisma.attendee.findUnique({
            where: { eventId_email: { eventId, email } },
        });
        if (attendeeFromEmail) {
            return reply.status(409).send('Attendee already registered');
        }
        const [event, amountOfAttendeesForEvent] = await Promise.all([
            prisma_1.prisma.event.findUnique({
                where: { id: eventId },
            }),
            prisma_1.prisma.attendee.count({
                where: { eventId },
            }),
        ]);
        if (event?.maximumAttendees &&
            amountOfAttendeesForEvent > event?.maximumAttendees) {
            throw new Error('Event is full');
        }
        const attendees = await prisma_1.prisma.attendee.create({
            data: {
                name,
                email,
                eventId,
            },
        });
        return reply.status(201).send({ attendeeId: attendees.id });
    });
}
exports.registerForEvent = registerForEvent;
//# sourceMappingURL=register-for-event.js.map