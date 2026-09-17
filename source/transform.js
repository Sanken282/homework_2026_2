'use strict';

/**
 * Применяет transformFn ко всем значениям объекта obj.
 * Вложенные объекты обрабатывает рекурсивно, массивы — поэлементно.
 *
 * @param {Object} obj - объект для преобразования
 * @param {Function} transformFn - функция преобразования значения
 * @returns {Object} новый объект с преобразованными значениями
 *
 * @example
 * // Вернёт {a: 3, b: [3, 6, 9]}
 * transform({a: 1, b: [1, 2, 3]}, (v) => v * 3);
 */

function transform(obj, transformFn) {
    if (typeof obj !== 'object' || obj === null || Array.isArray(obj)) {
        throw new TypeError('Первый аргумент должен быть объектом (не null и не массивом)!');
    }
    if (typeof transformFn !== 'function') {
        throw new TypeError('Второй аргумент должен быть функцией!');
    }

    const transformVal = (value) =>
        Array.isArray(value)
            ? value.map(transformVal)
            : typeof value === 'object' && value !== null
                ? transform(value, transformFn)
                : transformFn(value);

    return Object.fromEntries(
        Object.entries(obj).map(([key, value]) => [key, transformVal(value)])
    );
}
