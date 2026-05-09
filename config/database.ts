import path from 'path';

export default ({ env }: { env: (key: string, fallback?: unknown) => unknown }) => {
  const client = env('DATABASE_CLIENT', 'sqlite');

  const connections: Record<string, object> = {
    sqlite: {
      connection: {
        filename: path.join(__dirname, '..', env('DATABASE_FILENAME', '.tmp/data.db') as string),
      },
      useNullAsDefault: true,
    },
    postgres: {
      connection: {
        host: env('DATABASE_HOST', '127.0.0.1'),
        port: env('DATABASE_PORT', 5432),
        database: env('DATABASE_NAME', 'strapi'),
        user: env('DATABASE_USERNAME', 'strapi'),
        password: env('DATABASE_PASSWORD', ''),
        ssl: env('DATABASE_SSL', false) ? { rejectUnauthorized: false } : false,
      },
    },
  };

  return {
    connection: {
      client,
      ...connections[client as string],
      acquireConnectionTimeout: env('DATABASE_CONNECTION_TIMEOUT', 60000),
    },
  };
};
