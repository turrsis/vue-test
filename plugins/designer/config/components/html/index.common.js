export default {
    attributes: {
        id: {
            title: 'Определяет идентификатор (ID), который должен быть уникален для всего документа',
            type: 'String',
            default: undefined,
            values: undefined,
            experimental: false
        },
        accesskey: {
            title: 'Дает подсказку для создания комбинации клавиш для текущего элемента',
            type: undefined,
            default: undefined,
            values: undefined,
            experimental: false
        },
        class: {
            title: 'Это список разделенных пробелами классов элемента',
            type: undefined,
            default: undefined,
            values: undefined,
            experimental: false
        },
        contenteditable: {
            title: 'Это перечислимый атрибут, указывающий, нужно ли предоставить пользователю возможность редактировать элемент',
            type: Boolean,
            default: false,
            values: {
                true : 'элемент можно редакрировать',
                false : 'элемент нельзя редакрировать'
            },
            experimental: false
        },
        contextmenu: {
            title: 'Это id элемента <menu>, который следует использовать в качестве контекстного меню для данного элемента',
            type: undefined,
            default: undefined,
            values: undefined,
            experimental: false
        },
        data: {
            title: 'Определяет группу атрибутов, называемых атрибутами пользовательских данных, позволяющих осуществлять обмен служебной информацией между HTML и его DOM представлением, что может быть использовано скриптами.',
            type: undefined,
            default: undefined,
            values: undefined,
            experimental: false
        },
        dir: {
            title: 'Это перечислимый атрибут указывающий направление текста в элементе',
            type: undefined,
            default: undefined,
            values: {
                ltr: 'предназначено для языков, в которых пишут слева направо (left to right)',
                rtl: 'предназначено для языков, в которых пишут справа налево (right to left)'
            },
            experimental: true
        },
        draggable: {
            title: 'Это перечислимый атрибут, указывающий, можно ли перетаскивать элемент используя Drag and Drop API.',
            type: undefined,
            default: undefined,
            values: {
                true: 'элемент можно перетаскивать',
                false: 'элемент нельзя перетаскивать'
            },
            experimental: true
        },
        dropzone: {
            title: 'Это перечислимый атрибут, указывающий типы содержимого, которое можно перетащить в элемент с использованием Drag and Drop API.',
            type: undefined,
            default: undefined,
            values: {
                copy: 'указывающее, что перетаскивание создаст копию перетаскиваемого элемента',
                move: 'указывающее, что перетаскиваемый элемент будет перемещен в новое расположение',
                link: 'создаст ссылку на перетаскиваемые данные',
            },
            experimental: true
        },
        hidden: {
            title: 'Это логический атрибут, указывающий, что элемент уже (или еще) не актуален',
            type: undefined,
            default: undefined,
            values: {
                true: '',
                false: ''
            },
            experimental: false
        },
        lang: {
            title: 'Участвует в определении языка элемента, языка написания нередактируемых элементов или языка, на котором должны быть написаны редактируемые элементы',
            type: undefined,
            default: undefined,
            values: {},
            experimental: false
        },
        style: {
            title: 'Содержит описание стилей CSS, которые должны быть применены к элементу.',
            type: undefined,
            default: undefined,
            values: {},
            experimental: false
        },
        tabindex: {
            title: '',
            type: undefined,
            default: undefined,
            values: {
                '<0': 'элемент фокусируемый, но он не может получить фокус посредством последовательной навигации с клавиатуры',
                '0': 'элемент фокусируемый и может получить фокус посредством последовательной навигации с клавиатуры, но порядок его следования определяется платформой',
                '>0': 'элемент фокусируемый и может получить фокус посредством последовательной навигации с клавиатуры. Порядок его следования определяется значением атрибута'
            },
            experimental: false
        },
        title: {
            title: 'Содержит текст, предоставляющий консультативную информацию об элементе',
            type: undefined,
            default: undefined,
            values: {},
            experimental: false
        },
        translate: {
            title: 'перечислимый атрибут, используемый для того, чтобы указать, следует ли переводить значения атрибутов элемента и его текстовое содержимое (содержимое узла Text) при локализации страницы',
            type: undefined,
            default: undefined,
            values: {
                yes: 'элемент должен быть переведен',
                no: 'элемент не должен быть переведен'
            },
            experimental: false
        }
    },
    events: {
    }
}