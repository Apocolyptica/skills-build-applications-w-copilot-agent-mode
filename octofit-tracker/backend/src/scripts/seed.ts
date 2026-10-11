import mongoose from 'mongoose';
import { connectDatabase } from '../config/database';
import Activity from '../models/activity';
import Leaderboard from '../models/leaderboard';
import Team from '../models/team';
import User from '../models/user';
import Workout from '../models/workout';

const seedKey = /^octofit-demo:/;

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase(): Promise<void> {
  try {
    await connectDatabase();

    await Leaderboard.deleteMany({ seedKey });
    await Activity.deleteMany({ seedKey });
    await Team.deleteMany({ seedKey });
    await User.deleteMany({ seedKey });
    await Workout.deleteMany({ seedKey });

    const users = await User.insertMany([
      {
        name: 'Avery Chen',
        username: 'avery-chen',
        email: 'avery.chen@example.com',
        bio: 'Trail runner building a consistent weekly routine.',
        seedKey: 'octofit-demo:user:avery',
      },
      {
        name: 'Jordan Rivera',
        username: 'jordan-rivera',
        email: 'jordan.rivera@example.com',
        bio: 'Cyclist who enjoys friendly team challenges.',
        seedKey: 'octofit-demo:user:jordan',
      },
      {
        name: 'Sam Patel',
        username: 'sam-patel',
        email: 'sam.patel@example.com',
        bio: 'Strength training and weekend hikes.',
        seedKey: 'octofit-demo:user:sam',
      },
    ]);

    const userByEmail = new Map(users.map((user) => [user.email, user]));
    const teams = await Team.insertMany([
      {
        name: 'Summit Seekers',
        description: 'A team focused on steady progress and outdoor miles.',
        members: [
          userByEmail.get('avery.chen@example.com')!._id,
          userByEmail.get('sam.patel@example.com')!._id,
        ],
        seedKey: 'octofit-demo:team:summit-seekers',
      },
      {
        name: 'Velocity Crew',
        description: 'A team that turns every ride into a shared goal.',
        members: [userByEmail.get('jordan.rivera@example.com')!._id],
        seedKey: 'octofit-demo:team:velocity-crew',
      },
    ]);

    const teamByName = new Map(teams.map((team) => [team.name, team]));
    const daysAgo = (days: number): Date => new Date(Date.now() - days * 24 * 60 * 60 * 1000);

    await Activity.insertMany([
      {
        user: userByEmail.get('avery.chen@example.com')!._id,
        team: teamByName.get('Summit Seekers')!._id,
        type: 'running',
        durationMinutes: 38,
        distanceKm: 5.2,
        calories: 410,
        performedAt: daysAgo(1),
        seedKey: 'octofit-demo:activity:avery-run',
      },
      {
        user: userByEmail.get('jordan.rivera@example.com')!._id,
        team: teamByName.get('Velocity Crew')!._id,
        type: 'cycling',
        durationMinutes: 55,
        distanceKm: 21.4,
        calories: 520,
        performedAt: daysAgo(2),
        seedKey: 'octofit-demo:activity:jordan-ride',
      },
      {
        user: userByEmail.get('sam.patel@example.com')!._id,
        team: teamByName.get('Summit Seekers')!._id,
        type: 'strength',
        durationMinutes: 42,
        calories: 290,
        performedAt: daysAgo(3),
        seedKey: 'octofit-demo:activity:sam-strength',
      },
    ]);

    await Leaderboard.insertMany([
      {
        user: userByEmail.get('avery.chen@example.com')!._id,
        team: teamByName.get('Summit Seekers')!._id,
        points: 420,
        seedKey: 'octofit-demo:leaderboard:avery',
      },
      {
        user: userByEmail.get('jordan.rivera@example.com')!._id,
        team: teamByName.get('Velocity Crew')!._id,
        points: 385,
        seedKey: 'octofit-demo:leaderboard:jordan',
      },
      {
        user: userByEmail.get('sam.patel@example.com')!._id,
        team: teamByName.get('Summit Seekers')!._id,
        points: 340,
        seedKey: 'octofit-demo:leaderboard:sam',
      },
    ]);

    await Workout.insertMany([
      {
        slug: 'steady-5k',
        name: 'Steady 5K',
        description: 'A conversational-paced run to build aerobic endurance.',
        activityType: 'running',
        difficulty: 'beginner',
        durationMinutes: 35,
        seedKey: 'octofit-demo:workout:steady-5k',
      },
      {
        slug: 'hill-intervals',
        name: 'Hill Intervals',
        description: 'Short uphill efforts with easy recovery between repeats.',
        activityType: 'running',
        difficulty: 'intermediate',
        durationMinutes: 40,
        seedKey: 'octofit-demo:workout:hill-intervals',
      },
      {
        slug: 'strength-circuit',
        name: 'Full-Body Strength Circuit',
        description: 'A balanced circuit using bodyweight and light resistance.',
        activityType: 'strength',
        difficulty: 'intermediate',
        durationMinutes: 30,
        seedKey: 'octofit-demo:workout:strength-circuit',
      },
      {
        slug: 'recovery-ride',
        name: 'Recovery Ride',
        description: 'An easy spin focused on relaxed cadence and recovery.',
        activityType: 'cycling',
        difficulty: 'beginner',
        durationMinutes: 45,
        seedKey: 'octofit-demo:workout:recovery-ride',
      },
    ]);

    console.log('Seed data created for users, teams, activities, leaderboard, and workouts.');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

void seedDatabase();
