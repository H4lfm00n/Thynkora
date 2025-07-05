import { Request, Response } from 'express';
import Idea, { IIdea } from '../models/Idea';

// Get all ideas
export const getAllIdeas = async (req: Request, res: Response) => {
  try {
    const { search, category, status, priority } = req.query;
    
    let query: any = {};
    
    // Search functionality
    if (search) {
      query.$text = { $search: search as string };
    }
    
    // Filter by category
    if (category) {
      query.category = category;
    }
    
    // Filter by status
    if (status) {
      query.status = status;
    }
    
    // Filter by priority
    if (priority) {
      query.priority = priority;
    }
    
    const ideas = await Idea.find(query).sort({ createdAt: -1 });
    res.json(ideas);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching ideas', error });
  }
};

// Get single idea by ID
export const getIdeaById = async (req: Request, res: Response) => {
  try {
    const idea = await Idea.findById(req.params.id);
    if (!idea) {
      return res.status(404).json({ message: 'Idea not found' });
    }
    res.json(idea);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching idea', error });
  }
};

// Create new idea
export const createIdea = async (req: Request, res: Response) => {
  try {
    const idea = new Idea(req.body);
    const savedIdea = await idea.save();
    res.status(201).json(savedIdea);
  } catch (error) {
    res.status(400).json({ message: 'Error creating idea', error });
  }
};

// Update idea
export const updateIdea = async (req: Request, res: Response) => {
  try {
    const idea = await Idea.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!idea) {
      return res.status(404).json({ message: 'Idea not found' });
    }
    res.json(idea);
  } catch (error) {
    res.status(400).json({ message: 'Error updating idea', error });
  }
};

// Delete idea
export const deleteIdea = async (req: Request, res: Response) => {
  try {
    const idea = await Idea.findByIdAndDelete(req.params.id);
    if (!idea) {
      return res.status(404).json({ message: 'Idea not found' });
    }
    res.json({ message: 'Idea deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting idea', error });
  }
}; 