import { Router, Request, Response } from 'express';
import { Leaderboard } from '../models';

const router = Router();

// Get leaderboard
router.get('/', async (req: Request, res: Response) => {
  try {
    const { period = 'weekly', team, limit = 50 } = req.query;
    const filter: any = { period };

    if (team) filter.team = team;

    const leaderboard = await Leaderboard.find(filter)
      .populate('user', 'username email firstName lastName')
      .populate('team', 'name')
      .sort({ score: -1 })
      .limit(Number(limit));

    // Add rank
    const rankedLeaderboard = leaderboard.map((entry, index) => ({
      ...entry.toObject(),
      rank: index + 1
    }));

    res.json(rankedLeaderboard);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch leaderboard' });
  }
});

// Get user's leaderboard position
router.get('/user/:userId', async (req: Request, res: Response) => {
  try {
    const { period = 'weekly' } = req.query;

    const userEntry = await Leaderboard.findOne({
      user: req.params.userId,
      period
    })
      .populate('user', 'username email firstName lastName')
      .populate('team', 'name');

    if (!userEntry) {
      return res.status(404).json({ error: 'User not in leaderboard' });
    }

    const allEntries = await Leaderboard.find({ period })
      .sort({ score: -1 });

    const rank = allEntries.findIndex(
      (e) => e.user.toString() === req.params.userId
    ) + 1;

    res.json({
      ...userEntry.toObject(),
      rank
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user leaderboard position' });
  }
});

// Update leaderboard entry
router.post('/update', async (req: Request, res: Response) => {
  try {
    const { userId, period, score, activitiesCount, totalDuration, totalCalories } =
      req.body;

    if (!userId || !period) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const entry = await Leaderboard.findOneAndUpdate(
      { user: userId, period },
      {
        score,
        activitiesCount,
        totalDuration,
        totalCalories
      },
      { upsert: true, new: true }
    )
      .populate('user', 'username email')
      .populate('team', 'name');

    res.json(entry);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update leaderboard' });
  }
});

// Get team leaderboard
router.get('/team/:teamId', async (req: Request, res: Response) => {
  try {
    const { period = 'weekly', limit = 50 } = req.query;

    const teamLeaderboard = await Leaderboard.find({
      team: req.params.teamId,
      period
    })
      .populate('user', 'username email firstName lastName')
      .sort({ score: -1 })
      .limit(Number(limit));

    const rankedLeaderboard = teamLeaderboard.map((entry, index) => ({
      ...entry.toObject(),
      rank: index + 1
    }));

    res.json(rankedLeaderboard);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch team leaderboard' });
  }
});

export default router;
