# OctoFit Tracker API Documentation

Base URL: `http://localhost:8000/api` (local) or `https://{CODESPACE_NAME}-8000.app.github.dev/api` (Codespaces)

## Health Check

### GET /health
Check API server status.

```bash
curl http://localhost:8000/api/health
```

Response:
```json
{
  "status": "OK",
  "timestamp": "2024-06-19T08:00:00.000Z",
  "port": 8000,
  "codespace": "local or https://..."
}
```

---

## Users

### GET /users
Get all users.

```bash
curl http://localhost:8000/api/users
```

### GET /users/:id
Get user by ID.

```bash
curl http://localhost:8000/api/users/{userId}
```

### POST /users
Create a new user.

```bash
curl -X POST http://localhost:8000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "username": "johndoe",
    "email": "john@example.com",
    "passwordHash": "hashedpassword123",
    "firstName": "John",
    "lastName": "Doe"
  }'
```

### PUT /users/:id
Update user (firstName, lastName).

```bash
curl -X PUT http://localhost:8000/api/users/{userId} \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Jane",
    "lastName": "Smith"
  }'
```

### DELETE /users/:id
Delete user.

```bash
curl -X DELETE http://localhost:8000/api/users/{userId}
```

---

## Teams

### GET /teams
Get all teams.

```bash
curl http://localhost:8000/api/teams
```

### GET /teams/:id
Get team by ID.

```bash
curl http://localhost:8000/api/teams/{teamId}
```

### POST /teams
Create a new team.

```bash
curl -X POST http://localhost:8000/api/teams \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Fitness Squad",
    "description": "A team of fitness enthusiasts",
    "owner": "{userId}"
  }'
```

### POST /teams/:id/members
Add member to team.

```bash
curl -X POST http://localhost:8000/api/teams/{teamId}/members \
  -H "Content-Type: application/json" \
  -d '{
    "memberId": "{newMemberId}"
  }'
```

### DELETE /teams/:id/members/:memberId
Remove member from team.

```bash
curl -X DELETE http://localhost:8000/api/teams/{teamId}/members/{memberId}
```

### PUT /teams/:id
Update team (name, description).

```bash
curl -X PUT http://localhost:8000/api/teams/{teamId} \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Updated Team Name",
    "description": "Updated description"
  }'
```

### DELETE /teams/:id
Delete team.

```bash
curl -X DELETE http://localhost:8000/api/teams/{teamId}
```

---

## Activities

### GET /activities
Get all activities with optional filters.

Query parameters:
- `userId`: Filter by user
- `type`: Filter by activity type (running, cycling, swimming, gym, yoga, walking, other)
- `limit`: Number of results (default: 50)
- `skip`: Pagination offset (default: 0)

```bash
curl "http://localhost:8000/api/activities?userId={userId}&type=running&limit=10"
```

### GET /activities/:id
Get activity by ID.

```bash
curl http://localhost:8000/api/activities/{activityId}
```

### POST /activities
Create a new activity.

```bash
curl -X POST http://localhost:8000/api/activities \
  -H "Content-Type: application/json" \
  -d '{
    "user": "{userId}",
    "type": "running",
    "duration": 30,
    "distance": 5.2,
    "caloriesBurned": 350,
    "notes": "Morning jog in the park",
    "date": "2024-06-19T08:00:00Z"
  }'
```

### PUT /activities/:id
Update activity.

```bash
curl -X PUT http://localhost:8000/api/activities/{activityId} \
  -H "Content-Type: application/json" \
  -d '{
    "duration": 45,
    "caloriesBurned": 400,
    "notes": "Updated notes"
  }'
```

### DELETE /activities/:id
Delete activity.

```bash
curl -X DELETE http://localhost:8000/api/activities/{activityId}
```

### GET /activities/stats/:userId
Get user activity statistics.

```bash
curl http://localhost:8000/api/activities/stats/{userId}
```

Response:
```json
{
  "totalActivities": 10,
  "totalDuration": 300,
  "totalCalories": 2500,
  "totalDistance": 35.5,
  "activityTypes": {
    "running": 5,
    "cycling": 3,
    "gym": 2
  }
}
```

---

## Workouts

### GET /workouts
Get all workouts with optional filters.

Query parameters:
- `difficulty`: Filter by difficulty (beginner, intermediate, advanced)
- `creator`: Filter by creator user ID

```bash
curl "http://localhost:8000/api/workouts?difficulty=intermediate"
```

### GET /workouts/:id
Get workout by ID.

```bash
curl http://localhost:8000/api/workouts/{workoutId}
```

### POST /workouts
Create a new workout.

```bash
curl -X POST http://localhost:8000/api/workouts \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Full Body Workout",
    "description": "A comprehensive full body workout",
    "difficulty": "intermediate",
    "creator": "{userId}",
    "exercises": [
      {
        "name": "Squats",
        "sets": 3,
        "reps": 10
      },
      {
        "name": "Running",
        "sets": 1,
        "reps": 1,
        "duration": 20
      }
    ]
  }'
```

### PUT /workouts/:id
Update workout.

```bash
curl -X PUT http://localhost:8000/api/workouts/{workoutId} \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated Title",
    "difficulty": "advanced"
  }'
```

### DELETE /workouts/:id
Delete workout.

```bash
curl -X DELETE http://localhost:8000/api/workouts/{workoutId}
```

---

## Leaderboard

### GET /leaderboard
Get global leaderboard.

Query parameters:
- `period`: Period for leaderboard (daily, weekly, monthly, alltime) - default: weekly
- `team`: Filter by team ID
- `limit`: Number of results (default: 50)

```bash
curl "http://localhost:8000/api/leaderboard?period=weekly&limit=20"
```

### GET /leaderboard/user/:userId
Get user's leaderboard position.

```bash
curl "http://localhost:8000/api/leaderboard/user/{userId}?period=weekly"
```

### POST /leaderboard/update
Update leaderboard entry (typically called after activity logging).

```bash
curl -X POST http://localhost:8000/api/leaderboard/update \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "{userId}",
    "period": "weekly",
    "score": 1000,
    "activitiesCount": 5,
    "totalDuration": 300,
    "totalCalories": 2500
  }'
```

### GET /leaderboard/team/:teamId
Get team leaderboard.

Query parameters:
- `period`: Period for leaderboard (default: weekly)
- `limit`: Number of results (default: 50)

```bash
curl "http://localhost:8000/api/leaderboard/team/{teamId}?period=weekly"
```

---

## Error Responses

All error responses follow this format:

```json
{
  "error": "Error message description"
}
```

Common HTTP Status Codes:
- `200 OK`: Request successful
- `201 Created`: Resource created successfully
- `400 Bad Request`: Missing or invalid required fields
- `404 Not Found`: Resource not found
- `409 Conflict`: Duplicate resource (e.g., username already exists)
- `500 Internal Server Error`: Server error
