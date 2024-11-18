import { NewWorkout, NewExercise, Days, NewWorkoutRecord, HabitDay, NewHabit, NewTask } from './types';

const toNewWorkout = (obj: unknown): NewWorkout => {
    if (!obj || typeof obj !== 'object') {
        throw new Error('Incorrect or missing data');
    }

    if ('title' in obj && 'day' in obj && 'exercises' in obj) {
        const newWorkout: NewWorkout = {
            title: parseTitle(obj.title),
            day: parseDay(obj.day),
            exercises: parseExercises(obj.exercises),
        };

        return newWorkout;
    }

    throw new Error('Incorrect data: some fields are missing.');
};

const toNewExercise = (obj: unknown): NewExercise => {
    if (!obj || typeof obj !== 'object') {
        throw new Error('Incorrect or missing data');
    }

    if ('name' in obj) {
        const newExercise: NewExercise = {
            name: parseName(obj.name),
        };

        if ('reps' in obj) newExercise.reps = parseReps(obj.reps);
        if ('sets' in obj) newExercise.sets = parseSets(obj.sets);
        if ('duration' in obj) newExercise.duration = parseDuration(obj.duration);
        if ('weight' in obj) newExercise.weight = parseWeight(obj.weight);

        return newExercise;
    }

    throw new Error('Incorrect data: you need a name at least.');
};

const toNewWorkoutRecord = (obj: unknown): NewWorkoutRecord => {
    if (!obj || typeof obj !== 'object') {
        throw new Error('Incorrect or missing data');
    }

    if ('title' in obj && 'day' in obj && 'date' in obj && 'exercises' in obj) {
        const newWorkoutRecord: NewWorkoutRecord = {
            title: parseTitle(obj.title),
            day: parseDay(obj.day),
            date: parseDate(obj.date),
            exercises: parseExercises(obj.exercises)
        };

        return newWorkoutRecord;
    }

    throw new Error('Incorrect data: you need title, day and date at least.');
};

const toNewHabit = (obj: unknown): NewHabit => {
    if (!obj || typeof obj !== 'object') {
        throw new Error('Incorrect or missing data');
    }

    if ('name' in obj && 'days' in obj) {
        const newHabit: NewHabit = {
            name: parseName(obj.name),
            days: parseHabitDays(obj.days)
        };

        return newHabit;
    }

    throw new Error('Incorrect data: you need name and days');
};

const toNewTask = (obj: unknown): NewTask => {
    if (!obj || typeof obj !== 'object') {
        throw new Error('Incorrect or missing data');
    }

    if ('startsAt' in obj && 'endsAt' in obj && 'task' in obj && 'completed' in obj) {
        if (isDate(parseRealDate(obj.startsAt)) && isDate(parseRealDate(obj.endsAt)) && isString(obj.task) && isBoolean(obj.completed)) {
            const newTask: NewTask = { 
                startsAt: parseRealDate(obj.startsAt), 
                endsAt: parseRealDate(obj.endsAt), 
                task: obj.task,
                completed: obj.completed 
            };
            return newTask;
        }
    }

    throw new Error('Incorrect timetable obj data');
};

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const isDay = (day: string): day is Days => {
    return Object.values(Days).includes(day as Days);
};

const isDate = (date: unknown): date is Date => {
   return date instanceof Date && !isNaN(date.getTime());
};

const isBoolean = (bool: unknown): bool is boolean => {
    return typeof bool === 'boolean';
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

const parseDate = (date: unknown): string => {
    if(!isString(date)) {
        throw new Error('Incorrect or missing date:' + date);
    }
    return date;
};

const parseExercise = (exercise: unknown): NewExercise => {
    if (!exercise || typeof exercise !== 'object') {
        throw new Error('Incorrect or missing exercise data.');
    }

    const parsedExercise = exercise as { [key: string]: unknown };

    if (!parsedExercise.name || !isString(parsedExercise.name)) {
        throw new Error('Incorrect or missing exercise name: ' + parsedExercise.name);
    }

    const exerciseEntry: NewExercise = {
        name: parsedExercise.name,
        sets: parsedExercise.sets && isString(parsedExercise.sets) ? parsedExercise.sets : undefined,
        reps: parsedExercise.reps && isString(parsedExercise.reps) ? parsedExercise.reps : undefined,
        duration: parsedExercise.duration && isString(parsedExercise.duration) ? parsedExercise.duration : undefined,
        description: parsedExercise.description && isString(parsedExercise.description) ? parsedExercise.description : undefined,
        weight: parsedExercise.weight && isString(parsedExercise.weight) ? parsedExercise.weight : undefined,
    };

    return exerciseEntry;
};

const parseExercises = (exercises: unknown): NewExercise[] => {
    if (!Array.isArray(exercises)) {
        throw new Error('Incorrect or missing exercises');
    }

    return exercises.map(exercise => parseExercise(exercise));
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

const parseRealDate = (date: unknown): Date => {
    if (!isString(date)) {
        throw new Error('Incorrect value for date:' + date);
    }
    return new Date(date);
};

const parseHabitDay = (day: unknown): HabitDay => {
    if (!day || typeof day !== 'object') {
        throw new Error('Incorrect or missing habit day data');
    }

    if ('date' in day && 'completed' in day) {
        if (isDate(day.date) && isBoolean(day.completed)) {
            return { date: day.date, completed: day.completed };
        }
        else if (!isDate(day.date) && isBoolean(day.completed)) {
            return { date: parseRealDate(day.date), completed: day.completed };
        }
    }

    throw new Error('Incorrect or missing habit day data');
};

const parseHabitDays = (days: unknown): HabitDay[] => {
    if (!Array.isArray(days)) {
        throw new Error('Incorrect or missing habit days');
    }

    return days.map(day => parseHabitDay(day));
};

export { toNewWorkout, toNewExercise, toNewWorkoutRecord, toNewHabit, toNewTask };
