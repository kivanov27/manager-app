import { WorkoutEntry, ExerciseEntry, NewWorkoutEntry, Days } from './types';

const toWorkoutEntry = (obj: unknown): WorkoutEntry => {
    if (!obj || typeof obj !== 'object') {
        throw new Error('Incorrect or missing data');
    }

    if ('_id' in obj && 'title' in obj && 'day' in obj && 'exercises' in obj) {
        const workout: WorkoutEntry = {
            id: parseId(obj._id),
            title: parseTitle(obj.title),
            day: parseDay(obj.day),
            exercises: parseExercises(obj.exercises),
        };

        return workout;
    }

    throw new Error('Incorrect data: some fields are missing.');
};

const toNewWorkoutEntry = (obj: unknown): NewWorkoutEntry => {
    if (!obj || typeof obj !== 'object') {
        throw new Error('Incorrect or missing data');
    }

    if ('title' in obj && 'day' in obj && 'exercises' in obj) {
        const newWorkout: NewWorkoutEntry = {
            title: parseTitle(obj.title),
            day: parseDay(obj.day),
            exercises: parseExercises(obj.exercises),
        };

        return newWorkout;
    }

    throw new Error('Incorrect data: some fields are missing.');
};

const toNewExerciseEntry = (obj: unknown): ExerciseEntry => {
    if (!obj || typeof obj !== 'object') {
        throw new Error('Incorrect or missing data');
    }

    if ('name' in obj) {
        const newExercise: ExerciseEntry = {
            name: parseName(obj.name),
        };

        if ('reps' in obj) {
            newExercise.reps = parseReps(obj.reps);
        }
        if ('sets' in obj) {
            newExercise.sets = parseSets(obj.sets);
        }
        if ('duration' in obj) {
            newExercise.duration = parseDuration(obj.duration);
        }
        if ('weight' in obj) {
            newExercise.weight = parseWeight(obj.weight);
        }

        return newExercise;
    }

    throw new Error('Incorrect data: you need a name at least.');
};

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};


const isDay = (day: string): day is Days => {
    return Object.values(Days).includes(day as Days);
};

const parseId = (id: unknown): number => {
    if (!isString(id)) {
        throw new Error('Incorrect or missing id:' + id);
    }
    return parseInt(id, 10);
};

const parseTitle = (title: unknown): string => {
    if (!isString(title)) {
        throw new Error('Incorrect or missing title:' + title);
    }
    return title;
};

const parseDay = (day: unknown): Days => {
    if(!isString(day) || !isDay(day)) {
        throw new Error('Incorrect value for day:' + day);
    }
    return day;
};

const parseExerciseEntry = (exercise: unknown): ExerciseEntry => {
    if (!exercise || typeof exercise !== 'object') {
        throw new Error('Incorrect or missing exercise data.');
    }

    const parsedExercise = exercise as { [key: string]: unknown };

    if (!parsedExercise.name || !isString(parsedExercise.name)) {
        throw new Error('Incorrect or missing exercise name: ' + parsedExercise.name);
    }

    const exerciseEntry: ExerciseEntry = {
        name: parsedExercise.name,
        sets: parsedExercise.sets && isString(parsedExercise.sets) ? parsedExercise.sets : undefined,
        reps: parsedExercise.reps && isString(parsedExercise.reps) ? parsedExercise.reps : undefined,
        duration: parsedExercise.duration && isString(parsedExercise.duration) ? parsedExercise.duration : undefined,
        description: parsedExercise.description && isString(parsedExercise.description) ? parsedExercise.description : undefined,
        weight: parsedExercise.weight && isString(parsedExercise.weight) ? parsedExercise.weight : undefined,
    };

    return exerciseEntry;
};

const parseExercises = (exercises: unknown): ExerciseEntry[] => {
    if (!Array.isArray(exercises)) {
        throw new Error('Incorrect or missing exercises');
    }

    return exercises.map(exercise => parseExerciseEntry(exercise));
};

const parseName = (name: unknown): string => {
    if (!name || !isString(name)) {
        throw new Error('Incorrect or missing name:' + name);
    }
    return name;
};

const parseReps = (reps: unknown): string => {
    if (!isString(reps)) {
        throw new Error('Incorrect value for reps, must be number:' + reps);
    }
    return reps;
};

const parseSets = (sets: unknown): string => {
    if (!isString(sets)) {
        throw new Error('Incorrect value for sets, must be number:' + sets);
    }
    return sets;
};

const parseDuration = (duration: unknown): string => {
    if (!isString(duration)) {
        throw new Error('Incorrect value for duration:' + duration);
    }
    return duration;
};

const parseWeight = (weight: unknown): string => {
    if (!isString(weight)) {
        throw new Error('Incorrect value for weight:' + weight);
    }
    return weight;
};

//const isNumber = (num: unknown): num is number => {
//    return typeof num === 'number' && !isNaN(num);
//};

//const isDate = (date: string): boolean => {
//    return Boolean(Date.parse(date));
//};

//const parseDate = (date: unknown): string => {
//    if (!date || !isString(date) || !isDate(date)) {
//        throw new Error('Incorrect or missing date:' + date);
//    }
//    return date;
//};

export { toWorkoutEntry, toNewWorkoutEntry, toNewExerciseEntry };
