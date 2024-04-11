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
exports.createEvent = void 0;
const zod_1 = __importDefault(require("zod"));
const generate_slug_1 = require("../utils/generate-slug");
const prisma_1 = require("../lib/prisma");
function createEvent(app) {
    return __awaiter(this, void 0, void 0, function* () {
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
        }, (request, reply) => __awaiter(this, void 0, void 0, function* () {
            const data = request.body;
            const slug = (0, generate_slug_1.generateSlug)(data.title);
            const eventWithSameSlug = yield prisma_1.prisma.event.findUnique({
                where: { slug },
            });
            if (eventWithSameSlug) {
                return reply.status(409).send('Event with same slug already exists');
            }
            const event = yield prisma_1.prisma.event.create({
                data: Object.assign(Object.assign({}, data), { title: data.title, slug }),
            });
            return reply.status(201).send({ event });
        }));
    });
}
exports.createEvent = createEvent;
//# sourceMappingURL=create-event.js.map