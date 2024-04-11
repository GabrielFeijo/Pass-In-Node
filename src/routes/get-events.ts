import { FastifyInstance } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import z from 'zod';
import { prisma } from '../lib/prisma';

export async function getEvents(app: FastifyInstance) {
	app.withTypeProvider<ZodTypeProvider>().get(
		'/events',
		{
			schema: {
				summary: 'Retorna todos eventos',
				tags: ['Eventos'],
				response: {
					200: z.object({
						events: z.array(
							z.object({
								id: z.string().uuid(),
								title: z.string(),
								slug: z.string(),
								details: z.string().nullable(),
								maximumAttendees: z.number().int().nullable(),
								attendeesAmount: z.number().int(),
							})
						),
					}),

					404: z.string(),
				},
			},
		},
		async (request, reply) => {
			const events = await prisma.event.findMany({
				select: {
					id: true,
					title: true,
					slug: true,
					details: true,
					maximumAttendees: true,
					_count: { select: { attendees: true } },
				},
			});

			return reply.send({
				events: events.map((event) => ({
					id: event.id,
					slug: event.slug,
					title: event.title,
					details: event.details,
					maximumAttendees: event.maximumAttendees,
					attendeesAmount: event._count.attendees,
				})),
			});
		}
	);
}
