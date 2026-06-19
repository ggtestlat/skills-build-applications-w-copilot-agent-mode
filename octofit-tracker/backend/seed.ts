import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { User, Team, Activity, Workout, Leaderboard } from './src/models';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

async function seedDatabase() {
  try {
    console.log('🌱 Starting OctoFit Database Seeding...\n');

    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB:', MONGODB_URI);

    // Clear existing data
    console.log('\n🧹 Clearing existing data...');
    await User.deleteMany({});
    await Team.deleteMany({});
    await Activity.deleteMany({});
    await Workout.deleteMany({});
    await Leaderboard.deleteMany({});
    console.log('✅ Database cleared');

    // Create sample users
    console.log('\n👥 Creating sample users...');
    const users = await User.create([
      {
        username: 'alex_runner',
        email: 'alex@example.com',
        passwordHash: 'hash123456',
        firstName: 'Alex',
        lastName: 'Runner'
      },
      {
        username: 'maya_cyclist',
        email: 'maya@example.com',
        passwordHash: 'hash234567',
        firstName: 'Maya',
        lastName: 'Cyclist'
      },
      {
        username: 'jordan_lifter',
        email: 'jordan@example.com',
        passwordHash: 'hash345678',
        firstName: 'Jordan',
        lastName: 'Lifter'
      },
      {
        username: 'sam_swimmer',
        email: 'sam@example.com',
        passwordHash: 'hash456789',
        firstName: 'Sam',
        lastName: 'Swimmer'
      },
      {
        username: 'casey_yogi',
        email: 'casey@example.com',
        passwordHash: 'hash567890',
        firstName: 'Casey',
        lastName: 'Yogi'
      }
    ]);
    console.log(`✅ Created ${users.length} users`);

    // Create sample teams
    console.log('\n👨‍👩‍👧‍👦 Creating sample teams...');
    const teams = await Team.create([
      {
        name: 'Morning Runners',
        description: 'Early risers who love running',
        owner: users[0]._id,
        members: [users[0]._id, users[1]._id, users[4]._id]
      },
      {
        name: 'Fitness Warriors',
        description: 'Dedicated gym enthusiasts',
        owner: users[2]._id,
        members: [users[2]._id, users[3]._id, users[0]._id]
      },
      {
        name: 'Outdoor Adventure Club',
        description: 'Trail running and cycling',
        owner: users[1]._id,
        members: [users[1]._id, users[3]._id, users[4]._id]
      }
    ]);
    console.log(`✅ Created ${teams.length} teams`);

    // Create sample workouts
    console.log('\n💪 Creating sample workouts...');
    const workouts = await Workout.create([
      {
        title: 'Full Body Strength',
        description: 'Complete full body workout with weights',
        difficulty: 'intermediate',
        creator: users[2]._id,
        exercises: [
          { name: 'Squats', sets: 4, reps: 8 },
          { name: 'Bench Press', sets: 4, reps: 8 },
          { name: 'Deadlifts', sets: 3, reps: 5 },
          { name: 'Pull-ups', sets: 3, reps: 10 }
        ]
      },
      {
        title: 'Morning Yoga Flow',
        description: 'Gentle yoga for flexibility and mindfulness',
        difficulty: 'beginner',
        creator: users[4]._id,
        exercises: [
          { name: 'Sun Salutation', sets: 5, reps: 1, duration: 15 },
          { name: 'Downward Dog', sets: 3, reps: 10 },
          { name: 'Warrior Pose', sets: 3, reps: 5 }
        ]
      },
      {
        title: 'HIIT Cardio Blast',
        description: 'High intensity interval training for cardio',
        difficulty: 'advanced',
        creator: users[0]._id,
        exercises: [
          { name: 'Burpees', sets: 5, reps: 10, duration: 1 },
          { name: 'Mountain Climbers', sets: 5, reps: 20, duration: 1 },
          { name: 'Jump Rope', sets: 5, reps: 50, duration: 2 }
        ]
      },
      {
        title: 'Beginner Running Program',
        description: 'Perfect for getting started with running',
        difficulty: 'beginner',
        creator: users[0]._id,
        exercises: [
          { name: 'Warm-up walk', sets: 1, reps: 1, duration: 5 },
          { name: 'Jogging intervals', sets: 8, reps: 1, duration: 3 },
          { name: 'Cool-down walk', sets: 1, reps: 1, duration: 5 }
        ]
      }
    ]);
    console.log(`✅ Created ${workouts.length} workouts`);

    // Create sample activities
    console.log('\n🏃 Creating sample activities...');
    const now = new Date();
    const activities = await Activity.create([
      // Alex's activities
      {
        user: users[0]._id,
        type: 'running',
        duration: 45,
        distance: 7.5,
        caloriesBurned: 580,
        notes: 'Morning run in the park',
        date: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000)
      },
      {
        user: users[0]._id,
        type: 'gym',
        duration: 60,
        caloriesBurned: 520,
        notes: 'Strength training session',
        date: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000)
      },
      // Maya's activities
      {
        user: users[1]._id,
        type: 'cycling',
        duration: 90,
        distance: 35.2,
        caloriesBurned: 750,
        notes: 'Long ride through countryside',
        date: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000)
      },
      {
        user: users[1]._id,
        type: 'cycling',
        duration: 45,
        distance: 18.5,
        caloriesBurned: 400,
        notes: 'Commute and recovery ride',
        date: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000)
      },
      // Jordan's activities
      {
        user: users[2]._id,
        type: 'gym',
        duration: 120,
        caloriesBurned: 900,
        notes: 'Intense full body workout',
        date: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000)
      },
      {
        user: users[2]._id,
        type: 'gym',
        duration: 90,
        caloriesBurned: 700,
        notes: 'Upper body focus',
        date: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000)
      },
      // Sam's activities
      {
        user: users[3]._id,
        type: 'swimming',
        duration: 60,
        distance: 1.5,
        caloriesBurned: 650,
        notes: 'Morning swim sessions',
        date: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000)
      },
      {
        user: users[3]._id,
        type: 'running',
        duration: 30,
        distance: 5.0,
        caloriesBurned: 380,
        notes: 'Evening jog',
        date: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000)
      },
      // Casey's activities
      {
        user: users[4]._id,
        type: 'yoga',
        duration: 45,
        caloriesBurned: 180,
        notes: 'Relaxing evening yoga',
        date: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000)
      },
      {
        user: users[4]._id,
        type: 'walking',
        duration: 60,
        distance: 4.2,
        caloriesBurned: 240,
        notes: 'Nature walk',
        date: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000)
      }
    ]);
    console.log(`✅ Created ${activities.length} activities`);

    // Calculate scores for leaderboard (based on activities)
    console.log('\n🏆 Creating leaderboard entries...');
    const leaderboardEntries = [];

    for (const user of users) {
      const userActivities = activities.filter((a) => a.user.toString() === user._id.toString());
      const totalDuration = userActivities.reduce((sum, a) => sum + a.duration, 0);
      const totalCalories = userActivities.reduce((sum, a) => sum + (a.caloriesBurned || 0), 0);

      // Calculate score: activities count (100 pts each) + duration (1 pt per min) + calories (0.5 pts each)
      const score =
        userActivities.length * 100 +
        totalDuration +
        totalCalories * 0.5;

      leaderboardEntries.push({
        user: user._id,
        period: 'weekly',
        score,
        activitiesCount: userActivities.length,
        totalDuration,
        totalCalories
      });

      // Also add to monthly and alltime
      leaderboardEntries.push({
        user: user._id,
        period: 'monthly',
        score: score * 1.2,
        activitiesCount: userActivities.length,
        totalDuration,
        totalCalories
      });

      leaderboardEntries.push({
        user: user._id,
        period: 'alltime',
        score: score * 2,
        activitiesCount: userActivities.length,
        totalDuration,
        totalCalories
      });
    }

    await Leaderboard.create(leaderboardEntries);
    console.log(`✅ Created ${leaderboardEntries.length} leaderboard entries`);

    // Summary
    console.log('\n' + '='.repeat(50));
    console.log('✨ Database seeding completed successfully!\n');
    console.log('📊 Summary:');
    console.log(`   Users:        ${users.length}`);
    console.log(`   Teams:        ${teams.length}`);
    console.log(`   Workouts:     ${workouts.length}`);
    console.log(`   Activities:   ${activities.length}`);
    console.log(`   Leaderboard:  ${leaderboardEntries.length}`);
    console.log('\n🎯 Sample Credentials:');
    users.forEach((user) => {
      console.log(`   - username: ${user.username}, email: ${user.email}`);
    });
    console.log('\n💾 Database: octofit_db');
    console.log('📍 Connection: ' + MONGODB_URI);
    console.log('='.repeat(50) + '\n');

    await mongoose.connection.close();
    console.log('✅ Database connection closed');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

// Run the seed
seedDatabase();
