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
exports.getEventAttendees = void 0;
const zod_1 = __importDefault(require("zod"));
const prisma_1 = require("../lib/prisma");
function getEventAttendees(app) {
    return __awaiter(this, void 0, void 0, function* () {
        app.withTypeProvider().get('/events/:slug/attendees', {
            schema: {
                summary: 'Lista os participantes de um evento',
                tags: ['Eventos'],
                params: zod_1.default.object({
                    slug: zod_1.default.string(),
                }),
                querystring: zod_1.default.object({
                    query: zod_1.default.string().nullish(),
                    pageIndex: zod_1.default.string().nullish().default('0').transform(Number),
                }),
                response: {
                    200: zod_1.default.object({
                        attendees: zod_1.default.array(zod_1.default.object({
                            id: zod_1.default.string().regex(/^[0-9a-f]{24}$/),
                            name: zod_1.default.string(),
                            email: zod_1.default.string().email(),
                            createdAt: zod_1.default.date(),
                            checkedInAt: zod_1.default.date().nullable(),
                        })),
                        total: zod_1.default.number(),
                    }),
                    404: zod_1.default.string(),
                },
            },
        }, (request, reply) => __awaiter(this, void 0, void 0, function* () {
            const { slug } = request.params;
            const { pageIndex, query } = request.query;
            const event = yield prisma_1.prisma.event.findUnique({
                where: { slug },
                select: { id: true },
            });
            if (!event) {
                return reply.status(404).send('Event not found');
            }
            const [attendees, total] = yield Promise.all([
                prisma_1.prisma.attendee.findMany({
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        createdAt: true,
                        checkIn: { select: { createdAt: true } },
                    },
                    where: { event, name: { contains: query || undefined } },
                    take: 10,
                    skip: pageIndex * 10,
                    orderBy: { createdAt: 'desc' },
                }),
                prisma_1.prisma.attendee.count({
                    where: { event, name: { contains: query || undefined } },
                }),
            ]);
            return reply.send({
                attendees: attendees.map((attendee) => {
                    var _a;
                    return ({
                        id: attendee.id,
                        name: attendee.name,
                        email: attendee.email,
                        createdAt: attendee.createdAt,
                        checkedInAt: ((_a = attendee.checkIn) === null || _a === void 0 ? void 0 : _a.createdAt) || null,
                    });
                }),
                total,
            });
        }));
    });
}
exports.getEventAttendees = getEventAttendees;
//# sourceMappingURL=get-event-attendees.js.map