"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const fastify_type_provider_zod_1 = require("fastify-type-provider-zod");
const create_event_1 = require("./routes/create-event");
const register_for_event_1 = require("./routes/register-for-event");
const get_event_1 = require("./routes/get-event");
const get_attendee_badge_1 = require("./routes/get-attendee-badge");
const check_in_1 = require("./routes/check-in");
const get_event_attendees_1 = require("./routes/get-event-attendees");
const swagger_1 = __importDefault(require("@fastify/swagger"));
const swagger_ui_1 = __importDefault(require("@fastify/swagger-ui"));
const cors_1 = __importDefault(require("@fastify/cors"));
const get_events_1 = require("./routes/get-events");
const app = (0, fastify_1.default)();
app.register(cors_1.default, {
    origin: '*',
});
app.register(swagger_1.default, {
    swagger: {
        consumes: ['application/json'],
        produces: ['application/json'],
        info: {
            title: 'pass.in',
            description: 'Especificações da API para o back-end da aplicação pass.in construída durante o NlW Unite',
            version: '1.0.0',
        },
    },
    transform: fastify_type_provider_zod_1.jsonSchemaTransform,
});
app.register(swagger_ui_1.default, {
    routePrefix: '/docs',
});
app.setValidatorCompiler(fastify_type_provider_zod_1.validatorCompiler);
app.setSerializerCompiler(fastify_type_provider_zod_1.serializerCompiler);
app.register(create_event_1.createEvent);
app.register(register_for_event_1.registerForEvent);
app.register(get_event_1.getEvent);
app.register(get_events_1.getEvents);
app.register(get_attendee_badge_1.getAttendeeBadge);
app.register(check_in_1.checkIn);
app.register(get_event_attendees_1.getEventAttendees);
app.listen({ port: 3333, host: '0.0.0.0' }).then(() => {
    console.log('Server running on port 3333');
});
//# sourceMappingURL=server.js.map