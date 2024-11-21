import express from 'express';
import { db } from '../db/index.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { startDate, endDate, guestName, guestEmail, roomId } = req.body;
    
    // Check if room is available
    const conflictingBooking = await db('bookings')
      .where({ roomId })
      .where('startDate', '<=', endDate)
      .where('endDate', '>=', startDate)
      .first();
    
    if (conflictingBooking) {
      return res.status(400).json({ error: 'Room is not available for these dates' });
    }

    const [booking] = await db('bookings')
      .insert({
        startDate,
        endDate,
        guestName,
        guestEmail,
        roomId,
        propertyId: req.property.id
      })
      .returning('*');
    
    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const bookings = await db('bookings')
      .where({ propertyId: req.property.id })
      .select('*');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;