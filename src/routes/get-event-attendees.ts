import { FastifyInstance } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import z from 'zod';
import { prisma } from '../lib/prisma';

export async function getEventAttendees(app: FastifyInstance) {
	app.withTypeProvider<ZodTypeProvider>().get(
		'/events/:slug/attendees',
		{
			schema: {
				summary: 'Lista os participantes de um evento',
				tags: ['Eventos'],
				params: z.object({
					slug: z.string(),
				}),
				querystring: z.object({
					query: z.string().nullish(),
					pageIndex: z.string().nullish().default('0').transform(Number),
				}),
				response: {
					200: z.object({
						attendees: z.array(
							z.object({
								id: z.number(),
								name: z.string(),
								email: z.string().email(),
								createdAt: z.date(),
								checkedInAt: z.date().nullable(),
							})
						),
						total: z.number(),
					}),
					404: z.string(),
				},
			},
		},
		async (request, reply) => {
			const { slug } = request.params;
			const { pageIndex, query } = request.query;

			const event = await prisma.event.findUnique({
				where: { slug },
				select: { id: true },
			});

			if (!event) {
				return reply.status(404).send('Event not found');
			}

			const [attendees, total] = await Promise.all([
				prisma.attendee.findMany({
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
				prisma.attendee.count({
					where: { event, name: { contains: query || undefined } },
				}),
			]);
			return reply.send({
				attendees: attendees.map((attendee) => ({
					id: attendee.id,
					name: attendee.name,
					email: attendee.email,
					createdAt: attendee.createdAt,
					checkedInAt: attendee.checkIn?.createdAt || null,
				})),
				total,
			});
		}
	);
}
