import { WorkoutEntry, ExerciseEntry, NewWorkoutEntry } from '../types';
import { Workout } from '../models/workout';

const getEntries = async (): Promise<WorkoutEntry[]> => {
    return await Workout.find({});
};

const addWorkout = async (newWorkout: NewWorkoutEntry): Promise<WorkoutEntry> => {
    const workout = new Workout({
        title: newWorkout.title,
        day: newWorkout.day,
        exercises: newWorkout.exercises
    });

    const savedWorkout = await workout.save();
    return savedWorkout.toJSON() as WorkoutEntry;
};

const addExercise = async (workoutId: string, exercise: NewExercise): WorkoutEntry => {
    const workout = await Workout.findById('workoutId');
    if (workout) {
        workout.exercises.push(exercise);
        workout.save();
    }
    return workout;
};

// const findById = (id: number): WorkoutEntry | undefined => {
//    const workout = workouts.find(wo => wo.id === id);
//    return workout;
// };

export default {
    getEntries,
    addWorkout,
//    findById
};
