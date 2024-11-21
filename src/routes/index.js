import express from 'express';
import propertyRoutes from './property.js';
import roomRoutes from './room.js';
import bookingRoutes from './booking.js';

const router = express.Router();

// Home route
router.get('/', (req, res) => {
  res.render('default/index', {
    page: {
      title: 'Welcome to Hotel Booking Platform'
    },
    property: {
      name: 'Sample Property',
      description: 'Welcome to our booking platform'
    },
    rooms: []
  });
});

router.use('/properties', propertyRoutes);
router.use('/rooms', roomRoutes);
router.use('/bookings', bookingRoutes);

export default router;