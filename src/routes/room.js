import express from 'express';
import { db } from '../db/index.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const rooms = await db('rooms')
      .where({ propertyId: req.property.id })
      .select('*');
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { name, description, price } = req.body;
    const [room] = await db('rooms')
      .insert({
        name,
        description,
        price,
        propertyId: req.property.id
      })
      .returning('*');
    res.status(201).json(room);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;