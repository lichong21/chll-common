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
> 基于el-form和表单其他项封装的组件，主要作用是填充后台查询模块的查询表单。目前支持Input、Select和 DateRangePicker等三个类型的项，后续会不断的扩充。
### 参数解读
| prop | 类型 | 默认值 | 说明
|--|--|--|--|
|value| {} | 必填 | 表单的双向绑定值
| formFields | {} | 必填 | 查询项的配置
| formRules | {} | 非必填 | 表单的校验
|  boforeSubmit | Fn | 非必填 | 点击查询，触发请求之前的表单自定义校验

### 使用方式
```
<KFSearchForm
	v-model="searchForm"
	:formFields="formFields"
	@search="queryTableData"
	@reset="resetTable"
/>
```

---
## TableList
> 基于原生的el-table组件，结合了el-paginaion功能。支持表格列的配置和、请求参数的构造、请求发起时的loading、响应值的处理和翻页等功能。是一个高集成的功能强大的组件,支持自定义表格数据和表格头。

### 参数解读  - prop
| prop | 类型 | 默认值 | 说明
|--|--|--|--|
tableConfig|对象 | {data: [], columnList: [], total: null, laoding: false} | data:是表格要渲染数据的集；columnList：代表表格列的配置项；total：代表当前查询条件下的数据总数；loading：代表表格查询时的加载状态
| pageConfig| | {pageSizes:[100, 200, 300, 400],pageSize: 100} | 翻页配置项
|requestFn| Fn | 非必填 | 请求方法
|requestParams| {} | 非必填 | 请求方法的参数
|handleResponseFn| Fn| 非必填 | 处理返回值的方案
|……||||

### 使用方式
```
<TableCom
	ref="tableRef"
	:tableConfig="tableConfig"
	:requestFn="getLogOffList"
	:requestParams="buildSearchFormParams()"
	:pageConfig="pageConfig"
	selection
	:selectable="filterSelectableRow"
	@selectionChange="handleSelectionChange"
>
```
---
## TransitionCollpase
> 基于Vue原生的transition组件，利用transition的钩子函数，在动画的不同阶段调整元素的transition-property属性，实现了折叠效果。目前只支持上下折叠，左右折叠的实现啊原理相同。具体来说，就是
> - 在before-enter的阶段: 记录元素的paddingTop、paddingBottom的值和并重置为0
> - 在enter-active的阶段：设置元素的paddingTop、paddingBottom为原始值，记录overflow的原始值然后设置为hidden
> - 在after-enter的阶段：恢复元素的overflow原始值
> - 在before-leave的阶段：记录元素的paddingTop、paddingBottom的值和overflow为hidden
> - 在leave-active的阶段：设置元素的paddingTop、paddingBottom为0
> - 在after-leave的阶段：恢复元素的paddingTop、paddingBottom为原始值，并设置overflow为原始值
```
<TransitionCollpase>
	slot
</TransitionCollpase>
```