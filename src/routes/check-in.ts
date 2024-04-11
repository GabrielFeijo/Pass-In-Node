import { FastifyInstance } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import z from 'zod';
import { prisma } from '../lib/prisma';

export async function checkIn(app: FastifyInstance) {
	app.withTypeProvider<ZodTypeProvider>().get(
		'/attendees/:attendeeId/check-in',
		{
			schema: {
				summary: 'Check-in de um participante',
				tags: ['Check-in'],
				params: z.object({ attendeeId: z.string().regex(/^[0-9a-f]{24}$/) }),
				response: { 201: z.null(), 409: z.string() },
			},
		},
		async (request, reply) => {
			const { attendeeId } = request.params;

			const attendeeCheckIn = await prisma.checkIn.findUnique({
				where: { attendeeId },
			});

			if (attendeeCheckIn) {
				return reply.status(409).send('Attendee already checked in');
			}

			await prisma.checkIn.create({
				data: {
					attendeeId,
				},
			});

			return reply.status(201).send();
		}
	);
}
