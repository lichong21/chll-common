<template>
  <div class="table-contianer">
    <el-table
      v-loading="tableConfig.loading"
      :data="tableConfig.data"
      style="width: 100%"
      border
      stripe
      size="small"
			@selection-change="handleSelectionChange"
    >
			<el-table-column v-if="selection" type="selection" :selectable="selectable" width="50"></el-table-column>
      <el-table-column
        v-for="column in tableConfig.columnList"
        :key="column.prop"
        :label="column.label"
        :width="column.width"
        :min-width="column.minWidth"
        :fixed="column.fixed"
        :show-overflow-tooltip="column.showOverflowTooltip"
        resizable
			>

				<template slot="header" slot-scope="scope">
					<div>
						<span v-if="!column.header">{{ column.label }}</span>
						<slot v-else :name="column.slot + 'Header'" :column="scope.column"></slot>
					</div>
				</template>

        <template slot-scope="scope">
          <div v-if="column.slot">
            <slot :name="column.slot" :row="scope.row"></slot>
          </div>
          <div v-else>
            <el-tooltip effect="dark" :content="scope.row[column.prop]+''" placement="top-start">
              <!-- <span>{{  scope.row[column.prop]  }}</span> -->
              <cl-text-ellipsis
                :value="scope.row[column.prop]+''"
                :mulRows="true"
              />
            </el-tooltip>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      v-show="showPagination"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="pageConfig.pageSizes"
      :page-size="pageConfig.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="tableConfig.total"
    >
    </el-pagination>
  </div>
</template>

<script>
import ClTextEllipsis from '../../text-ellipsis/src/TextEllipsis.vue'
export default {
	name: 'ClTableList',
  components: {
    ClTextEllipsis
  },
  props: {
    tableConfig: {
      type: Object,
      required: true,
      default: () => ({
        data: [],
        columnList: [],
        total: null,
        loading: false
      })
    },
    pageConfig: {
      type: Object,
      required: false,
      default: () => ({
        pageSizes:[100, 200, 300, 400],
        pageSize: 100
      })
    },
    hidePagination: {
      required: false,
      type: Boolean,
      default: false
    },
    otherConfig: {
      type: Object,
      required: false,
      default: () => ({
        height: 'auto'
      })
    },
		requestFn: {
			required: false,
			type: Function
		},
		requestParams: {
			required: false,
			type: Object
		},
		handleResponseFn: {
			required: false,
			type: Function
		},
		selection: {
			required: false,
			type: Boolean,
			default: false
		},
		selectable:{
			required: false,
			type: Function,
			default: () => true
		},
  },
  data() {
    return {
      currentPage: 1,
      currentPageSize: this.pageConfig.pageSize,
    }
  },
  computed: {
    showPagination() {
      return this.tableConfig.total > 0 && this.tableConfig.data.length && !this.hidePagination;
    }
  },
  methods: {
		handleSelectionChange(selection) {
			this.tableConfig.selection = selection;
			this.$emit('selectionChange', selection)
		},
    handleSizeChange(val) {
      this.currentPageSize = val;
      this.currentPage = 1;
      this.pageConfigChange();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.pageConfigChange();
    },
    pageConfigChange() {
			this.$emit('paginationChange', { page: this.currentPage, size: this.currentPageSize })
			this.fetchTableData()
    },
		fetchTableData() {
			if (typeof this.requestFn !== 'function' || !this.requestParams) return
			this.tableConfig.loading = true;
			this.requestFn({
				...this.requestParams,
				page: this.currentPage,
				page_size: this.currentPageSize
			}).then((res) => {
				const { list,  data_list, total = 0 } = res?.data || {};
				this.tableConfig.total = total;
				const data = list || data_list || []
				const hasHandleFn = this.handleResponseFn &&  typeof this.handleResponseFn === 'function'
				this.tableConfig.data = hasHandleFn ? this.handleResponseFn(data) : data
				
			}).catch(() => {
				this.tableConfig.data = [];
				this.tableConfig.total = 0;
			}).finally(() => {
				this.tableConfig.loading = false;
			})
		},
		queryData() {
			if (typeof this.requestFn !== 'function' || !this.requestParams) return
			this.resetPageConfig()
			this.pageConfigChange();
		},
		resetPageConfig() {
			this.currentPage = 1;
		}
	},
}
</script>

<style lang="scss" scoped>
.table-contianer {
  background-color: white;
  border-radius: 4px;
  // padding: 0px 10px;
  .opreationNav {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 6px;
  }
}
</style>