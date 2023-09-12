<template>
  <div class="textContainer" :style="{ width: width + 'px' }">
    <div v-if="mulRows" class="text-ellipsis-mul" :style="{'-webkit-line-clamp': maxRows }">
      {{ value || '--' }}
    </div>
    <div v-else class="text-ellipsis-single">
      {{ value || '--' }}
    </div>
  </div>
</template>

<script>
export default {
	name: 'ClTextEllipsus',
  props: {
    value: {
      type: String | Number,
      required: true
    },
    maxRows: {
      type: Number,
      default: 2
    },
    mulRows: {
      type: Boolean,
      default: false
    },
    width: {
      type: String,
      default: '100%'
    }
  }
}
</script>

<style lang="scss" scoped>
.textContainer {
  width: 100%;
  .text-ellipsis-mul {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: warp;
    cursor: pointer;
    display: -webkit-box;
    -webkit-box-orient: vertical;
  }

  .text-ellipsis-single {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    cursor: pointer;
  }
}
</style>