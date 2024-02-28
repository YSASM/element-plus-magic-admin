<template>
  <pre class="jsonview" v-html="code"></pre>
  <el-button class="copy" type="primary" @click="copy">复制</el-button>
</template>

<script lang="ts">
import message from '@/utils/message'
import clipboard from "clipboard"
export default {
  name: "JsonViewer",
  props: {
    value: {
      type: [Object, Array, String],
      default: () => {
        return {}
      }
    },
  },
  data() {
    var hid_list: any = []
    return {
      code: "{}",
      hid_list
    }
  },
  watch: {
    value() {
      this.getStringJson()
    }
  },
  created() {
    this.getStringJson()
  },
  methods: {
    copy() {
      clipboard.copy(JSON.stringify(this.value))
      message.success("复制成功")
    },
    themJson(obj: any) {
      let isarray = Array.isArray(obj)
      for (let key in obj) {
        let value = obj[key]
        let vtype = typeof value
        try {
          if (vtype == "object") {
            obj[key] = this.themJson(value)
          }
          else if (vtype == "string") {
            let flage = false
            try {
              let temp: any = JSON.parse(value)
              if (typeof temp == "object") {
                obj[key] = this.themJson(temp)
                flage = true
              }
            } catch (e) {
              e
            }
            if (!flage) {
              if (value.slice(0, 4) == "http") {
                obj[key] = `<a target="_blank" href="${value}">${value}</a>`
              }
              else if (value && !isNaN(Number(value))) {
                obj[key] = `<span style='color:#FC8284'>${value}</span>`
              }
              else {
                obj[key] = `<span style='color:#000000'>${value}</span>`
              }
            }
          }
          else if (vtype == "number") {
            obj[key] = `<span style='color:#FC8284'>${value}</span>`
          }
          else if (vtype == "boolean") {
            obj[key] = `<span style='color:#3E6D0C'>${value}</span>`
          }
          if (!isarray) {
            obj[`<span style='color:#93C942'>${key}</span>`] = obj[key]
            obj[key] = undefined
          }

        }
        catch (e) {
          console.log(key, value, vtype)
        }
      }
      return obj
    },
    formatJson(obj: any) {
      // obj = utils.deepClone(obj)
      let del_list = ["utils", "fieldIndex"]
      del_list.forEach(item => {
        delete obj[item]
      });
      obj = this.themJson(obj)
      let str: any = JSON.stringify(obj)
      str = str.replace(/\\"/g, "\"")
      str = str.replace(/\\n/g, "")
      let ind = 0
      let backstr = ""
      let disind = false
      for (let i in str) {
        let s = str[i]
        if (s === "{" || s === "[") {
          if (!disind) {
            ind++
            s = s + "\n"
            for (let j = 0; j < ind; j++) {
              s = s + "  "
            }
          }
        }
        else if (s === "}" || s === "]") {
          if (!disind) {
            ind--
            for (let j = 0; j < ind; j++) {
              s = "  " + s
            }
            s = "\n" + s
          }
        }
        else if (s === ",") {
          if (!disind) {
            s = s + "\n"
            for (let j = 0; j < ind; j++) {
              s = s + "  "
            }
          }
        }
        else if (s === "\"") {
          disind = !disind
        }
        backstr += s
      }
      return backstr
    },
    hidClick(id: any) {
      document.getElementById(id)
    },
    getStringJson() {
      try {
        if (typeof this.value == "object") {
          this.code = this.formatJson(this.value)
        }
        else {
          const rev = (key:any,value:any)=>{
            try{
              value = JSON.parse(value,rev)
            }catch(e){
              // 
            }
            return value
          }
          const value = JSON.parse(this.value,rev)
          if (typeof value == "object") {
            this.code = this.formatJson(value)
          }
          else {
            this.code = this.value
          }
        }
      } catch (e) {
        console.log(e)
        this.code = String(this.value)
      }
    },
  }
}
</script>

<style lang="scss" scoped>
.jsonview {
  width: 100%;
  height: 500px;
  overflow-y: auto;
  text-align: start;
  word-break: break-all;
  white-space: pre-wrap;
}

.copy {
  width: 100%;
}
</style>
