import { computed, defineComponent, onMounted, reactive, ref } from 'vue'
import { virtualListProps } from './index'
import { createNamespace } from '@ch/utils/create'

export default defineComponent({
  name: 'CVirtualList',
  props: virtualListProps,
  setup(props, { slots }) {
    const bem = createNamespace('virtual-list')

    // 计算需要渲染的数据
    const state = reactive({
      start: 0,
      end: props.max
    })
    // 为了防止快速滚动白屏的问题，上线增加两屏的数据
    const prev = computed(() => {
      return Math.min(state.start, props.max)
    })
    const next = computed(() => {
      return Math.min(props.items.length - state.end, props.max)
    })
    const visibleData = computed(() => {
      console.log(
        `start = ${state.start};prev=${prev.value}; end=${state.end};next=${next.value}`
      )
      return props.items.slice(state.start - prev.value, state.end + next.value)
    })
    // 设置容器高度
    const wrapperRef = ref<HTMLElement>()
    const scrollRef = ref<HTMLElement>()

    onMounted(() => {
      wrapperRef.value!.style.height = props.max * props.size + 'px'
      scrollRef.value!.style.height = props.items.length * props.size + 'px'
    })

    // 偏移量
    const offset = ref(0)
    // 滚动动态计算展示的数据
    const handleScroll = () => {
      // todo 做一下
      const offTop = wrapperRef.value!.scrollTop
      state.start = Math.floor(offTop / props.size)
      state.end = state.start + props.max
      console.log(`已经加载${visibleData.value.length}条数据`)
      offset.value = state.start * props.size - prev.value * props.size
    }
    return () => {
      return (
        <div class={bem.b()} ref={wrapperRef} onScroll={handleScroll}>
          <div class={bem.b('scroll-bar')} ref={scrollRef}></div>
          <div
            class={bem.e('scroll-list')}
            style={{ transform: `translate3d(0,  ${offset.value}px, 0)` }}
          >
            {visibleData.value.map(node => slots.default!({ node }))}
          </div>
        </div>
      )
    }
  }
})
