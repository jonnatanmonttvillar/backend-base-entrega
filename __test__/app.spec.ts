import { describe, test, expect } from "@jest/globals";
import app from "../src/server.js";
import request from "supertest";
import { configuration } from "../src/config.js";
import { esPrimo } from "../src/numeros.js";
import { esPalindromo } from "../src/palindromo.js";

describe("Server Endpoints", () => {
    test("GET / should return welcome message", async () => {
        const response = await request(app)
            .get("/")
            .expect("Content-Type", /text/)
            .expect(200);
        expect(response.text).toBe(`Hola, esta api fue configurada por el usuario ${configuration.username}`);
    });

    test("GET /key should return API key", async () => {
        const response = await request(app)
            .get("/key")
            .expect("Content-Type", /text/)
            .expect(200);
        expect(response.text).toBe(`Hola, esta api contiene la siguiente api-key: ${configuration.apiKey}`);
    });

    test("GET /palindromo/:frase should handle palindromes", async () => {
        const response = await request(app)
            .get("/palindromo/racecar")
            .expect("Content-Type", /text/)
            .expect(200);
        expect(response.text).toBe("Hola, La frase ingresada es palindromo");
    });

    test("GET /palindromo/:frase should handle non-palindromes", async () => {
        const response = await request(app)
            .get("/palindromo/hello")
            .expect("Content-Type", /text/)
            .expect(200);
        expect(response.text).toBe("Hola, La frase ingresada no es palindromo");
    });

    test("GET /primo/:numero should handle prime numbers", async () => {
        const response = await request(app)
            .get("/primo/7")
            .expect("Content-Type", /text/)
            .expect(200);
        expect(response.text).toBe("Hola, el numero ingresado es un numero primo");
    });

    test("GET /primo/:numero should handle non-prime numbers", async () => {
        const response = await request(app)
            .get("/primo/4")
            .expect("Content-Type", /text/)
            .expect(200);
        expect(response.text).toBe("Hola, el numero ingresado no es un numero primo");
    });
});

describe("Function Tests", () => {
    describe("esPrimo", () => {
        test("should return true for prime numbers", () => {
            expect(esPrimo(2)).toBe(true);
            expect(esPrimo(3)).toBe(true);
            expect(esPrimo(5)).toBe(true);
        });

        test("should return false for non-prime numbers", () => {
            expect(esPrimo(1)).toBe(false);
            expect(esPrimo(4)).toBe(false);
            expect(esPrimo(9)).toBe(false);
        });

        test("should return false for numbers less than 2", () => {
            expect(esPrimo(0)).toBe(false);
            expect(esPrimo(-1)).toBe(false);
        });
    });

    describe("esPalindromo", () => {
        test("should return true for palindromes", () => {
            expect(esPalindromo("racecar")).toBe(true);
            expect(esPalindromo("A man a plan a canal Panama")).toBe(true);
        });

        test("should return false for non-palindromes", () => {
            expect(esPalindromo("hello")).toBe(false);
            expect(esPalindromo("world")).toBe(false);
        });

        test("should return true for single character strings", () => {
            expect(esPalindromo("a")).toBe(true);
        });

        test("should return true for empty strings", () => {
            expect(esPalindromo("")).toBe(true);
        });
    });
});
