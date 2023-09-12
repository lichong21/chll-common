<template>
  <el-form ref="formRef" :model="formModel" :rules="formRules" inline size="small" class="CL-search-form">
    <el-form-item
      v-for="formItem in formFields"
      :key="formItem.model"
      :prop="formItem.model"
			:label="formItem.label"
    >
      <div v-if="formItem.slot">
        <slot :slot="formItem.slot"></slot>
      </div>

      <div v-else>
        <el-input
          v-if="formItem.template === itemType.input"
          v-model.trim="formModel[formItem.model]"
          :placeholder="formItem.placeholder"
          clearable
        />
				<cl-select
					v-else-if="formItem.template === itemType.select"
					v-model="formModel[formItem.model]"
					:list="formItem.list"
					:placeholder="formItem.placeholder"
					:multiple="formItem.multiple"
					:labelName="formItem.labelName"
					:valueName="formItem.valueName"
					:clearable="formItem.clearable"
					:collapseTags="formItem.collapseTags"
				/>
				<cl-DateRangePicker
					v-else-if="formItem.template === itemType.dateRange"
					v-model="formModel[formItem.model]"
				/>
      </div>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="search">查询</el-button>
      <el-button size="small" @click="resetForm">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import ClSelect from '../../select/src/Select.vue'
import ClDateRangePicker from '../../date-range-picker/src/DateRangePicker.vue'
import { FORM_ITEM_TYPE } from '@/utils/config'

export default {
	name: 'ClSearchForm',
	components: {
		ClSelect,
		ClDateRangePicker
	},
  props: {
    formFields: {
      required: true,
      type: Array
    },
    formRules: {
      required: false,
      type: Object
    },
		value: {
			required: true,
			type: Object
		},
		beforeSubmit: {
			required: false,
			type: Function
		}
  },
  data() {
    return {
      formModel: {},
			itemType: FORM_ITEM_TYPE,
    }
  },
	watch: {
		value: {
			handler(newVal) {
				if (newVal === this.formModel) return
				this.formModel = JSON.parse(JSON.stringify(newVal))
			},
			immediate: true,
			deep: true
		},
		formModel: {
			handler(newVal) {
				this.$emit('input', newVal)
			},
			deep: true
		}
	},
  methods: {
    search() {
			// 如果有提交前的钩子函数，就先进行验证。验证没有通过就拦截
			if (typeof this.beforeSubmit === 'function' && !this.beforeSubmit()) return
      this.$emit('search');
    },
    resetForm() {
      this.$refs.formRef.resetFields();
			this.$nextTick(() => {
				this.$emit('reset');
			})
    }
  }
}
</script>

<style lang="scss" scoped>
.CL-search-form {
	.el-input,
	.el-select {
		width: 260px !important;
	}
}
</style>