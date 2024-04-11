"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkIn = void 0;
const zod_1 = __importDefault(require("zod"));
const prisma_1 = require("../lib/prisma");
async function checkIn(app) {
    app.withTypeProvider().get('/attendees/:attendeeId/check-in', {
        schema: {
            summary: 'Check-in de um participante',
            tags: ['Check-in'],
            params: zod_1.default.object({ attendeeId: zod_1.default.string().regex(/^[0-9a-f]{24}$/) }),
            response: { 201: zod_1.default.null(), 409: zod_1.default.string() },
        },
    }, async (request, reply) => {
        const { attendeeId } = request.params;
        const attendeeCheckIn = await prisma_1.prisma.checkIn.findUnique({
            where: { attendeeId },
        });
        if (attendeeCheckIn) {
            return reply.status(409).send('Attendee already checked in');
        }
        await prisma_1.prisma.checkIn.create({
            data: {
                attendeeId,
            },
        });
        return reply.status(201).send();
    });
}
exports.checkIn = checkIn;
//# sourceMappingURL=check-in.js.map