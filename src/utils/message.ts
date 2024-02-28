import { ElMessage } from 'element-plus'
export default {
    success(msg: string) {
        ElMessage.success(msg)
    },
    error(msg: string) {
        ElMessage.error(msg)
    },
    warning(msg: string) {
        ElMessage.warning(msg)
    }
}