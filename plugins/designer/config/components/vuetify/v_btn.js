export default {
    name: 'v-btn',
    title: 'кнопка',
    events: {},
    attributes: {},
    directives: {},
    slots: {
        default: {
            allowedComponents: ['v-icon', 'html-*']
        }
    },
    props: {
        'absolute': {
            title: 'Позиционировать элемент абсолютно',
            type: 'Boolean',
            default: false
        },

        'activeClass': {
            title: 'Класс связан, когда компонент активен',
            type: 'String',
            default: 'v-btn--active'
        },
        'append': {
            title: 'Vue Router router-link',
            type: 'Boolean',
            default: false
        },
        'block': {
            title: 'Расширяет кнопку до 100% доступного пространства',
            type: 'Boolean',
            default: false
        },
        'bottom': {
            title: 'Выровнять компонент по нижнему краю',
            type: 'Boolean',
            default: false
        },
        'color': {
            title: 'Применяет заданный цвет к элементу управления',
            type: 'String',
            default: undefined
        },
        'dark': {
            title: 'Применяет тёмный вариант темы',
            type: 'Boolean',
            default: false
        },
        'depressed': {
            title: 'Удаляет тень кнопки',
            type: 'Boolean',
            default: false
        },
        'disabled': {
            title: 'Элемент маршрута отключён',
            type: 'Boolean',
            default: false
        },
        'exact': {
            title: 'Точно сопоставьте ссылку. Без этого «/» будет соответствовать каждому маршруту',
            type: 'Boolean',
            default: false
        },
        'exact-active-class': {
            title: 'Vue Router router-link',
            type: 'String',
            default: undefined
        },
        'fab': {
            title: 'Делает кнопку круглой',
            type: 'Boolean',
            default: false
        },
        'fixed': {
            title: 'Установите фиксированный элемент',
            type: 'Boolean',
            default: false
        },
        'flat': {
            title: 'Удаляет цвет фона кнопки',
            type: 'Boolean',
            default: false
        },
        'href': {
            title: 'Обозначает тег компонента <a>',
            type: ['String', 'Object'],
            default: undefined
        },
        'icon': {
            title: 'Назначает кнопку в виде значка - круглый и плоский',
            type: 'Boolean',
            default: false
        },
        'large': {
            title: 'Кнопка большого размера',
            type: 'Boolean',
            default: false
        },
        'left': {
            title: 'Выровнять компонент слева',
            type: 'Boolean',
            default: false
        },
        'light': {
            title: 'Применяет светлый вариант темы',
            type: 'Boolean',
            default: false
        },
        'loading': {
            title: 'Добавляет анимацию иконок загрузки',
            type: 'Boolean',
            default: false
        },
        'nuxt': {
            title: 'Указывает, что ссылка является nuxt-link',
            type: 'Boolean',
            default: false
        },
        'outline': {
            title: 'Кнопка будет иметь контур',
            type: 'Boolean',
            default: false
        },
        'replace': {
            title: 'Vue Router router-link',
            type: 'Boolean',
            default: false
        },
        'right': {
            title: 'Выровнять компонент справа',
            type: 'Boolean',
            default: false
        },
        'ripple': {
            title: 'Применяет директиву v-ripple',
            type: ['Boolean', 'Object'],
            default: null
        },
        'round': {
            title: 'Кнопка будет круглой по бокам',
            type: 'Boolean',
            default: false
        },
        'small': {
            title: 'Кнопка малого размера',
            type: 'Boolean',
            default: false
        },
        'tag': {
            title: 'Укажите настраиваемый тег для использования в компоненте',
            type: 'String',
            default: 'button'
        },
        'target': {
            title: 'Укажите целевой атрибут, работает только с тегом привязки.',
            type: 'String',
            default: undefined
        },
        'to': {
            title: 'Обозначает тег компонента <router-link>',
            type: ['String', 'Object'],
            default: undefined
        },
        'top': {
            title: 'Выровнять компонент в по верхнему краю',
            type: 'Boolean',
            default: false
        },
        'type': {
            title: 'Установите атрибут типа кнопки',
            type: 'String',
            default: 'button'
        },
        'value': {
            title: 'Контроль видимости',
            type: 'any', // null as any as PropValidator<any>
            default: undefined
        },
    }
}