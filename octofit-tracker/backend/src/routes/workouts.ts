import { Router, Request, Response } from 'express';
import { Workout } from '../models';

const router = Router();

// Get all workouts
router.get('/', async (req: Request, res: Response) => {
  try {
    const { difficulty, creator } = req.query;
    const filter: any = {};

    if (difficulty) filter.difficulty = difficulty;
    if (creator) filter.creator = creator;

    const workouts = await Workout.find(filter)
      .populate('creator', 'username email')
      .sort({ createdAt: -1 });

    res.json(workouts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch workouts' });
  }
});

// Get workout by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const workout = await Workout.findById(req.params.id).populate(
      'creator',
      'username email'
    );
    if (!workout) {
      return res.status(404).json({ error: 'Workout not found' });
    }
    res.json(workout);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch workout' });
  }
});

// Create new workout
router.post('/', async (req: Request, res: Response) => {
  try {
    const { title, description, difficulty, exercises, creator } = req.body;

    if (!title || !difficulty || !exercises || !creator) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const workout = new Workout({
      title,
      description,
      difficulty,
      exercises,
      creator
    });

    await workout.save();
    await workout.populate('creator', 'username email');

    res.status(201).json(workout);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create workout' });
  }
});

// Update workout
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { title, description, difficulty, exercises } = req.body;
    const workout = await Workout.findByIdAndUpdate(
      req.params.id,
      { title, description, difficulty, exercises },
      { new: true }
    ).populate('creator', 'username email');

    if (!workout) {
      return res.status(404).json({ error: 'Workout not found' });
    }
    res.json(workout);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update workout' });
  }
});

// Delete workout
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const workout = await Workout.findByIdAndDelete(req.params.id);
    if (!workout) {
      return res.status(404).json({ error: 'Workout not found' });
    }
    res.json({ message: 'Workout deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete workout' });
  }
});

export default router;
