import { test, after, beforeEach } from 'node:test';
import mongoose from 'mongoose';
import supertest from 'supertest';
import app from '../app';
import { Habit } from '../models/habit';
import assert from 'assert';

const api = supertest(app);

const initialHabits = [
    {
        id: '1',
        name: 'habit1',
        days: {
            date: new Date(),
            completed: false,
        },
    },
    {
        id: '2',
        name: 'habit2',
        days: {
            date: new Date('October 18'),
            completed: true,
        },
    },
];

beforeEach(async () => {
    await Habit.deleteMany({});
    let habitObj = new Habit(initialHabits[0]);
    await habitObj.save();
    habitObj = new Habit(initialHabits[1]);
    await habitObj.save();
});

test('habits are returned as json', async () => {
    await api
        .get('/api/habits')
        .expect(200)
        .expect('Content-Type', /application\/json/)
});

test('there are two habits', async () => {
    const response = await api.get('/api/habits');
    assert.strictEqual(response.body.length, initialHabits.length);
});

test('habit1 exists', async () => {
    const response = await api.get('/api/habits');
    assert.strictEqual(response.body[0].name, initialHabits[0].name);
});

after(async () => {
    await mongoose.connection.close();
});
