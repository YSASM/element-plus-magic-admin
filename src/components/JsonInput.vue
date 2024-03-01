<template>
    <el-input type="textarea" v-model="jsonVal" :rows="rows"></el-input>
</template>

<script lang="ts" setup>
import { ref, watch, type Ref, onMounted } from 'vue';
var editorError: any = ref(false)
const props = withDefaults(defineProps<{
    hideSub?: boolean,
    rows: number,
    modelValue: string | Object | Array<any>
}>(), {
    hideSub: false,
    rows: 5,
    modelValue: ''
})
var jsonVal = ref("")
const emits = defineEmits<{
    (e: 'change', val: Ref<string>, error: Ref<boolean>): void
    (e: 'sub'): void
}>()
const checkvalue = () => {
    let mv: any = props.modelValue
    if (typeof mv == "object") {
        mv = JSON.stringify(mv, null, 4)
    }
    return mv
}
onMounted(() => {
    jsonVal.value = checkvalue()
    try {
        JSON.parse(jsonVal.value)
        editorError.value = false
    } catch (e) {
        editorError.value = true
    }
    emits('change', jsonVal, editorError)
})
watch(() => jsonVal.value, () => {
    try {
        JSON.parse(jsonVal.value)
        editorError.value = false
    } catch (e) {
        editorError.value = true
    }
    emits('change', jsonVal, editorError)
})
</script>