# Hotel Booking Platform

A multi-tenant hotel and B&B booking platform with customizable themes, built with Node.js and Express.

## Features

- Multi-tenant architecture for multiple properties
- Customizable themes using Liquid templates
- Booking management system
- Admin dashboard
- Theme marketplace
- Custom domain support

## Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Copy `.env.example` to `.env` and configure your environment variables
4. Run migrations: `npm run migrate`
5. Start the server: `npm run dev`

## Development

- `npm run dev` - Start development server
- `npm run migrate` - Run database migrations
- `npm run migrate:rollback` - Rollback migrations

## Deployment

This application is configured for deployment to DigitalOcean App Platform.

## License

MIT