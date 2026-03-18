import { describe, it, expect, vi, beforeEach } from "vitest";
import { readFile, writeFile } from "node:fs/promises";
import { csvToJSON, formatCSVFileToJSONFile } from "./lab3";

vi.mock("node:fs/promises", () => ({
    readFile: vi.fn(),
    writeFile: vi.fn(),
}));

describe("csvToJSON", () => {
    describe("проверка на корректные данные", () => {
        it("конвертирует CSV с разделителем  в JSON", () => {
            const input = ["p1;p2;p3", "1;A;b", "2;B;v"];
            const result = csvToJSON(input, ";");

            expect(result).toEqual([
                { p1: 1, p2: "A", p3: "b" },
                { p1: 2, p2: "B", p3: "v" },
            ]);
        });

        it("преобразует строковые числа в числовой тип", () => {
            const input = ["id;value", "1;42", "2;3.14"];
            const result = csvToJSON(input, ";");

            expect(result).toEqual([
                { id: 1, value: 42 },
                { id: 2, value: 3.14 },
            ]);
        });

        it("игнорирует пустые строки в CSV", () => {
            const input = ["a;b", "1;2", "", "3;4"];
            const result = csvToJSON(input, ";");

            expect(result).toEqual([
                { a: 1, b: 2 },
                { a: 3, b: 4 },
            ]);
        });
    });

    describe("ошибочные данные", () => {
        it("кидает ошибку при пустом массиве", () => {
            expect(() => csvToJSON([], ";")).toThrow(
                "Массив пуст, работать не с чем",
            );
        });

        it("кидает ошибку при пустом разделителе", () => {
            expect(() => csvToJSON(["a;b"], "")).toThrow(
                "Разделитель не должен равняться нулю",
            );
        });

        it("кидает ошибку при разном количестве полей в строках", () => {
            const input = ["a;b;c", "1;2"];

            expect(() => csvToJSON(input, ";")).toThrow(
                "В строке номер 2 не хватает данных (надо 3",
            );
        });
    });
});

describe("formatCSVFileToJSONFile", () => {
    beforeEach(() => {
        vi.resetAllMocks();
    });

    it("считывает CSV и создает JSON файл", async () => {
        const mockCSVContent = "name;age;city\nПетька;25;Новосибирск\nВаня;13;Волгоград";
        vi.mocked(readFile).mockResolvedValue(mockCSVContent);

        await formatCSVFileToJSONFile("input.csv", "output.json", ";");

        expect(readFile).toHaveBeenCalledWith("input.csv", "utf-8");
        expect(writeFile).toHaveBeenCalledWith(
            "output.json",
            JSON.stringify(
                [
                    { name: "Петька", age: 25, city: "Новосибирск" },
                    { name: "Ваня", age: 13, city: "Волгоград" },
                ],
                null,
                2,
            ),
            "utf-8",
        );
    });

    it("тут ошибка с пустным файлом", async () => {
        vi.mocked(readFile).mockResolvedValue("");

        await expect(
            formatCSVFileToJSONFile("empty.csv", "output.json", ";"),
        ).rejects.toThrow("Ошибка при обработке файла: Файл пуст");
    });

    it("ошибка в CSV", async () => {
        const mockCSVContent = "name;age\nИван;25;Москва";
        vi.mocked(readFile).mockResolvedValue(mockCSVContent);

        await expect(
            formatCSVFileToJSONFile("bad.csv", "output.json", ";"),
        ).rejects.toThrow(
            "Ошибка при обработке файла",
        );
    });

    it("обрабатывает ошибки при чтении файла", async () => {
        vi.mocked(readFile).mockRejectedValue(new Error("Файл не найден"));

        await expect(
            formatCSVFileToJSONFile("missing.csv", "output.json", ";"),
        ).rejects.toThrow("Файл не найден");
    });
});