import mongoose, { Document, Schema } from 'mongoose';

export interface IIdea extends Document {
  title: string;
  description: string;
  category?: string;
  tags?: string[];
  priority: 'low' | 'medium' | 'high';
  status: 'draft' | 'in-progress' | 'completed' | 'archived';
  createdAt: Date;
  updatedAt: Date;
}

const IdeaSchema = new Schema<IIdea>({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    trim: true,
    default: 'general'
  },
  tags: [{
    type: String,
    trim: true
  }],
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  status: {
    type: String,
    enum: ['draft', 'in-progress', 'completed', 'archived'],
    default: 'draft'
  }
}, {
  timestamps: true
});

// Create text index for search functionality
IdeaSchema.index({ title: 'text', description: 'text', tags: 'text' });

export default mongoose.model<IIdea>('Idea', IdeaSchema); 