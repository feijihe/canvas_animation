<script setup>
import { Flip } from '../utils'

const doms = ref([1, 2, 3, 4, 5, 6, 7, 8, 9])
const container = ref()
const router = useRouter()

let flip

function getClass(i) {
  return `scale-${5 - Math.abs(4 - i)}`
}

async function move(i) {
  const middleIndex = Math.floor(doms.value.length / 2) // 中间的索引位置
  if (i === middleIndex)
    return

  // 整体左移，从i到middleIndex的位置，依次交换位置
  const moveCount = Math.abs(i - middleIndex)
  const moveIndex = i > middleIndex ? moveCount : doms.value.length - moveCount // 移动的索引位置

  const rightItems = doms.value.slice(moveIndex)
  const leftItems = doms.value.slice(0, moveIndex)

  doms.value = [...rightItems, ...leftItems]
  // await nextTick()

  flip?.play(doms.value)
}

onMounted(() => {
  console.log(container.value.children, '2222')
  // 计算开发位置
  flip = new Flip(container.value)
})
</script>

<template lang="">
  <div>
    <div ref="container" flex="~ gap3 wrap" items-center justify-center>
      <div
        v-for="num, i in doms"
        :key="num"
        h-40 w-40 text-2xl text-white
        :data-key="num"
        class="card"
        @click="move(i)"
      >
        <div h-full w-full flex="~ wrap" items-center justify-center rounded-full bg-red-500 :className="getClass(i)">
          {{ num }}
        </div>
      </div>
    </div>

    <div>
      <button m-3 mt-8 text-sm btn @click="router.back()">
        Back
      </button>
    </div>
  </div>
</template>

<style lang="postcss">
/* .card {
  transition: transform 0.5s ease-in-out;
} */
.scale-1 {
  transform: scale(0.4);
}
.scale-2 {
  transform: scale(0.55);
}
.scale-3 {
  transform: scale(0.7);
}
.scale-4 {
  transform: scale(0.85);
}
.scale-5 {
  transform: scale(1);
}
</style>
