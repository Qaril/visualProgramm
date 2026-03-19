import { describe, it, expect } from 'vitest';
import {
    createWhereOp, createGroupByOp, createHavingOp, createSortOp,
    strictQuery
} from '../src/export';

interface User {
    id: number;
    name: string;
    age: number;
    city: string;
}

describe('types', () => {
    it('делает where', () => {
        const op = createWhereOp<User, 'city'>('city', 'Новосибирск');
        expect(op.type).toBe('where');
    });

    it('делает groupBy', () => {
        const op = createGroupByOp<User, 'age'>('age');
        expect(op.type).toBe('groupBy');
    });

    it('делает having', () => {
        const op = createHavingOp<User, 'age'>(g => g.items.length > 1);
        expect(op.type).toBe('having');
    });

    it('делает sort ', () => {
        const op = createSortOp<User, 'name'>('name');
        expect(op.type).toBe('sort');
    });

    it('делает прпавильная последовательность', () => {
        const q = strictQuery<User>(
            createWhereOp<User, 'city'>('city', 'Новосибирск'),
            createGroupByOp<User, 'age'>('age'),
            createHavingOp<User, 'age'>(g => g.items.length > 1),
            createSortOp<User, 'name'>('name')
        );
        expect(typeof q).toBe('function');
    });
});