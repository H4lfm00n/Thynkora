import express from 'express';
import {
  getAllIdeas,
  getIdeaById,
  createIdea,
  updateIdea,
  deleteIdea
} from '../controllers/ideaController';

const router = express.Router();

// GET /api/ideas - Get all ideas
router.get('/', getAllIdeas);

// GET /api/ideas/:id - Get single idea
router.get('/:id', getIdeaById);

// POST /api/ideas - Create new idea
router.post('/', createIdea);

// PUT /api/ideas/:id - Update idea
router.put('/:id', updateIdea);

// DELETE /api/ideas/:id - Delete idea
router.delete('/:id', deleteIdea);

export default router; 