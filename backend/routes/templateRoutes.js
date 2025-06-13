import express from 'express';
import {
  getAllTemplates,
  addTemplate,
  deleteTemplate,
  updateTemplate,
} from '../controllers/templateController.js';

const router = express.Router();
router.get('/', getAllTemplates);
router.post('/', addTemplate);
router.delete('/:id', deleteTemplate);
router.put('/:id', updateTemplate);

export default router;
