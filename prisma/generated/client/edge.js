Object.defineProperty(exports, '__esModule', { value: true });

const {
	PrismaClientKnownRequestError,
	PrismaClientUnknownRequestError,
	PrismaClientRustPanicError,
	PrismaClientInitializationError,
	PrismaClientValidationError,
	NotFoundError,
	getPrismaClient,
	sqltag,
	empty,
	join,
	raw,
	Decimal,
	Debug,
	objectEnumValues,
	makeStrictEnum,
	Extensions,
	warnOnce,
	defineDmmfProperty,
	Public,
	getRuntime,
} = require('./runtime/edge.js');

const Prisma = {};

exports.Prisma = Prisma;
exports.$Enums = {};

/**
 * Prisma Client JS version: 5.12.0
 * Query Engine version: 473ed3124229e22d881cb7addf559799debae1ab
 */
Prisma.prismaVersion = {
	client: '5.12.0',
	engine: '473ed3124229e22d881cb7addf559799debae1ab',
};

Prisma.PrismaClientKnownRequestError = PrismaClientKnownRequestError;
Prisma.PrismaClientUnknownRequestError = PrismaClientUnknownRequestError;
Prisma.PrismaClientRustPanicError = PrismaClientRustPanicError;
Prisma.PrismaClientInitializationError = PrismaClientInitializationError;
Prisma.PrismaClientValidationError = PrismaClientValidationError;
Prisma.NotFoundError = NotFoundError;
Prisma.Decimal = Decimal;

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = sqltag;
Prisma.empty = empty;
Prisma.join = join;
Prisma.raw = raw;
Prisma.validator = Public.validator;

/**
 * Extensions
 */
Prisma.getExtensionContext = Extensions.getExtensionContext;
Prisma.defineExtension = Extensions.defineExtension;

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull;
Prisma.JsonNull = objectEnumValues.instances.JsonNull;
Prisma.AnyNull = objectEnumValues.instances.AnyNull;

Prisma.NullTypes = {
	DbNull: objectEnumValues.classes.DbNull,
	JsonNull: objectEnumValues.classes.JsonNull,
	AnyNull: objectEnumValues.classes.AnyNull,
};

/**
 * Enums
 */
exports.Prisma.EventScalarFieldEnum = {
	id: 'id',
	title: 'title',
	details: 'details',
	slug: 'slug',
	maximumAttendees: 'maximumAttendees',
};

exports.Prisma.AttendeeScalarFieldEnum = {
	id: 'id',
	name: 'name',
	email: 'email',
	createdAt: 'createdAt',
	eventId: 'eventId',
};

exports.Prisma.CheckInScalarFieldEnum = {
	id: 'id',
	createdAt: 'createdAt',
	attendeeId: 'attendeeId',
};

exports.Prisma.SortOrder = {
	asc: 'asc',
	desc: 'desc',
};

exports.Prisma.QueryMode = {
	default: 'default',
	insensitive: 'insensitive',
};

exports.Prisma.ModelName = {
	Event: 'Event',
	Attendee: 'Attendee',
	CheckIn: 'CheckIn',
};
/**
 * Create the Client
 */
const config = {
	generator: {
		name: 'client',
		provider: {
			fromEnvVar: null,
			value: 'prisma-client-js',
		},
		output: {
			value:
				'C:\\Users\\feijo\\Desktop\\Projetos-2024\\rocketseat\\server-node\\prisma\\generated\\client',
			fromEnvVar: null,
		},
		config: {
			engineType: 'library',
		},
		binaryTargets: [
			{
				fromEnvVar: null,
				value: 'windows',
				native: true,
			},
		],
		previewFeatures: [],
		isCustomOutput: true,
	},
	relativeEnvPaths: {
		rootEnvPath: '../../../.env',
		schemaEnvPath: '../../../.env',
	},
	relativePath: '../..',
	clientVersion: '5.12.0',
	engineVersion: '473ed3124229e22d881cb7addf559799debae1ab',
	datasourceNames: ['db'],
	activeProvider: 'mongodb',
	postinstall: false,
	inlineDatasources: {
		db: {
			url: {
				fromEnvVar: 'DATABASE_URL',
				value: null,
			},
		},
	},
	inlineSchema:
		'// This is your Prisma schema file,\n// learn more about it in the docs: https://pris.ly/d/prisma-schema\n\ngenerator client {\n  provider = "prisma-client-js"\n  output   = "./generated/client"\n}\n\ndatasource db {\n  provider = "mongodb"\n  url      = env("DATABASE_URL")\n}\n\nmodel Event {\n  id               String     @id @default(auto()) @map("_id") @db.ObjectId\n  title            String\n  details          String?\n  slug             String     @unique\n  maximumAttendees Int?       @map("maximum_attendees")\n  attendees        Attendee[]\n\n  @@map("events")\n}\n\nmodel Attendee {\n  id        String   @id @default(auto()) @map("_id") @db.ObjectId\n  name      String\n  email     String\n  createdAt DateTime @default(now()) @map("created_at")\n  eventId   String   @map("event_id") @db.ObjectId\n  event     Event    @relation(fields: [eventId], references: [id], onDelete: Cascade)\n  checkIn   CheckIn?\n\n  @@unique([eventId, email])\n  @@map("attendees")\n}\n\nmodel CheckIn {\n  id        String   @id @default(auto()) @map("_id") @db.ObjectId\n  createdAt DateTime @default(now()) @map("created_at")\n\n  attendee   Attendee @relation(fields: [attendeeId], references: [id], onDelete: Cascade)\n  attendeeId String   @unique @map("attendee_id") @db.ObjectId\n\n  @@map("check_ins")\n}\n',
	inlineSchemaHash:
		'edd6f7fa979b9ca2d96879c8c20896b056462ac3e362ce9495355a50d4a6c3d0',
	copyEngine: true,
};
config.dirname = '/';

config.runtimeDataModel = JSON.parse(
	'{"models":{"Event":{"dbName":"events","fields":[{"name":"id","dbName":"_id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":true,"isReadOnly":false,"hasDefaultValue":true,"type":"String","default":{"name":"auto","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"title","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"details","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"slug","kind":"scalar","isList":false,"isRequired":true,"isUnique":true,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"maximumAttendees","dbName":"maximum_attendees","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Int","isGenerated":false,"isUpdatedAt":false},{"name":"attendees","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Attendee","relationName":"AttendeeToEvent","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false}],"primaryKey":null,"uniqueFields":[],"uniqueIndexes":[],"isGenerated":false},"Attendee":{"dbName":"attendees","fields":[{"name":"id","dbName":"_id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":true,"isReadOnly":false,"hasDefaultValue":true,"type":"String","default":{"name":"auto","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"name","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"email","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"createdAt","dbName":"created_at","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"DateTime","default":{"name":"now","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"eventId","dbName":"event_id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"event","kind":"object","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Event","relationName":"AttendeeToEvent","relationFromFields":["eventId"],"relationToFields":["id"],"relationOnDelete":"Cascade","isGenerated":false,"isUpdatedAt":false},{"name":"checkIn","kind":"object","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"CheckIn","relationName":"AttendeeToCheckIn","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false}],"primaryKey":null,"uniqueFields":[["eventId","email"]],"uniqueIndexes":[{"name":null,"fields":["eventId","email"]}],"isGenerated":false},"CheckIn":{"dbName":"check_ins","fields":[{"name":"id","dbName":"_id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":true,"isReadOnly":false,"hasDefaultValue":true,"type":"String","default":{"name":"auto","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"createdAt","dbName":"created_at","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"DateTime","default":{"name":"now","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"attendee","kind":"object","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Attendee","relationName":"AttendeeToCheckIn","relationFromFields":["attendeeId"],"relationToFields":["id"],"relationOnDelete":"Cascade","isGenerated":false,"isUpdatedAt":false},{"name":"attendeeId","dbName":"attendee_id","kind":"scalar","isList":false,"isRequired":true,"isUnique":true,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false}],"primaryKey":null,"uniqueFields":[],"uniqueIndexes":[],"isGenerated":false}},"enums":{},"types":{}}'
);
defineDmmfProperty(exports.Prisma, config.runtimeDataModel);
config.engineWasm = undefined;

config.injectableEdgeEnv = () => ({
	parsed: {
		DATABASE_URL:
			(typeof globalThis !== 'undefined' && globalThis['DATABASE_URL']) ||
			(typeof process !== 'undefined' &&
				import.meta.env &&
				import.meta.env.DATABASE_URL) ||
			undefined,
	},
});

if (
	(typeof globalThis !== 'undefined' && globalThis['DEBUG']) ||
	(typeof process !== 'undefined' &&
		import.meta.env &&
		import.meta.env.DEBUG) ||
	undefined
) {
	Debug.enable(
		(typeof globalThis !== 'undefined' && globalThis['DEBUG']) ||
			(typeof process !== 'undefined' &&
				import.meta.env &&
				import.meta.env.DEBUG) ||
			undefined
	);
}

const PrismaClient = getPrismaClient(config);
exports.PrismaClient = PrismaClient;
Object.assign(exports, Prisma);
