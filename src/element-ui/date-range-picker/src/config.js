import moment from 'moment'
export const DATE_PICKER_OPTIONS = {
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