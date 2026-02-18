import { describe, it, expect } from 'vitest';
import {
    createUser,
    createBook,
    calculateArea,
    getStatusColor,
    UpperFirst,
    TrimStr,
    getFirstElement,
    findById,
    testUser
} from './lab1';

describe('createUser', () => {
    it('тест создания юзера', () => {
        const user = createUser(1, 'Алекс');
        expect(user).toEqual({
            id: 1,
            name: 'Алекс',
            isActive: true
        });
    });

    it('емаил юзера', () => {
        const user = createUser(2, 'Алекс', 'alex@mail.com');
        expect(user).toEqual({
            id: 2,
            name: 'Алекс',
            email: 'alex@mail.com',
            isActive: true
        });
    });
});

describe('calculateArea', () => {
    it('тест площажь круга', () => {
        expect(calculateArea('circle', 5)).toBeCloseTo(Math.PI * 25);
    });

    it('тест площадь квадрата', () => {
        expect(calculateArea('square', 4)).toBe(16);
    });
});

describe('getStatusColor', () => {
    it('тест вернуть зеленый', () => {
        expect(getStatusColor('active')).toBe('green');
    });

    it('тест вернуть жёлтый', () => {
        expect(getStatusColor('new')).toBe('yellow');
    });

    it('тест вернуть красный', () => {
        expect(getStatusColor('inactive')).toBe('red');
    });
});

describe('UpperFirst', () => {
    it('тест поднять первую букву в слове', () => {
        expect(UpperFirst('hello')).toBe('Hello');
    });
});

describe('TrimStr', () => {
    it('тест обрезалка пробелов', () => {
        expect(TrimStr('  hello  ')).toBe('hello');
    });
});

describe('getFirstElement', () => {
    it('тест получаем первый элемент', () => {
        expect(getFirstElement([1, 2, 3])).toBe(1);
    });

    it('тест получаем андефайнд', () => {
        expect(getFirstElement([])).toBeUndefined();
    });
});

describe('findById', () => {
    const users: testUser[] = [
        { id: 1, name: 'User1' },
        { id: 2, name: 'User2', email: 'user2@test.com' }
    ];

    it('тест получить юзер айди', () => {
        expect(findById(users, 1)).toEqual({ id: 1, name: 'User1' });
    });

    it('тест получить андефайнд в поиске айди', () => {
        expect(findById(users, 999)).toBeUndefined();
    });
});