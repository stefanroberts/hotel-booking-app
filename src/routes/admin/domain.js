import express from 'express';
import { db } from '../../db/index.js';
import { body, validationResult } from 'express-validator';

const router = express.Router();

// List domains
router.get('/', async (req, res) => {
  try {
    const properties = await db('properties')
      .where({ userId: req.user.id })
      .select('id', 'name', 'domain', 'customDomain', 'customDomainVerified');
    
    res.render('admin/domains', {
      properties,
      page: { title: 'Domain Management' }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update custom domain
router.post('/update', [
  body('propertyId').isUUID(),
  body('customDomain').isString().trim().notEmpty()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { propertyId, customDomain } = req.body;
    
    await db('properties')
      .where({ id: propertyId, userId: req.user.id })
      .update({
        customDomain,
        customDomainVerified: false
      });
    
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;