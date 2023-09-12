<template>
  <el-popover
    :value="popoverVisible"
    placement="bottom"
    :width="width"
    trigger="manual"
    class="cl-popover"
    :append-to-body="false"
  >
    <ul class="cl-popover-list">
      <li
        v-for="(item) in cacheList"
        :key="item"
        @click="selectItem(item)"
        class="cl-popover-item"
      >
        {{ item }}
      </li>
    </ul>
    <template slot="reference">
      <el-input
        v-model="inputValue"
        size="small"
        :placeholder="placeholder"
        @input="handleInput"
        @blur="handleInputBlur"
        @focus="handleInputFocus"
        clearable
        :style="{width: width + 'px'}"
      />
    </template>
  </el-popover>
</template>

<script>
import { mapGetters } from 'vuex';
import { isEmptyString } from '@/utils/commonTools'
let cid =  1;
export default {
  name: 'ClCacheInput',
  props: {
    value: {
      required: true,
      type:  String | Number
    },
    placeholder: {
      required: false,
      type:  String,
      default: '请输入'
    },
    width: {
      required: false,
      type: Number,
      default: 260
    },
    limit: {
      required: false,
      type: Number,
      default: 5
    },
    cacheProp: {
      required: true,
      type: String,
    }
  },
  data () {
    return {
      inputValue: this.value,
      inputFocus: false,
      cacheList: []
    }
  },
  computed: {
    ...mapGetters(['projectInfo']),
    popoverVisible() {
      return isEmptyString(this.inputValue) && this.inputFocus && this.cacheList.length > 0;
    },
    cacheKey() {
      // 通过项目、路由和具体的KEY，保证localStorage的缓存key的唯一性
      const { cloudId } = this.projectInfo || {};
      const { path } = this.$route || {};
      return `${cloudId}${path.split('/').join('-')}-${this.cacheProp}`;
    }
  },
  watch: {
    value(val) {
      this.inputValue  = val;
    },
    inputValue(val) {
      this.$emit('input',  typeof val  === 'number' ? val : val.trim());
    }
  },
  methods: {
    handleInput(val) {
      // this.$emit('input', val.trim())
    },
    handleInputBlur() {
      this.inputFocus = false;
    },
    handleInputFocus() {
      this.inputFocus = true;
      this.cacheList = this.getLocalCache(this.cacheKey);
    },
    selectItem(item) {
      this.inputValue =  item;
    },
    getLocalCache() {
      if (isEmptyString(this.cacheKey)) return [];
      return JSON.parse(window.sessionStorage.getItem(this.cacheKey)) || [];
    },
    setLocalCache(value) {
      if (isEmptyString(value) || isEmptyString(this.cacheKey)) return;
      let cachedList = this.getLocalCache(this.cacheKey);
      const valueIndex =  cachedList.indexOf(value);
      // 如果查询条件已经被缓存，就调整缓存顺序；把已经缓存的放到数组开头
      if (valueIndex !== -1) {
        cachedList.splice(valueIndex, 1);
        cachedList.unshift(value);
        window.sessionStorage.setItem(this.cacheKey, JSON.stringify(cachedList));
        return;
      }
      cachedList.unshift(value);
      if (cachedList.length  > this.limit) {
        cachedList = cachedList.slice(0, this.limit);
      }
      window.sessionStorage.setItem(this.cacheKey, JSON.stringify(cachedList));
    },
    removeLocalCache() {
      window.sessionStorage.removeItem(this.cacheKey);
    }
  },
  mounted() {
    // 通过刷新页面的方式，无法触发组件的destroyed的生命周期，所以采用在组件重新加载的时候清除缓存。
    // this.removeLocalCache();
  }
}
</script>

<style lang="scss" scoped>

.cl-popover {
  z-index: 10;
  
  /deep/ .el-popover {
    top: 42px;
    max-height: 200px;
    overflow: scroll;
    padding: 0px !important;
  }
  &-list {
    margin-top: 10px;
  }
  &-item {
    font-size: 14px;
    padding: 0 20px;
    position: relative;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #606266;
    height: 34px;
    line-height: 34px;
    cursor: pointer;
  }
  &-item:hover {
    background-color: #F5F7FA;
  }
  &-item:selected {
    color: #1890ff;
  }
}
</style>
<style>
.cl-popover-popper {
  top: 42px;
  max-height: 200px;
  overflow: scroll;
  padding: 0px !important;
}
</style>