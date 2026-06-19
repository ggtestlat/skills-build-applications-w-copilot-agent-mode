import { Router, Request, Response } from 'express';
import { Activity } from '../models';

const router = Router();

// Get all activities
router.get('/', async (req: Request, res: Response) => {
  try {
    const { userId, type, limit = 50, skip = 0 } = req.query;
    const filter: any = {};

    if (userId) filter.user = userId;
    if (type) filter.type = type;

    const activities = await Activity.find(filter)
      .populate('user', 'username email')
      .sort({ date: -1 })
      .limit(Number(limit))
      .skip(Number(skip));

    res.json(activities);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch activities' });
  }
});

// Get activity by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const activity = await Activity.findById(req.params.id).populate(
      'user',
      'username email'
    );
    if (!activity) {
      return res.status(404).json({ error: 'Activity not found' });
    }
    res.json(activity);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch activity' });
  }
});

// Create new activity
router.post('/', async (req: Request, res: Response) => {
  try {
    const { user, type, duration, distance, caloriesBurned, notes, date } =
      req.body;

    if (!user || !type || !duration) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const activity = new Activity({
      user,
      type,
      duration,
      distance,
      caloriesBurned,
      notes,
      date: date || new Date()
    });

    await activity.save();
    await activity.populate('user', 'username email');

    res.status(201).json(activity);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create activity' });
  }
});

// Update activity
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { duration, distance, caloriesBurned, notes } = req.body;
    const activity = await Activity.findByIdAndUpdate(
      req.params.id,
      { duration, distance, caloriesBurned, notes },
      { new: true }
    ).populate('user', 'username email');

    if (!activity) {
      return res.status(404).json({ error: 'Activity not found' });
    }
    res.json(activity);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update activity' });
  }
});

// Delete activity
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const activity = await Activity.findByIdAndDelete(req.params.id);
    if (!activity) {
      return res.status(404).json({ error: 'Activity not found' });
    }
    res.json({ message: 'Activity deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete activity' });
  }
});

// Get user statistics
router.get('/stats/:userId', async (req: Request, res: Response) => {
  try {
    const activities = await Activity.find({ user: req.params.userId });

    type ActivityTypeCount = {
      [key in 'running' | 'cycling' | 'swimming' | 'gym' | 'yoga' | 'walking' | 'other']?: number;
    };

    const activityTypes: ActivityTypeCount = {};

    const stats = {
      totalActivities: activities.length,
      totalDuration: activities.reduce((sum, a) => sum + a.duration, 0),
      totalCalories: activities.reduce((sum, a) => sum + (a.caloriesBurned || 0), 0),
      totalDistance: activities.reduce((sum, a) => sum + (a.distance || 0), 0),
      activityTypes
    };

    activities.forEach((activity) => {
      const actType = activity.type as keyof ActivityTypeCount;
      if (!stats.activityTypes[actType]) {
        stats.activityTypes[actType] = 0;
      }
      stats.activityTypes[actType]!++;
    });

    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch statistics' });
  }
});

export default router;
