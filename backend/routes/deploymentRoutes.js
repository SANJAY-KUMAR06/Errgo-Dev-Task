import express from 'express';
import {
  createDeployment,
  getDeployments,
  updateDeployment
} from '../controllers/deploymentController.js';

const router = express.Router();

router.get('/', getDeployments);
router.post('/', createDeployment);
router.put('/:id', updateDeployment); 

export default router;
