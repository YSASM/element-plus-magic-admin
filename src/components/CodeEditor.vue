<template>
  <div ref="monacoEditorRef" :style="monacoEditorStyle"></div>
  <el-button v-if="!hideSub" :disabled="editorError" type="primary" class="sub" @click="sub">提交</el-button>
</template>

<script setup lang="ts">
import { useMonacoEditor } from './CodeEditor.hook'
import { onMounted, computed, watch, ref, type Ref } from 'vue'
var editorError: any = ref(false)
const props = withDefaults(defineProps<{
  hideSub?: boolean,
  width?: string | number,
  height?: string | number,
  border?: string
  language?: string,
  editorOption?: Object,
  modelValue: string | Object | Array<any>
}>(), {
  hideSub: false,
  width: '800px',
  height: '600px',
  language: 'json',
  editorOption: () => ({}),
  modelValue: ''
})

const emits = defineEmits<{
  (e: 'blue'): void,
  (e: 'change', val: string, error: Ref<boolean>): void
  (e: 'sub'): void
}>()

const sub = () => {
  emits('sub');
}
const { monacoEditorRef, createEditor, updateVal, updateOptions, getEditor } = useMonacoEditor(props.language)
const monacoEditorStyle = computed(() => {
  return {
    width: typeof props.width === 'string' ? props.width : props.width + 'px',
    height: typeof props.height === 'string' ? props.height : props.height + 'px',
    border: props.border
  }
})

function updateMonacoVal(val: string) {
  if (val !== getEditor()?.getValue()) {
    updateVal(val)
  }
}

// function isHTMLSyntaxCorrect(string:st) {
//   const parser = new DOMParser();
//   const doc = parser.parseFromString(string, "text/html");
//   return doc.head.innerHTML + doc.body.innerHTML === string;
// }
onMounted(() => {
  const monacoEditor = createEditor(props.editorOption)
  let mv: any = props.modelValue
  if (props.language == "json" && typeof mv == "object") {
    mv = JSON.stringify(mv)
    emits('change', mv, editorError)
  }
  updateMonacoVal(mv)
  monacoEditor?.onDidChangeModelContent(() => {
    let value = monacoEditor!.getValue()
    if (props.language == "json") {
      try {
        JSON.parse(value)
        editorError.value = false
      } catch (e) {
        editorError.value = true
      }
    }
    emits('change', value, editorError)
  })
  monacoEditor?.onDidBlurEditorText(() => {
    emits('blue')
  })
})

watch(() => props.modelValue, () => {
  let mv: any = props.modelValue
  if (props.language == "json" && typeof mv == "object") {
    mv = JSON.stringify(mv)
    emits('change', mv, editorError)
  }
  updateMonacoVal(mv)
})

defineExpose({ updateOptions })
</script>

<style scoped>
.sub {
  width: 100%;
}
</style>