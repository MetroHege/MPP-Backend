import { describe, expect, it } from "@jest/globals";
import request from "supertest";
import app from "../src/app";

describe("Api tests", () => {
    it("tests /tests endpoint", async () => {
        const response = await request(app).get("/api/tests");
        expect(response.body).toEqual({ message: "success" });
        expect(response.statusCode).toBe(200);
    });

    it("tests /tests/id/:id endpoint", async () => {
        const response = await request(app).get("/api/tests/id/1");
        expect(response.body).toEqual({ message: "success" });
        expect(response.statusCode).toBe(200);
    });

    it("tests /tests/id/:id endpoint", async () => {
        const response = await request(app).get("/api/tests/id/x");
        expect(response.body).toEqual({ message: "Invalid input", status: 400 });
        expect(response.statusCode).toBe(400);
    });

    it("tests /tests/login endpoint", async () => {
        const response = await request(app)
            .post("/api/tests/login")
            .send({ username: "john", password: "password" })
            .set("Accept", "application/json")
            .expect("Content-Type", /json/);
        expect(response.body).toEqual({ message: "success" });
        expect(response.statusCode).toBe(200);
    });

    it("tests /tests/login endpoint", async () => {
        const response = await request(app)
            .post("/api/tests/login")
            .send({ email: "john@mpp.test", password: "password" })
            .set("Accept", "application/json")
            .expect("Content-Type", /json/);
        expect(response.body).toEqual({ message: "success" });
        expect(response.statusCode).toBe(200);
    });

    it("tests /tests/login endpoint", async () => {
        const response = await request(app)
            .post("/api/tests/login")
            .send({ password: "password" })
            .set("Accept", "application/json")
            .expect("Content-Type", /json/);
        expect(response.body).toEqual({ message: "Username or email is required", status: 400 });
        expect(response.statusCode).toBe(400);
    });

    it("tests /tests/listings endpoint", async () => {
        const response = await request(app)
            .post("/api/tests/listings")
            .send({
                type: "sell",
                category: 1,
                quality: 1,
                price: 1,
                title: "test",
                description: "test",
            })
            .set("Accept", "application/json")
            .expect("Content-Type", /json/);
        expect(response.body).toEqual({ message: "success" });
        expect(response.statusCode).toBe(200);
    });

    it("tests /tests/listings endpoint", async () => {
        const response = await request(app)
            .post("/api/tests/listings")
            .send({
                type: "sell",
                category: 1,
                quality: 1,
                price: 1,
                title: "test",
            })
            .set("Accept", "application/json")
            .expect("Content-Type", /json/);
        expect(response.body).toEqual({ message: "Invalid input", status: 400 });
        expect(response.statusCode).toBe(400);
    });

    it("tests /tests/users endpoint", async () => {
        const response = await request(app)
            .post("/api/tests/users")
            .send({
                username: "user",
                firstName: "test",
                lastName: "user",
                phone: "0451111111",
                email: "test@mpp.fi",
                city: "test",
                password: "password",
            })
            .set("Accept", "application/json")
            .expect("Content-Type", /json/);
        expect(response.body).toEqual({ message: "success" });
        expect(response.statusCode).toBe(200);
    });

    it("tests /tests/users endpoint", async () => {
        const response = await request(app)
            .post("/api/tests/users")
            .send({
                username: "user",
                firstName: "test",
                lastName: "user",
                phone: "+358451111111",
                email: "test@mpp.fi",
                city: "test",
                password: "password",
            })
            .set("Accept", "application/json")
            .expect("Content-Type", /json/);
        expect(response.body).toEqual({ message: "success" });
        expect(response.statusCode).toBe(200);
    });

    it("tests /tests/users endpoint", async () => {
        const response = await request(app)
            .post("/api/tests/users")
            .send({
                username: "user",
                firstName: "test",
                lastName: "user",
                phone: "0451111111",
                email: "x",
                city: "test",
                password: "password",
            })
            .set("Accept", "application/json")
            .expect("Content-Type", /json/);
        expect(response.body).toEqual({ message: "Invalid input", status: 400 });
        expect(response.statusCode).toBe(400);
    });

    it("tests /tests/users endpoint", async () => {
        const response = await request(app)
            .post("/api/tests/users")
            .send({
                username: "user",
                firstName: "test",
                lastName: "user",
                phone: "x",
                email: "test@mpp.test",
                city: "test",
                password: "password",
            })
            .set("Accept", "application/json")
            .expect("Content-Type", /json/);
        expect(response.body).toEqual({ message: "Invalid input", status: 400 });
        expect(response.statusCode).toBe(400);
    });

    it("tests /tests/users endpoint", async () => {
        const response = await request(app)
            .post("/api/tests/users")
            .send({
                username: "x",
                firstName: "test",
                lastName: "user",
                phone: "0451111111",
                email: "test@mpp.test",
                city: "test",
                password: "password",
            })
            .set("Accept", "application/json")
            .expect("Content-Type", /json/);
        expect(response.body).toEqual({ message: "Invalid input", status: 400 });
        expect(response.statusCode).toBe(400);
    });

    it("tests /tests/users endpoint", async () => {
        const response = await request(app)
            .post("/api/tests/users")
            .send()
            .set("Accept", "application/json")
            .expect("Content-Type", /json/);
        expect(response.body).toEqual({ message: "Invalid input", status: 400 });
        expect(response.statusCode).toBe(400);
    });
});
