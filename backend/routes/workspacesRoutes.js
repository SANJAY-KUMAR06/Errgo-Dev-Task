import express from 'express';
import {
  getAllWorkspaces,
  addWorkspace,
  deleteWorkspace,
  updateWorkspace
} from '../controllers/workspaceController.js';

const router = express.Router();
router.get('/', getAllWorkspaces);
router.post('/', addWorkspace);
router.delete('/:id', deleteWorkspace);
router.put('/:id', updateWorkspace);

export default router;
