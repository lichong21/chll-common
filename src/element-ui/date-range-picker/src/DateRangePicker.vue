<template>
  <el-date-picker
    v-model="dateRange"
    type="datetimerange"
    :range-separator="rangeSeparator"
    :start-placeholder="startPlaceholder"
    :end-placeholder="endPlaceholder"
    :pickerOptions="pickerOptions"
    :format="showFormat"
    :value-format="valueFormat"
    :default-time="defaultTime"
    :size="size"
    clearable
    @change="changeDateRange"
    @blur="onBlur"
    @focus="onFocus"
  >
  </el-date-picker>
</template>

<script>
import moment from 'moment'
const DATE_PICKER_OPTIONS = {
	shortcuts: [
		{
			text: '今天',
			onClick(picker){
				const start = moment().startOf('day').valueOf()
				const end = moment().endOf('day').valueOf()
				picker.$emit('pick', [new Date(start), new Date(end)])
			}
		},
		{
			text: '昨天',
			onClick(picker){
				const date = moment().subtract(1, 'day')
				const start = moment(date).startOf('day').valueOf()
				const end = moment(date).endOf('day').valueOf()
				picker.$emit('pick', [new Date(start), new Date(end)])
			}
		},
		{
			text: '本周',
			onClick(picker){
				const start = moment().startOf('isoWeek').valueOf()
				const end = moment().endOf('isoWeek').valueOf()
				picker.$emit('pick', [new Date(start), new Date(end)])
			}
		},
		{
			text: '上周',
			onClick(picker){
				const date = moment().subtract(1, 'isoWeek')
				const start = moment(date).startOf('isoWeek').valueOf()
				const end = moment(date).endOf('isoWeek').valueOf()
				picker.$emit('pick', [new Date(start), new Date(end)])
			}
		},
		{
			text: '本月',
			onClick(picker){
				const start = moment().startOf('month').valueOf()
				const end = moment().endOf('month').valueOf()
				picker.$emit('pick', [new Date(start), new Date(end)])
			}
		},
		{
			text: '上月',
			onClick(picker){
				const date = moment().subtract(1,'month')
				const start = moment(date).startOf('month').valueOf()
				const end = moment(date).endOf('month').valueOf()
				picker.$emit('pick', [new Date(start), new Date(end)])
			}
		},
		{
			text: '过去7天',
			onClick(picker){
				const date = moment().subtract(1, 'day')
				const start = moment(date).subtract(6, 'day').startOf('day').valueOf()
				const end = moment(date).endOf('day').valueOf()
				picker.$emit('pick', [new Date(start), new Date(end)])
			}
		},
		{
			text: '过去30天',
			onClick(picker){
				const date = moment().subtract(1, 'day')
				const start = moment(date).subtract(29, 'day').startOf('day').valueOf()
				const end = moment(date).endOf('day').valueOf()
				picker.$emit('pick', [new Date(start), new Date(end)])
			}
		},
		{
			text: '过去60天',
			onClick(picker){
				const date = moment().subtract(1, 'day')
				const start = moment(date).subtract(59, 'day').startOf('day').valueOf()
				const end = moment(date).endOf('day').valueOf()
				picker.$emit('pick', [new Date(start), new Date(end)])
			}
		},
		{
			text: '过去90天',
			onClick(picker){
				const date = moment().subtract(1, 'day')
				const start = moment(date).subtract(89, 'day').startOf('day').valueOf()
				const end = moment(date).endOf('day').valueOf()
				picker.$emit('pick', [new Date(start), new Date(end)])
			}
		},
		{
			text: '过去180天',
			onClick(picker){
				const date = moment().subtract(1, 'day')
				const start = moment(date).subtract(179, 'day').startOf('day').valueOf()
				const end = moment(date).endOf('day').valueOf()
				picker.$emit('pick', [new Date(start), new Date(end)])
			}
		}
	]
}
export default {
  name: 'ClDateRangePicker',
  props: {
    value: {
      required: true,
      type: Array,
      default: () => []
    },
    rangeSeparator: {
      type: String,
      default: '至'
    },
    startPlaceholder: {
      type: String,
      default: '开始日期'
    },
    endPlaceholder: {
      type: String,
      default: '结束日期'
    },
    size: {
      type: String,
      default: 'small'
    },
    showPickerOptions: {
      required: false,
      type: Boolean,
      default: true
    },
    showFormat: {
      type: String,
      default: 'yyyy-MM-dd HH:mm:ss'
    },
    valueFormat: {
      type: String,
      default: 'yyyy-MM-dd HH:mm:ss'
    },
    // defaultDate: {
    //   type: Array,
    //   default: () => []
    // },
    defaultTime: {
      type: Array,
      default: () => [
        '00:00:00',
        '23:59:59'
      ]
    }
  },
  computed: {
    pickerOptions() {
      return this.showPickerOptions ? DATE_PICKER_OPTIONS : {}
    }
  },
  data() {
    return {
      dateRange: []
    }
  },
  watch: {
    value: {
      handler(val) {
        this.dateRange = JSON.parse(JSON.stringify(val))
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    changeDateRange(val) {
			if (val === null) {
				this.dateRange = []
				this.$emit('input', this.dateRange)
				return
			}
      this.$emit('input', val)
    },
    onBlur() {
      this.$emit('input', this.dateRange)
    },
    onFocus() {
      this.$emit('input', this.dateRange)
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/ .el-icon-time {
  margin-left: 2px;
}
</style>