import { FastifyInstance } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import z from 'zod';
import { prisma } from '../lib/prisma';

export async function getEvent(app: FastifyInstance) {
	app.withTypeProvider<ZodTypeProvider>().get(
		'/events/:eventId',
		{
			schema: {
				summary: 'Retorna um evento',
				tags: ['Eventos'],
				params: z.object({
					eventId: z.string().uuid(),
				}),
				response: {
					200: z.object({
						id: z.string().uuid(),
						title: z.string(),
						slug: z.string(),
						details: z.string().nullable(),
						maximumAttendees: z.number().int().positive().nullable(),
						attendeesAmount: z.number().int().positive(),
					}),
					404: z.string(),
				},
			},
		},
		async (request, reply) => {
			const { eventId } = request.params;

			const event = await prisma.event.findUnique({
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
		}
	);
}
