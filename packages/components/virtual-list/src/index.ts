import { PropType } from 'vue'

export const virtualListProps = {
  items: {
    type: Array as PropType<unknown[]>,
    default: () => []
  },
  size: {
    type: Number,
    default: 30
  },
  max: {
    type: Number,
    default: 8
  }
} as const
