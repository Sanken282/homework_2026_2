/* eslint-disable require-jsdoc */

'use strict';

QUnit.module('Тестируем функцию transform', () => {
    QUnit.test('Работает правильно с простыми объектами', (assert) => {
        const originalObject = { a: 1, b: 2, c: 3 };
        const transformFunction = (value) => value * 2;
        const result = transform(originalObject, transformFunction);

        assert.deepEqual(result, { a: 2, b: 4, c: 6 }, 'Значения должны быть умножены на 2');
    });

    QUnit.test('Работает правильно с вложенными объектами', (assert) => {
        const originalObject = { a: 1, b: { c: 2, d: 3 }, e: 4 };
        const transformFunction = (value) => value + 1;
        const result = transform(originalObject, transformFunction);

        assert.deepEqual(result, { a: 2, b: { c: 3, d: 4 }, e: 5 }, 'Значения должны быть увеличены на 1');
    });

    QUnit.test('Работает правильно с массивами', (assert) => {
        const originalObject = { a: [1, 2, 3], b: 4 };
        const transformFunction = (value) => value * 3;
        const result = transform(originalObject, transformFunction);

        assert.deepEqual(result, { a: [3, 6, 9], b: 12 }, 'Элементы массива должны быть умножены на 3');
    });

    QUnit.test('Работает правильно с масcивами объектов', (assert) => {
        const originalObject = { a: [{name: "Alex", age: 21},{name: "Dima", age: 35}]};
        const transformFunction = (value) => typeof value == 'number' ? ++value : value ;
        const result = transform(originalObject, transformFunction);

        assert.deepEqual(
            result,
            { a: [{name: "Alex", age: 22},{name: "Dima", age: 36}] },
            'Возраст должен увеличиться на 1');
    });

    QUnit.test('Преобразует массив со смешанными типами', (assert) => {
        const obj = { a: [1, 'hi', { x: 5 }, true] };
        const result = transform(obj, (value) => {
            if (typeof value === 'number') return value + 1;
            if (typeof value === 'string') return value.toUpperCase();
            return value;
        });
        assert.deepEqual(
            result,
            { a: [2, 'HI', { x: 6 }, true] },
            'Каждый тип обрабатывается своей веткой'
        );
    });

    QUnit.test('Работает правильно с пустыми объектами', (assert) => {
        const originalObject = {};
        const result = transform(originalObject, (value) => value * 2);
        assert.deepEqual(result, {}, 'возвращает пустой объект')
    })
});
