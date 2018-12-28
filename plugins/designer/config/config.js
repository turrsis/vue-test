import directivesSsr from '../directives/directives.ssr.js'
import utils from './../utils.js'
import configRoutes from '../config/config.routes.js'

export default utils.objectAssignDeep({}, configRoutes, {
    routesConfig: {
        configFile: 'plugins/designer/config/config.routes.js'
    },
    compiler: {
        'vue$': {
            compilerOptions: {
                directives : directivesSsr,
                modules: [{
                    // preTransformNode: (node, options) => { return node }
                }]
                /*comments: true,
                outputSourceRange: true,
                preserveWhitespace: false,
                shouldKeepComment: true,
                shouldDecodeNewlines: true,*/
            }
        }
    },
    dev: {
        devtool: '#eval-source-map' // '#source-map'  '#cheap-module-source-map'
    },
    directives: {
        name: 'designer',
        attrName: 'designer-directive',
        attrChilds: 'designer-childs',
    },
    styleZIndex: 9999999,
    dnd: {
        dragOver: {
            gap: [-10, 10],
            marker: 'marker'
        },
        startShift: 3,
        drag: {
            sourceStyle: {
                marker: {
                    position: 'absolute',
                    backgroundColor: 'lightcoral',
                    opacity: 0.5
                },
                element: {
                    position: null,
                    left: null,
                    top: null,
                    backgroundColor: 'green',
                }
            },
            markerStyle: {
                default: {
                    padding: '0px',
                    margin: '0px',
                    borderStyle: 'none',
                    borderWidth: '0px',
                    position: 'absolute',
                    pointerEvents: 'none',
                    display: 'none',
                    opacity: 0.7
                },
                drop: {
                    true: {
                        backgroundColor: 'green',
                        display: 'block'
                    },
                    false: {
                        backgroundColor: 'red',
                        display: 'block'
                    },
                    null: {
                        display: 'none'
                    }
                },
            }
        }
    },
    apiUrl: '/api/designer/'
})