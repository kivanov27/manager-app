import { Days } from './types';
import bcrypt from 'bcrypt';
const toNewWorkout = (obj) => {
    if (!obj || typeof obj !== 'object') {
        throw new Error('Incorrect or missing data');
    }
    if ('title' in obj && 'day' in obj && 'exercises' in obj) {
        const newWorkout = {
            title: parseTitle(obj.title),
            day: parseDay(obj.day),
            exercises: parseExercises(obj.exercises),
        };
        return newWorkout;
    }
    throw new Error('Incorrect data: some fields are missing.');
};
const toNewExercise = (obj) => {
    if (!obj || typeof obj !== 'object') {
        throw new Error('Incorrect or missing data');
    }
    if ('name' in obj) {
        const newExercise = {
            name: parseName(obj.name),
        };
        if ('reps' in obj)
            newExercise.reps = parseReps(obj.reps);
        if ('sets' in obj)
            newExercise.sets = parseSets(obj.sets);
        if ('duration' in obj)
            newExercise.duration = parseDuration(obj.duration);
        if ('weight' in obj)
            newExercise.weight = parseWeight(obj.weight);
        return newExercise;
    }
    throw new Error('Incorrect data: you need a name at least.');
};
const toNewWorkoutRecord = (obj) => {
    if (!obj || typeof obj !== 'object') {
        throw new Error('Incorrect or missing data');
    }
    if ('title' in obj && 'day' in obj && 'date' in obj && 'exercises' in obj) {
        const newWorkoutRecord = {
            title: parseTitle(obj.title),
            day: parseDay(obj.day),
            date: parseDate(obj.date),
            exercises: parseExercises(obj.exercises)
        };
        return newWorkoutRecord;
    }
    throw new Error('Incorrect data: you need title, day and date at least.');
};
const toNewHabit = (obj) => {
    if (!obj || typeof obj !== 'object') {
        throw new Error('Incorrect or missing data');
    }
    if ('name' in obj && 'days' in obj) {
        const newHabit = {
            name: parseName(obj.name),
            days: parseHabitDays(obj.days)
        };
        return newHabit;
    }
    throw new Error('Incorrect data: you need name and days');
};
const toNewTask = (obj) => {
    if (!obj || typeof obj !== 'object') {
        throw new Error('Incorrect or missing data');
    }
    if ('startsAt' in obj && 'endsAt' in obj && 'task' in obj && 'completed' in obj) {
        if (isDate(parseRealDate(obj.startsAt)) && isDate(parseRealDate(obj.endsAt)) && isString(obj.task) && isBoolean(obj.completed)) {
            const newTask = {
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
const toNewUser = async (obj) => {
    if (!obj || typeof obj !== 'object') {
        throw new Error('Incorrect or missing data');
    }
    if ('username' in obj && 'password' in obj) {
        const newUser = {
            username: parseUsername(obj.username),
            passwordHash: await parsePassword(obj.password)
        };
        return newUser;
    }
    throw new Error('Incorrect or missing user data');
};
const isString = (text) => {
    return typeof text === 'string' || text instanceof String;
};
const isDay = (day) => {
    return Object.values(Days).includes(day);
};
const isDate = (date) => {
    return date instanceof Date && !isNaN(date.getTime());
};
const isBoolean = (bool) => {
    return typeof bool === 'boolean';
};
// const parseObject = (obj: unknown): object => {
//     if (!obj || typeof obj !== 'object') {
//         throw new Error('Incorrect or missing data');
//     }
//     return obj;
// };
const parseTitle = (title) => {
    if (!isString(title)) {
        throw new Error('Incorrect or missing title:' + title);
    }
    return title;
};
const parseDay = (day) => {
    if (!isString(day) || !isDay(day)) {
        throw new Error('Incorrect value for day:' + day);
    }
    return day;
};
const parseDate = (date) => {
    if (!isString(date)) {
        throw new Error('Incorrect or missing date:' + date);
    }
    return date;
};
const parseExercise = (exercise) => {
    if (!exercise || typeof exercise !== 'object') {
        throw new Error('Incorrect or missing exercise data.');
    }
    const parsedExercise = exercise;
    if (!parsedExercise.name || !isString(parsedExercise.name)) {
        throw new Error('Incorrect or missing exercise name: ' + parsedExercise.name);
    }
    const exerciseEntry = {
        name: parsedExercise.name,
        sets: parsedExercise.sets && isString(parsedExercise.sets) ? parsedExercise.sets : undefined,
        reps: parsedExercise.reps && isString(parsedExercise.reps) ? parsedExercise.reps : undefined,
        duration: parsedExercise.duration && isString(parsedExercise.duration) ? parsedExercise.duration : undefined,
        description: parsedExercise.description && isString(parsedExercise.description) ? parsedExercise.description : undefined,
        weight: parsedExercise.weight && isString(parsedExercise.weight) ? parsedExercise.weight : undefined,
    };
    return exerciseEntry;
};
const parseExercises = (exercises) => {
    if (!Array.isArray(exercises)) {
        throw new Error('Incorrect or missing exercises');
    }
    return exercises.map(exercise => parseExercise(exercise));
};
const parseName = (name) => {
    if (!name || !isString(name)) {
        throw new Error('Incorrect or missing name:' + name);
    }
    return name;
};
const parseReps = (reps) => {
    if (!isString(reps)) {
        throw new Error('Incorrect value for reps, must be number:' + reps);
    }
    return reps;
};
const parseSets = (sets) => {
    if (!isString(sets)) {
        throw new Error('Incorrect value for sets, must be number:' + sets);
    }
    return sets;
};
const parseDuration = (duration) => {
    if (!isString(duration)) {
        throw new Error('Incorrect value for duration:' + duration);
    }
    return duration;
};
const parseWeight = (weight) => {
    if (!isString(weight)) {
        throw new Error('Incorrect value for weight:' + weight);
    }
    return weight;
};
const parseRealDate = (date) => {
    if (!isString(date)) {
        throw new Error('Incorrect value for date:' + date);
    }
    return new Date(date);
};
const parseHabitDay = (day) => {
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
const parseHabitDays = (days) => {
    if (!Array.isArray(days)) {
        throw new Error('Incorrect or missing habit days');
    }
    return days.map(day => parseHabitDay(day));
};
const parseUsername = (username) => {
    if (!isString(username)) {
        throw new Error('Incorrect or missing username');
    }
    return username;
};
const parsePassword = async (pass) => {
    if (!isString(pass)) {
        throw new Error('Incorrect or missing password hash');
    }
    const saltRounds = 10;
    return await bcrypt.hash(pass, saltRounds);
};
export { toNewWorkout, toNewExercise, toNewWorkoutRecord, toNewHabit, toNewTask, toNewUser };
