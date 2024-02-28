<template>
  <div ref="monacoEditorRef" :style="monacoEditorStyle"></div>
  <el-button :disabled="editorError" type="primary" class="sub" @click="sub">提交</el-button>
</template>

<script setup lang="ts">
import { useMonacoEditor } from './CodeEditor.hook'
import { onMounted, computed, watch, ref } from 'vue'
var editorError:any = ref(false)
const props = withDefaults(defineProps<{
  width?: string | number,
  height?: string | number,
  language?: string,
  editorOption?: Object,
  modelValue: string
}>(), {
  width: '800px',
  height: '600px',
  language: 'json',
  editorOption: () => ({}),
  modelValue: ''
})

const emits = defineEmits<{
  (e: 'blue'): void,
  (e: 'change', val: string): void
  (e: 'sub'): void
}>()

const sub = () => {
  emits('sub');
}
const { monacoEditorRef, createEditor, updateVal, updateOptions, getEditor } = useMonacoEditor(props.language)
const monacoEditorStyle = computed(() => {
  return {
    width: typeof props.width === 'string' ? props.width : props.width + 'px',
    height: typeof props.height === 'string' ? props.height : props.height + 'px'
  }
})

onMounted(() => {
  const monacoEditor = createEditor(props.editorOption)
  updateMonacoVal(props.modelValue)
  monacoEditor?.onDidChangeModelContent(() => {
    let value = monacoEditor!.getValue()
    try{
      JSON.parse(value)
      emits('change', value)
      editorError.value = false
    }catch(e){
      editorError.value = true
    }
  })
  monacoEditor?.onDidBlurEditorText(() => {
    emits('blue')
  })
})

watch(() => props.modelValue, () => {
  updateMonacoVal(props.modelValue)
})

function updateMonacoVal(val: string) {
  if (val !== getEditor()?.getValue()) {
    updateVal(val)
  }
}

defineExpose({ updateOptions })
</script>

<style scoped>
.sub{
  width: 100%;
}
</style>