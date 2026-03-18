import { readFile, writeFile } from 'node:fs/promises';

export function csvToJSON(lines: string[], sep: string): object[] {
    if (!lines || lines.length === 0) {
        throw new Error("Массив пуст, работать не с чем");
    }
    if (!sep || sep.length === 0) {
        throw new Error("Разделитель не должен равняться нулю");
    }

    const head = lines[0].split(sep);
    const table: object[] = [];

    for (let i = 1; i < lines.length; i++) {
        const currentLine = lines[i].trim();
        if (!currentLine) continue;
        const parts = currentLine.split(sep);
        if (parts.length !== head.length) {
            throw new Error(`В строке номер ${i + 1} не хватает данных (надо ${head.length})`);
        }

        const rowObj: any = {};
        for (let j = 0; j < head.length; j++) {
            const key = head[j].trim();
            const val = parts[j].trim();

            if (val !== "" && !isNaN(Number(val))) {
                rowObj[key] = Number(val);
            } else {
                rowObj[key] = val;
            }
        }
        table.push(rowObj);
    }

    return table;
}


export async function formatCSVFileToJSONFile(
    fileIn: string,
    fileOut: string,
    sep: string
): Promise<void> {
    try {
        const text = await readFile(fileIn, "utf-8");
        if (!text.trim()) {
            throw new Error("Файл пуст");
        }

        const allLines = text.split(/\r?\n/).filter(l => l.trim() !== "");
        const result = csvToJSON(allLines, sep);
        await writeFile(fileOut, JSON.stringify(result, null, 2), "utf-8");
    } catch (e: any) {
        throw new Error(`Ошибка при обработке файла: ${e.message}`);
    }
}