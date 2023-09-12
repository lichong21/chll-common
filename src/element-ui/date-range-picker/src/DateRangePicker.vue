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
import { DATE_PICKER_OPTIONS } from './config'
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