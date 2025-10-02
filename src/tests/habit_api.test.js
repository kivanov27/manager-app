import { test, after, beforeEach } from "node:test";
import assert from "node:assert";
import mongoose from "mongoose";
import supertest from "supertest";
import app from "../app";

import { Habit } from "../models/habit";

const api = supertest(app);

const initialHabits = [
    {
        id: "1",
        name: "habit1",
        days: [
            {
                date: new Date(2024, 10, 1),
                completed: true,
            },
            {
                date: new Date(2024, 9, 1),
                completed: true,
            },
            {
                date: new Date(2024, 8, 1),
                completed: true,
            },
            {
                date: new Date(2024, 7, 1),
                completed: true,
            },
            {
                date: new Date(2024, 6, 1),
                completed: true,
            },
            {
                date: new Date(2024, 5, 1),
                completed: true,
            },
            {
                date: new Date(2024, 4, 1),
                completed: true,
            },
            {
                date: new Date(2024, 3, 1),
                completed: true,
            },
        ],
    },
];

beforeEach(async () => {
    await Habit.deleteMany({});
    const habitObj = new Habit(initialHabits[0]);
    await habitObj.save();
    // habitObj = new Habit(initialHabits[1]);
    // await habitObj.save();
});

test("habits are returned as json", async () => {
    await api
        .get("/api/habits")
        .expect(200)
        .expect("Content-Type", /application\/json/);
});

// test('there are two habits', async () => {
//     const response = await api.get('/api/habits');
//     assert.strictEqual(response.body.length, initialHabits.length);
// });

test("habit1 exists", async () => {
    const response = await api.get("/api/habits");
    assert.strictEqual(response.body[0].name, initialHabits[0].name);
});

after(async () => {
    await mongoose.connection.close();
});
