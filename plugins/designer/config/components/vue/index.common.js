export default {
    attributes: {},
    directives: {
        'v-for': {
            title: 'для отрисовки списка элементов на основе массива данных',
            type: 'String',
            default: null,
            values: {
                'item in items': 'где items — исходный массив, а item — ссылка на текущий элемент массива',
                'value in object': 'итерация по свойствам объекта',
                '(value, key, index) in object': 'итерация по свойствам объекта'
            },
            modifiers: {}
        },
        ':key': {
            title: 'для отслеживания идентичности каждого элемента (используется с v-for)',
            type: undefined,
            default: undefined,
            values: {},
            modifiers: {}
        },
        'v-bind': {
            title: 'для динамической передачи данных во входные параметры (используется с v-for)',
            type: undefined,
            default: undefined,
            values: {},
            modifiers: {},
            reduction: ':',
            arguments: {
                href: 'аргумент, указывающий директиве связать атрибут href элемента со значением выражения'
            }
        },
        'v-html': {
            title: '',
            type: undefined,
            default: undefined,
            values: {},
            modifiers: {}
        },
        'v-on': {
            title: 'для привязки событий',
            type: undefined,
            default: undefined,
            values: {},
            modifiers: {},
            reduction: '@',
            arguments: {
                'event name': 'имя привязываемого события'
            }
        },
        'v-model': {
            title: '',
            type: undefined,
            default: undefined,
            values: {},
            modifiers: {}
        },
        'v-if': {
            title: 'рендеринг блока по условию',
            type: undefined,
            default: undefined,
            values: {},
            modifiers: {}
        },
        'v-else': {
            title: 'рендеринг блока по условию ЕСЛИ',
            type: undefined,
            default: undefined,
            values: {},
            modifiers: {}
        },
        'v-else-if': {
            title: 'рендеринг блока по условию ЕСЛИ',
            type: undefined,
            default: undefined,
            values: {},
            modifiers: {}
        },
        'v-show': {
            title: 'условное отображение. Элемент всегда будет оставаться в DOM, меняется только свойство display в CSS',
            type: undefined,
            default: undefined,
            values: {},
            modifiers: {}
        }
    },
    events: {
    }
}