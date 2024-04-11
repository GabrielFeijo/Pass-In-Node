import z from 'zod';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { generateSlug } from '../utils/generate-slug';
import { prisma } from '../lib/prisma';
import { FastifyInstance } from 'fastify';

export async function createEvent(app: FastifyInstance) {
	app.withTypeProvider<ZodTypeProvider>().post(
		'/events',
		{
			schema: {
				summary: 'Cria um evento',
				tags: ['Eventos'],
				body: z.object({
					title: z.string().min(4),
					details: z.string().optional(),
					maximumAttendees: z.number().int().nullable(),
				}),
				response: {
					201: z.object({
						event: z.object({
							id: z.string().regex(/^[0-9a-f]{24}$/),
							title: z.string(),
							slug: z.string(),
							details: z.string().nullable(),
							maximumAttendees: z.number().int().nullable(),
						}),
					}),
					409: z.string(),
				},
			},
		},
		async (request, reply) => {
			const data = request.body;

			const slug = generateSlug(data.title);

			const eventWithSameSlug = await prisma.event.findUnique({
				where: { slug },
			});

			if (eventWithSameSlug) {
				return reply.status(409).send('Event with same slug already exists');
			}

			const event = await prisma.event.create({
				data: { ...data, slug },
			});

			return reply.status(201).send({ event });
		}
	);
}
