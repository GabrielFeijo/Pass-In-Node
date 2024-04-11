"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../src/lib/prisma");
const faker_1 = require("@faker-js/faker");
const dayjs_1 = __importDefault(require("dayjs"));
async function seed() {
    const eventId = faker_1.faker.database.mongodbObjectId();
    await prisma_1.prisma.event.deleteMany();
    await prisma_1.prisma.event.create({
        data: {
            id: eventId,
            title: 'Unite Summit',
            slug: 'unite-summit',
            details: 'Um evento p/ devs apaixonados(as) por código!',
            maximumAttendees: 120,
        },
    });
    const attendeesToInsert = [];
    for (let i = 0; i <= 120; i++) {
        attendeesToInsert.push({
            id: faker_1.faker.database.mongodbObjectId(),
            name: faker_1.faker.person.fullName(),
            email: faker_1.faker.internet.email(),
            eventId,
            createdAt: faker_1.faker.date.recent({
                days: 30,
                refDate: (0, dayjs_1.default)().subtract(8, 'days').toDate(),
            }),
            checkIn: faker_1.faker.helpers.arrayElement([
                undefined,
                {
                    create: {
                        createdAt: faker_1.faker.date.recent({ days: 7 }),
                    },
                },
            ]),
        });
    }
    await Promise.all(attendeesToInsert.map((data) => {
        return prisma_1.prisma.attendee.create({
            data,
        });
    }));
}
seed().then(() => {
    console.log('Database seeded!');
    prisma_1.prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map