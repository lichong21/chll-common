<template>
  <transition
    :name="transitionName"
    @before-enter="collapseBeforeEnter"
    @enter="collapseEnter"
    @after-enter="collapseAfterEnter"
    @before-leave="collapseBeforeLeave"
    @leave="collapseLeave"
    @after-leave="collapseAfterLeave">
    <slot></slot>
  </transition>
</template>

<script>
/**
 * 元素折叠过度效果
 */
export default {
  name: 'ClCollapseTransition',
  props: {
    transitionName: {
      type: String,
      default: 'collapse-transition'
    }
  },
  data () {
    return {
      oldPaddingTop: '',
      oldPaddingBottom: '',
      oldOverflow: ''
    }
  },
  methods: {
    collapseBeforeEnter (el) {
      this.oldPaddingBottom = el.style.paddingBottom;
      this.oldPaddingTop = el.style.paddingTop;
      // 过渡效果开始前设置元素的maxHeight为0，让元素maxHeight有一个初始值
      el.style.paddingTop = '0';
      el.style.paddingBottom = '0';
      el.style.maxHeight = '0';
    },
    collapseEnter (el, done) {
      console.log('22, collapseEnter');
      this.oldOverflow = el.style.overflow;
      let elHeight = el.scrollHeight;
      // 过渡效果进入后将元素的maxHeight设置为元素本身的高度，将元素maxHeight设置为auto不会有过渡效果
      if (elHeight > 0) {
        el.style.maxHeight = elHeight + 'px';
      } else {
        el.style.maxHeight = '0';
      }
      el.style.paddingTop = this.oldPaddingTop;
      el.style.paddingBottom = this.oldPaddingBottom;

      el.style.overflow = 'hidden';
      let onTransitionDone = function () {
        done();
        el.removeEventListener('transitionend', onTransitionDone, false);
        el.removeEventListener('transitioncancel', onTransitionDone, false);
      };
      // 绑定元素的transition完成事件，在transition完成后立即完成vue的过度动效
      el.addEventListener('transitionend', onTransitionDone, false);
      el.addEventListener('transitioncancel', onTransitionDone, false);
    },
    collapseAfterEnter (el) {
      // 过渡效果完成后恢复元素的maxHeight
      el.style.maxHeight = '';
      el.style.overflow = this.oldOverflow;
    },
    collapseBeforeLeave (el) {
      this.oldPaddingBottom = el.style.paddingBottom;
      this.oldPaddingTop = el.style.paddingTop;
      this.oldOverflow = el.style.overflow;

      el.style.maxHeight = el.scrollHeight + 'px';
      el.style.overflow = 'hidden';
    },
    collapseLeave (el, done) {
      // console.log('55, collapseLeave', el.scrollHeight);
      if (el.scrollHeight !== 0) {
        el.style.maxHeight = '0';
        el.style.paddingBottom = '0';
        el.style.paddingTop = '0';
      }
      let onTransitionDone = function () {
        done();
        el.removeEventListener('transitionend', onTransitionDone, false);
        el.removeEventListener('transitioncancel', onTransitionDone, false);
      };
      // 绑定元素的transition完成事件，在transition完成后立即完成vue的过度动效
      el.addEventListener('transitionend', onTransitionDone, false);
      el.addEventListener('transitioncancel', onTransitionDone, false);
    },
    collapseAfterLeave (el) {
      el.style.maxHeight = '';
      el.style.overflow = this.oldOverflow;
      el.style.paddingBottom = this.oldPaddingBottom;
      el.style.paddingTop = this.oldPaddingTop;

			// 动画周期结束，恢复初始值。不影响下一次动画效果
      this.oldOverflow = this.oldPaddingBottom = this.oldPaddingTop = '';
    }
  }
};
</script>

<style lang="scss">
.collapse-transition-enter-active,
.collapse-transition-leave-active{
  transition: height .3s ease-in-out, padding .3s ease-in-out, max-height .3s ease-in-out;
}
</style>