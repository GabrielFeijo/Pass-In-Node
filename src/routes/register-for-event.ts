import { FastifyInstance } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import z from 'zod';
import { prisma } from '../lib/prisma';

export async function registerForEvent(app: FastifyInstance) {
	app.withTypeProvider<ZodTypeProvider>().post(
		'/events/:eventId/attendees',
		{
			schema: {
				summary: 'Inscreve-se em um evento',
				tags: ['Participantes'],
				body: z.object({
					name: z.string().min(4),
					email: z.string().email(),
				}),
				params: z.object({
					eventId: z.string().uuid(),
				}),
				response: {
					201: z.object({
						attendeeId: z.number(),
					}),
					409: z.string(),
				},
			},
		},
		async (request, reply) => {
			const { eventId } = request.params;
			const { name, email } = request.body;

			const attendeeFromEmail = await prisma.attendee.findUnique({
				where: { eventId_email: { eventId, email } },
			});

			if (attendeeFromEmail) {
				return reply.status(409).send('Attendee already registered');
			}

			const [event, amountOfAttendeesForEvent] = await Promise.all([
				prisma.event.findUnique({
					where: { id: eventId },
				}),

				prisma.attendee.count({
					where: { eventId },
				}),
			]);

			if (
				event?.maximumAttendees &&
				amountOfAttendeesForEvent > event?.maximumAttendees
			) {
				throw new Error('Event is full');
			}

			const attendees = await prisma.attendee.create({
				data: {
					name,
					email,
					eventId,
				},
			});

			return reply.status(201).send({ attendeeId: attendees.id });
		}
	);
}
