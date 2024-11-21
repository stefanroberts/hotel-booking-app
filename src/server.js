import express from 'express';
import { Liquid } from 'liquidjs';
import session from 'express-session';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import morgan from 'morgan';
import connectPgSimple from 'connect-pg-simple';
import { themeMiddleware } from './middleware/theme.js';
import routes from './routes/index.js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PostgresqlStore = connectPgSimple(session);

// Basic middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session configuration
app.use(session({
  store: process.env.NODE_ENV === 'production' 
    ? new PostgresqlStore({
        conObject: {
          connectionString: process.env.DATABASE_URL,
          ssl: { rejectUnauthorized: false }
        }
      })
    : null,
  secret: process.env.SESSION_SECRET || 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

// Setup Liquid template engine
const engine = new Liquid({
  root: path.join(__dirname, 'themes'),
  extname: '.liquid',
  cache: process.env.NODE_ENV === 'production'
});

// Setup liquid engine
app.engine('liquid', engine.express());
app.set('views', path.join(__dirname, 'themes'));
app.set('view engine', 'liquid');

// Serve static files
app.use('/assets', express.static(path.join(__dirname, 'themes/assets')));

// Theme middleware
app.use(themeMiddleware);

// Routes
app.use('/', routes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Default route for undefined paths
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});