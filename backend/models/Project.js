import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  techStack: [String],
}, {
  timestamps: true 
});

const Project = mongoose.model('Project', projectSchema);

export default Project;
