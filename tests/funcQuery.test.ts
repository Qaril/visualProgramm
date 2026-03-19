import { describe, it, expect, beforeEach } from 'vitest';
import {
    query,
    createWhereOp,
    createGroupByOp,
    createHavingOp,
    createSortOp
} from '../src/funcQuery';

interface User {
    id: number;
    name: string;
    age: number;
    city: string;
}

describe('funcQuery', () => {
    let users: User[];

    beforeEach(() => {
        users = [
            { id: 1, name: 'Стас', age: 19, city: 'Новосибирск' },
            { id: 2, name: 'Олег', age: 19, city: 'Бийск' },
            { id: 3, name: 'Глеб', age: 20, city: 'Прокопьевск' },
        ];
    });

    it('выполняет where', () => {
        const q = query<User>(createWhereOp<User, 'city'>('city', 'Новосибирск'));
        expect(q(users)).toHaveLength(1);
    });

    it('sorting ', () => {
        const q = query<User>(createSortOp<User, 'age'>('age'));
        const result = q(users);
        expect(result[0].age).toBe(19);
        expect(result[2].age).toBe(20);
    });

    it('groupBy', () => {
        const q = query<User, any>(createGroupByOp<User, 'city'>('city'));
        const result = q(users);
        expect(result).toHaveLength(3);
    });

    it('обрабатывает полследовательность', () => {
        expect(() => {
            query<User>(
                createWhereOp<User, 'city'>('city', 'Новосибирск'),
                createGroupByOp<User, 'age'>('age'),
                createHavingOp<User, 'age'>(group => group.items.length > 0),
                createSortOp<User, 'name'>('name')
            );
        }).not.toThrow();
    });

    it('отклоняет having', () => {
        expect(() => {
            query<User>(
                createWhereOp<User, 'city'>('city', 'Новосибирск'),
                createHavingOp<User, 'age'>(group => group.items.length > 1)
            );
        }).toThrow('Неверный порядок операций');
    });

    it('Работа без операций', () => {
        expect(query<User>()(users)).toEqual(users);
    });
});