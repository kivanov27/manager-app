import { WorkoutEntry } from '../src/types';

const workoutEntries: WorkoutEntry[] = [
    {
        "id": 1,
        "title": "Monday workout",
        "date": "04-04-2024",
        "exercises": [
            {
                "id": 1,
                "name": "push-ups",
                "sets": 5,
                "reps": 10
            },
            {
                "id": 2,
                "name": "pull-ups",
                "sets": 5,
                "reps": 10
            }
        ]
    },
    {
        "id": 2,
        "title": "Truesday workout",
        "date": "05-04-2024",
        "exercises": [
            {
                "id": 1,
                "name": "squats",
                "sets": 5,
                "reps": 10
            },
            {
                "id": 2,
                "name": "deadlifts",
                "sets": 5,
                "reps": 10,
                "weight": "15kg"
            }
        ]
    },
];

export default workoutEntries;
