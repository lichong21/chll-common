# chall-common
> chll-commom工具库是根据个人实战开发经验，基于Vue2和ElementUI封装的业务组件库。目前提供的几个业务组件，后续还会不断的完善：

## 使用方式
1、安装方式，支持npm、yarn和pnpm安装
- yarn: `yarn add chll-common`
- npm: `npm install chll-common`
- pnpm: `pnpm install chll-common`
  
2、项目中引入
- 注册为全局组件
	```
	import chllCommon from 'chll-common'
	Vue.use(chllCommon)
	```
- 按需引入
  ```
		import chllCommon from 'chll-common'
		const {
			DateRangePicker,
			Select,
			SearchForm,
			TextEllipsis,
			TableList } = chllCommon
		Vue.use(DateRangePicker).use(Select).use(SearchForm).use(TextEllipsis)
	```

## 支持的业务组件
### TextEllipsis
> TextEllipsis是一个超长文本显示省略号的组件，主要解决webkit内核场景下浏览器渲染问题。支持单行超长文本隐藏，也支持多行文本

#### 参数解读 - prop
|prop| 默认值 | 解释 |
| -- | --- | --- |
| value | 必填 | 要显示的文案
| width | 100% | 指定超长文案隐藏的边界 |
| mulRows | boolean | 是否是多行文本 |
| maxRows | number | 最大行数，换行超过最大行数的时候，显示省略号

#### 使用方式
```
<cl-text-ellipsis
	:value="testStr"
	width="200"
	mulRows
	:maxRows="2"
/>
```

---
## Select 
> 基于ElementUI的select组件封装。ElementUI的select组件使用起来很麻烦，每次都要写options的for循环。该组件主要就是优化了options的写法。

### 参数解读 - prop
| prop | 类型 | 默认值 | 说明
|--|--|--|--|
|value | string \| number \| Array | 必填 | 双向绑定的值
| list| Array | 必填 | 提供下拉选择的枚举项，就是options循环遍历的数组
| ……| 其他的字段基本与原生的一致， 保留了原生的能力 |

### 使用方式
```
<cl-select
	v-model="selectItem"
	:list="options"
	@change="selectChange"
></cl-select>

selectItem: '',
options: [
	{
		key: '123',
		value: '123'
	},
	{
		key: '456',
		value: '456'
	}
]
```

--

## DateRangePicker
> 基于原生的DateTimePicker组件的封装，对业务常用的一些快捷项进行结合，提供了快捷的日期范围选择。

### 参数解读 - prop
| prop | 类型 | 默认值 | 说明
|--|--|--|--|
|value | Array | 必填 | 双向绑定的值
| showPickerOptions | {} | 配置项 | 提供快捷的选择项，今天、昨天、本周、上周、本月、上月、过去7天、过去30天等

### 使用方式
```
<cl-date-range-picker
	v-model="timeRange"
/>
```


---

## SearchForm

---
## TableList