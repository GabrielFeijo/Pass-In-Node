"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEvent = void 0;
const zod_1 = __importDefault(require("zod"));
const generate_slug_1 = require("../utils/generate-slug");
const prisma_1 = require("../lib/prisma");
async function createEvent(app) {
    app.withTypeProvider().post('/events', {
        schema: {
            summary: 'Cria um evento',
            tags: ['Eventos'],
            body: zod_1.default.object({
                title: zod_1.default.string().min(4),
                details: zod_1.default.string().optional(),
                maximumAttendees: zod_1.default.number().int().nullable(),
            }),
            response: {
                201: zod_1.default.object({
                    event: zod_1.default.object({
                        id: zod_1.default.string().regex(/^[0-9a-f]{24}$/),
                        title: zod_1.default.string(),
                        slug: zod_1.default.string(),
                        details: zod_1.default.string().nullable(),
                        maximumAttendees: zod_1.default.number().int().nullable(),
                    }),
                }),
                409: zod_1.default.string(),
            },
        },
    }, async (request, reply) => {
        const data = request.body;
        const slug = (0, generate_slug_1.generateSlug)(data.title);
        const eventWithSameSlug = await prisma_1.prisma.event.findUnique({
            where: { slug },
        });
        if (eventWithSameSlug) {
            return reply.status(409).send('Event with same slug already exists');
        }
        const event = await prisma_1.prisma.event.create({
            data: { ...data, title: data.title, slug },
        });
        return reply.status(201).send({ event });
    });
}
exports.createEvent = createEvent;
//# sourceMappingURL=create-event.js.map