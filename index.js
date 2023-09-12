import Vue from 'vue'
import elementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';


Vue.use(elementUI)

// ------------------------------分割线------------------------------
import Select from './src/element-ui/select'
import TableList from './src/element-ui/table-list'
import TextEllipsis from './src/element-ui/text-ellipsis'
// import DateRangePicker from '.src/element-ui/date-range-picker/src/DateRangePicker'
// import SearchForm from '.src/element-ui/search-form/src/SearchForm'
// import CacheInput from './src/element-ui/cache-input'


const components = [
	// DateRangePicker,
	Select,
	// SearchForm,
	TextEllipsis,
	TableList,
]

function install(Vue) {
	components.forEach(component => {
		Vue.component(component.name, component)
	})
}

export default {
	version: '1.0.1',
	install,
	// DateRangePicker,
	Select,
	// SearchForm,
	TextEllipsis,
	TableList,
}