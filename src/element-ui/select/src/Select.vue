<template>
  <el-select
    v-model="selectValue"
    clearable
    :size="size"
    :multiple="multiple"
    :multiple-limit="multipleLimit"
    :collapse-tags="collapseTags"
    :filterable="filterable"
    :placeholder="placeholder"
		:disabled="disabled"
    @change="changeSelect"
    @visible-change="visibleChange"
    @clear="clearSelect"
    @remove-tag="removeTag"
  >
    <el-option
      v-for="(item, index) in list"
      :key="index"
      :label="item[labelName]"
      :value="item[valueName]"
      :disabled="item.disabled"
    />
  </el-select>
</template>

<script>

export default {
  name: 'ClSelect',
  props: {
    value: {
      required: true,
      type: String | Array | Number
    },
    list: {
      required: true,
      type: Array
    },
    multiple: {
      required: false,
      type: Boolean,
      default: false
    },
    valueKey: {
      required: false,
      type: String,
      default: 'value'
    },
    placeholder: {
      required: false,
      type: String,
      default: '请选择'
    },
    filterable: {
      required: false,
      type: Boolean,
      default: true
    },
    labelName: {
      required: false,
      type: String,
      default: 'value'
    },
    valueName: {
      required: false,
      type: String,
      default: 'key'
    },
    multipleLimit: {
      required: false,
      type: Number,
      default: 0
    },
    collapseTags: {
      required: false,
      type: Boolean,
      default: false
    },
    size: {
      required: false,
      type: String,
      default: 'small'
    },
		clearable: {
			required: false,
      type: Boolean,
      default: true
		},
		disabled: {
			required: false,
			type: Boolean,
			default: false
		}
  },
  data() {
    return {
      selectValue: ''
    }
  },
  watch: {
    value: {
      handler(val) {
        this.selectValue = JSON.parse(JSON.stringify(val))
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    changeSelect(val) {
      this.$emit('input', this.selectValue);
      if (this.multiple) {
        this.$emit('change', val[val?.length-1], this.selectValue);
      } else {
        this.$emit('change', val);
      }
    },
    clearSelect() {
      this.$emit('clear', this.selectValue);
      this.$emit('input', this.selectValue);
    },
    removeTag(val) {
      this.$emit('remove-tag', val, this.selectValue);
      this.$emit('input', this.selectValue);
    },
    visibleChange(val) {
      this.$emit('visible-change', val);
    }
  }
}
</script>

<style lang="scss" scoped>

</style>