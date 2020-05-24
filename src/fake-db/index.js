import mock from './mock'


import './data/table/index.js'


mock.onAny().passThrough() // forwards the matched request over network
