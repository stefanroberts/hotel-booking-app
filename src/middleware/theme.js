import { db } from '../db/index.js';

export const themeMiddleware = async (req, res, next) => {
  const host = req.get('host');
  try {
    const property = await db('properties')
      .where({ domain: host })
      .first();
    
    if (property) {
      req.property = property;
      req.theme = property.theme || 'default';
    }
    next();
  } catch (error) {
    next(error);
  }
};