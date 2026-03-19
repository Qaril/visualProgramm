import { describe, it, expect, beforeEach } from 'vitest';
import { where, sort, groupBy, having } from '../src/operacii';

interface User {
    id: number;
    name: string;
    age: number;
    city: string;
}

describe('operations', () => {
    let users: User[];

    beforeEach(() => {
        users = [
            { id: 1, name: 'Стас', age: 19, city: 'Новосибирск' },
            { id: 2, name: 'Олег', age: 19, city: 'Бийск' },
            { id: 3, name: 'Глеб', age: 20, city: 'Прокопьевск' },
        ];
    });

    it('Фильтрация с помощью where', () => {
        const result = where<User, 'city'>('city', 'Новосибирск')(users);
        expect(result).toHaveLength(1);
    });

    it('Sorting', () => {
        const result = sort<User, 'age'>('age')(users);
        expect(result[0].age).toBe(19);
        expect(result[2].age).toBe(20);
    });

    it('Групирование', () => {
        const result = groupBy<User, 'city'>('city')(users);
        expect(result).toHaveLength(3);
        const biyskGroup = result.find(g => g.key === 'Прокопьевск');
        expect(biyskGroup?.items).toHaveLength(1);
    });

    it('Фильтрация группы', () => {
        const localUsers = [
            ...users,
            { id: 4, name: 'Олег', age: 19, city: 'Бийск' }
        ];
        const groups = groupBy<User, 'city'>('city')(localUsers);
        const result = having<User, 'city'>(g => g.items.length > 1)(groups);
        expect(result).toHaveLength(1);
        expect(result[0].key).toBe('Бийск');
    });
});