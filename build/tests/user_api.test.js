/* eslint-disable @typescript-eslint/no-floating-promises */
import { test, after, beforeEach, describe } from "node:test";
import assert from "node:assert";
import mongoose from "mongoose";
import supertest from "supertest";
import app from "../app";
import * as bcrypt from "bcrypt";
import { User } from "../models/user";
import { usersInDb } from "./helper";
const api = supertest(app);
describe("when there is 1 user in db", () => {
    beforeEach(async () => {
        await User.deleteMany({});
        const passwordHash = await bcrypt.hash("secret", 10);
        const user = new User({ username: "root", passwordHash });
        await user.save();
    });
    test("creation succeeds with new username", async () => {
        const usersAtStart = await usersInDb();
        const newUser = { username: "fdd", password: "fadada" };
        await api
            .post("/api/users")
            .send(newUser)
            .expect(201)
            .expect("Content-Type", /application\/json/);
        const usersAtEnd = await usersInDb();
        assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1);
        const usernames = usersAtEnd.map((u) => u.username);
        assert(usernames.includes(newUser.username));
    });
    test("creation fails if username is taken", async () => {
        const usersAtStart = await usersInDb();
        const newUser = { username: "root", password: "sekret" };
        await api
            .post("/api/users")
            .send(newUser)
            .expect(400)
            .expect("Content-Type", /application\/json/);
        const usersAtEnd = await usersInDb();
        assert.strictEqual(usersAtEnd.length, usersAtStart.length);
    });
});
after(async () => {
    await mongoose.connection.close();
});
