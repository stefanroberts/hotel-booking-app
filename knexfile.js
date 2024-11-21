import 'dotenv/config';

const config = {
  client: process.env.NODE_ENV === 'production' ? 'pg' : 'better-sqlite3',
  connection: process.env.NODE_ENV === 'production' 
    ? process.env.DATABASE_URL 
    : {
        filename: './db/hotel.sqlite3'
      },
  migrations: {
    directory: './src/db/migrations'
  },
  pool: {
    min: 2,
    max: 10
  }
};

if (process.env.NODE_ENV === 'production') {
  config.pool = {
    min: 2,
    max: 10
  };
  config.ssl = { rejectUnauthorized: false };
}

export default config;