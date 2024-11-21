import express from 'express';
import themeRoutes from './theme.js';
import domainRoutes from './domain.js';
import propertyRoutes from './property.js';
import { requireAuth, requireAdmin } from '../../middleware/auth.js';

const router = express.Router();

// Require authentication for all admin routes
router.use(requireAuth);

// Admin dashboard
router.get('/dashboard', async (req, res) => {
  try {
    res.render('admin/dashboard', {
      page: { title: 'Admin Dashboard' },
      user: req.user
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.use('/themes', themeRoutes);
router.use('/domains', domainRoutes);
router.use('/properties', propertyRoutes);

export default router;