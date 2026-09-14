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
 * // Вернёт {a: 2, b: [3, 6, 9]}
 * transform({a: 1, b: [1, 2, 3]}, (v) => v * 3);
 */

function transform(obj, transformFn) {
    const result = {};

    for (const key in obj) {
        const value = obj[key];

        if (Array.isArray(value)) {
            const newArr = [];
            for (let i = 0; i < value.length; i++) {
                const item = value[i];
                if (typeof item === 'object' && item !== null) {
                    newArr.push(transform(item, transformFn));
                } else {
                    newArr.push(transformFn(item));
                }
                result[key] = newArr;
            }
        } else if (typeof value === 'object' && value !== null) {
            result[key] = transform(value, transformFn);
        } else {
            result[key] = transformFn(value);
        }
    }

    return result;
}