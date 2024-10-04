import { Workout } from '../models/workout';
import { WorkoutEntry, ExerciseEntry, NewWorkoutEntry } from '../types';

const getEntries = async (): Promise<WorkoutEntry[]> => {
    return await Workout.find({});
};

const findById = async (id: string): Promise<WorkoutEntry> => {
    const workout = await Workout.findById(id);
    if (!workout) {
        throw new Error(`Could not find workout with id ${id}`);
    }
    return workout.toJSON() as WorkoutEntry;
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

const addExercise = async (workoutId: string, exercise: ExerciseEntry): Promise<WorkoutEntry> => {
    const workout = await Workout.findById(workoutId);
    if (!workout) {
        throw new Error(`Could not find a workout with the id ${workoutId}`);
    }
    workout.exercises.push(exercise);

    const updatedWorkout = await Workout.findByIdAndUpdate(workoutId, workout, { new: true });
    if (!updatedWorkout) {
        throw new Error(`Could not update workout with the id ${workoutId}`);
    }
    return updatedWorkout.toJSON() as WorkoutEntry;
};

const updateWorkout = async (workoutId: string, newWorkout: WorkoutEntry): Promise<WorkoutEntry> => {
    const updatedWorkout = await Workout.findByIdAndUpdate(workoutId, {
        title: newWorkout.title,
        day: newWorkout.day,
        exercises: newWorkout.exercises
    }, { new: true });

    if (!updatedWorkout) {
        throw new Error(`Workout with id ${workoutId} could not be found and updated`);
    }

    return updatedWorkout.toJSON() as WorkoutEntry;
};

const updateExercise = async (workoutId: string, exerciseId: string, newExercise: ExerciseEntry): Promise<WorkoutEntry> => {
    const workout = await Workout.findById(workoutId);
    if (!workout) {
        throw new Error(`Workout with id ${workoutId} not found.`);
    }
    
    const updatedWorkout = await Workout.findByIdAndUpdate(workoutId, {
        ...workout,
        exercises: workout.exercises.filter(ex => ex.id === exerciseId ? newExercise : ex)
    }); 
    if (!updatedWorkout) {
        throw new Error(`Couldn't update exercise with id ${exerciseId}`);
    }

    return updatedWorkout.toJSON() as WorkoutEntry;
};

const deleteWorkout = async (workoutId: string): Promise<void | null> => {
    return await Workout.findByIdAndDelete(workoutId);
};

//const deleteExercise = async (workoutId: string, exerciseId: string): Promise<WorkoutEntry> => {
//   const workout = await Workout.findById(workoutId);
//   if (!workout) {
//       throw new Error(`Could not find a workout with the id ${workoutId}`);
//   }
//   workout.exercises = workout.exercises.filter(exercise => exercise._id?.toString() !== exerciseId);
//   const updatedWorkout = await workout.save();
//   return toNewWorkoutEntry(updatedWorkout);
//};

export default {
    getEntries,
    findById,
    addWorkout,
    addExercise,
    updateWorkout,
    updateExercise,
    deleteWorkout,
    //deleteExercise
};
