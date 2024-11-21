import express from 'express';
import { db } from '../../db/index.js';
import { body, validationResult } from 'express-validator';
import multer from 'multer';
import path from 'path';
import fs from 'fs/promises';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

// Theme editor
router.get('/editor/:themeId', async (req, res) => {
  try {
    const theme = await db('themes')
      .where({ id: req.params.themeId })
      .first();
    
    if (!theme) {
      return res.status(404).json({ error: 'Theme not found' });
    }

    res.render('admin/theme-editor', {
      theme,
      page: { title: `Editing ${theme.name}` }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Save theme changes
router.post('/editor/:themeId/save', async (req, res) => {
  try {
    const { files } = req.body;
    await db('themes')
      .where({ id: req.params.themeId })
      .update({ 
        files,
        updatedAt: new Date()
      });
    
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// List themes
router.get('/', async (req, res) => {
  try {
    const themes = await db('themes')
      .where({ authorId: req.user.id })
      .select('*');
    
    res.render('admin/themes', {
      themes,
      page: { title: 'My Themes' }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;