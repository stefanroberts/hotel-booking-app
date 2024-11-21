import express from 'express';
import { db } from '../db/index.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const property = req.property || { name: 'Default Property' };
    const rooms = await db('rooms')
      .where({ propertyId: property.id })
      .select('*');

    res.render(`${req.theme}/index`, {
      property,
      rooms,
      page: {
        title: property.name,
        description: property.description
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;