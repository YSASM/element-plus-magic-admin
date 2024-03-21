<template>
  <div v-if="!loding" class="page">
    <div v-loading="!data.ready" class="fliter-box flex-row">
      <!-- eslint-disable-next-line vue/no-deprecated-v-on-native-modifier -->
      <el-form @submit.native.prevent :inline="true" size="small" label-width="auto" style="margin-top: auto;">
        <el-form-item v-show="item.type && !item.hide" v-for="item, index in data.fliter" :key="'fliter_' + index"
          :label="getFliterLabel(item)">
          <ElementRender :vNode="getFliterNode(item)"></ElementRender>
        </el-form-item>
        <el-form-item class="fliter-item">
          <el-button type="primary" @click="fetchData">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="content-box flex-col" v-loading="!data.ready" element-loading-text="Loading...">
      <TableElement v-if="data.ready" :data="data">
      </TableElement>
      <!-- <div v-else style="margin: auto;">
        加载中
      </div> -->
    </div>
    <ElementRender :vNode="item ? item(data) : ''" v-for="item, index in data.addNods" :key="index"></ElementRender>
  </div>
</template>

<script lang="tsx">
import CodeEditor from "@/components/CodeEditor.vue"
import type { TableData, TableColumn, Form, FormData, Fliter, Confirm, OnlyFun } from "@/type/TableData"
import ElementRender from "./ElementRender"
import JsonViewer from "@/components/JsonViewer.vue"
import { useRouter } from "vue-router"
import { Edit, Pointer } from "@element-plus/icons-vue"
import TableElement from "./TableElement.vue"
import message from "@/utils/message"
import utils from "@/utils"
import TableLayout from "./TableLayout.vue"
import JsonInputVue from "@/components/JsonInput.vue"
import { reactive, ref } from "vue"
export default {
  props: {
    tableDataPath: {
      type: String
    },
    reWriteTableData: {
      type: Object
    }
  },
  data() {
    var data: TableData = {}
    return {
      data,
      loding: true
    };
  },
  components: { ElementRender, TableElement },
  setup(props) {
    const pathname = props.tableDataPath || utils.getPathName()
    const { currentRoute } = useRouter();
    const query: any = currentRoute.value.query;
    const tableDataFilePath = `../views${pathname.split('?')[0]}.tsx`;
    let tableDataModule = import.meta.glob("../views/**/**.tsx")[tableDataFilePath];
    const apiFilePath = `../api${pathname.split('?')[0]}.ts`;
    const apiModule: Function = import.meta.glob("../api/**/**.ts")[apiFilePath];
    return {
      tableDataFilePath,
      apiFilePath,
      apiModule,
      tableDataModule,
      query
    };
  },
  async created() {
    try {
      if (!this.tableDataModule) {
        console.error("未找到表格文件:" + this.tableDataFilePath)
        return
      }
      const data_temp: any = await this.tableDataModule();
      const data: TableData = utils.deepClone(data_temp.default)
      this.data = data;
      if (!this.data) {
        console.error("data未加载成功:" + this.tableDataFilePath)
        return
      }
      if (this.apiModule) {
        const api_temp: any = await this.apiModule()
        this.data.api = api_temp.default ? api_temp.default : undefined
      }
      if (!this.data.api) {
        console.error("未找到API文件或未加载成功:" + this.apiFilePath)
        this.data.api = {
          apiTest: this.apiTest
        }
      } else {
        this.data.api.apiTest = this.apiTest
      }

      if (!this.data.methods) {
        this.data.methods = reactive({})
      }

      if (!this.data.bean) {
        this.data.bean = reactive({})
      }

      if (!this.data.addNods) {
        this.data.addNods = reactive([])
      }

      this.data.methods.getNode = this.getNode
      this.data.methods.getPoint = this.getPoint
      this.data.methods.getEditor = this.getEditor
      this.data.methods.fetchData = this.fetchData
      this.data.methods.getSort = this.getSort
      this.data.methods.message = message
      this.data.methods.utils = utils

      this.formatData()

      for (let i in this.data.launchTask) {
        const task: any = this.data.launchTask[Number(i)]
        await task(this.data)
      }
      if (!this.tableDataPath) {
        document.onkeyup = (e) => {
          if (e.key == "Escape") {
            this.$el.click()
          }
        }
      }
      this.renderRewriteTableData()
      this.loding = false
    } catch (e: any) {
      this.loding = false
      if (/error loading dynamically imported module/.test(e.message)) {
        location.reload();
      }
      console.error(e)
      return
    }

    this.fetchData()
  },
  unmounted() {
    this.loding = true
    this.data = {}
  },
  methods: {
    renderRewriteTableData(reWriteTableData: any = null) {
      if (!reWriteTableData) {
        reWriteTableData = this.reWriteTableData
      }
      if (!reWriteTableData) {
        return
      }
      this.renderRewriteFliter(reWriteTableData.fliter)
    },
    renderRewriteFliter(fliter: any) {
      if (fliter) {
        for (let i in fliter) {
          this.upDataFliter(fliter[i])
        }
      }
    },
    upDataFliter(item: any) {
      for (let i in this.data.fliter) {
        if (this.data.fliter[Number(i)].key == item.key) {
          for (let j in item) {
            this.data.fliter[Number(i)][j] = item[j]
          }
        }
      }
    },
    getCircularReplacer() {
      const seen = new WeakSet();
      return (key: any, value: any) => {
        if (typeof value === "object" && value !== null) {
          if (seen.has(value)) {
            return;
          }
          seen.add(value);
        }
        return value;
      };
    },
    apiTest(data: any) {
      console.log(data)
      return new Promise((resolve) => {
        resolve("test")
      })
    },
    formatData(data: any = null) {
      if (!data) {
        data = this.data
      }
      data.fliter?.forEach((item: any) => {
        if (item.items && item.items.length > 0 && item.items[0].key == "") {
          item.emptyLabel = item.items[0].name
        }
        if (item.value === undefined && item.getValue) {
          item.value = item.getValue(this.data)
        }
        if (item.value === undefined) {
          item.value = ""
        }
      })
      if (!data.sizeOption) {
        data.sizeOption = [50, 100, 200, 300, 1000]
      }
      const defaultPage = {
        key: "page",
        value: 1,
      }
      const defaultSize = {
        key: "size",
        value: data.sizeOption[0],
      }
      if (!data.pageFliter) {
        data.pageFliter = defaultPage
      }
      if (!data.sizeFliter) {
        data.sizeFliter = defaultSize
      }
      this.addFliter(data.pageFliter, false)
      this.addFliter(data.sizeFliter, false)

      let sortItem: any = null
      data.tableColumns?.forEach((item: any) => {
        if (item.hide) {
          return
        }
        if (!item.width && item.key == "table_tools") {
          item.width = "100%"
        }
        if (item.sort && item.sort !== "none") {
          sortItem = item
        }
        const node = this.getNode(item, data)
        if (!node) {
          return
        }
        item.node = node
      })
      if (sortItem) {
        data.sortFliter = {
          key: "sort",
          tableDefault: {
            prop: sortItem.key,
            order: sortItem.sort + "ending"
          },
          value: this.getSort(sortItem)
        }
        this.addFliter(data.sortFliter)
      }

    },
    getSort(sortItem: any) {
      if (!sortItem.key || !sortItem.sort) {
        return ""
      }
      let arr: any = sortItem.key.split('')
      let k = ''
      arr.forEach((i: any) => {
        let code = i.charCodeAt(0)
        if (code >= 65 && code <= 90 && k != '') {
          k += '_' + i.toLowerCase()
        }
        else {
          k += i
        }

      })
      return k + ' ' + sortItem.sort.toUpperCase()
    },
    getFliter(key: string, data: any = null) {
      if (!data) {
        data = this.data
      }
      let flage: any = null
      data.fliter?.forEach((item: any) => {
        if (flage) {
          return
        }
        if (item.key == key) {
          flage = item
        }
      })
      return flage
    },
    updateFliter(up_item: {
      key: string
      [prop: string]: any
    }, data: any = null) {
      if (!data) {
        data = this.data
      }
      let flage: any = null
      data.fliter?.forEach((item: any) => {
        if (flage) {
          return
        }
        if (item.key == up_item.key) {
          flage = true
          for (let i in up_item) {
            item[i] = up_item[i]
          }
        }
      })
    },
    addFliter(item: any, data: any = null, update: boolean = true) {
      if (!data) {
        data = this.data
      }
      if (this.getFliter(item.key)) {
        if (update) {
          this.updateFliter(item)
        }
      }
      else {
        data.fliter?.push(item)
      }
    },
    getFliterNode(item: Fliter) {
      switch (item.type) {
        case "input": {
          return (<el-input vModel_trim={item.value} clearable={true} onKeyup={(e: any) => {
            if (e.key == "Enter") {
              this.fetchData()
            }
          }}
            type={item.rows ? 'textarea' : ''} rows={item.rows ? item.rows : null} placeholder={item.emptyLabel}></el-input>)
        }
        case "select": {
          if (!item.items && item.getItems) {
            item.items = item.getItems(this.data)
            if (item.items && item.items.length > 0 && item.items[0].key === "") {
              item.emptyLabel = item.items[0].name
            }
          }
          return (<el-select modelValue={item.value} placeholder={item.emptyLabel} filterable={item.filterable}
            onChange={(e: any) => {
              item.value = e
              this.fetchData()
            }}>
            {
              item.items?.map((opt_item) => {
                return <el-option key={opt_item.key} value={opt_item.key} label={opt_item.name}></el-option>
              })
            }
          </el-select>)
        }
        case "cascader": {
          if (!item.items && item.getItems) {
            item.items = item.getItems(this.data)
            if (item.items && item.items.length > 0 && item.items[0].key === "") {
              item.emptyLabel = item.items[0].name
            }
          }
          return (<el-cascader modelValue={item.value} placeholder={item.emptyLabel} options={item.items} onChange={(e: any) => {
            item.value = e
            this.fetchData()
          }} props={{
            value: 'key',
            label: 'name',
            children: 'children',
            checkStrictly: true,
            emitPath: false
          }} show-all-levels={false} filterable={item.filterable}>
          </el-cascader>)
        }
        case "datetimerange": {
          return (<el-date-picker vModel_trim={item.value} type="datetimerange" value-format="x"
            range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" picker-options={item.opt ? item.opt : {
              shortcuts: [{
                text: '最近一周',
                onClick(picker: any) {
                  const end = new Date();
                  const start = new Date();
                  start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                  picker.$emit('pick', [start, end]);
                }
              }, {
                text: '最近一个月',
                onClick(picker: any) {
                  const end = new Date();
                  const start = new Date();
                  start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                  picker.$emit('pick', [start, end]);
                }
              }, {
                text: '最近三个月',
                onClick(picker: any) {
                  const end = new Date();
                  const start = new Date();
                  start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                  picker.$emit('pick', [start, end]);
                }
              }]
            }} onChange={() => {
              this.fetchData()
            }}>
          </el-date-picker>)
        }
        case "switch": {
          return (<el-switch modelValue={item.value} active-value={item.openValue}
            inactive-value={item.closeValue} onChange={(e: any) => {
              item.value = e
              this.fetchData()
            }} >
          </el-switch>)
        }
        case "dialogForm": {
          if (item.createForm) {
            item.form = item.createForm(this.data)
          }
          if (item.form) {
            if (!item.form.show) {
              item.form.show = {}
            }

            return this.createForm(item.form, {
              id: "form"
            })
          }
          break
        }
        // else if (item.editor.type == "dialogTable" && item.editor.tableData) {
        //   element = this.getPoint(this.createTable(item.editor.tableData, props.row, true))
        // }
        // else if (item.editor.type == "onlyFun" && item.editor.onlyFun) {
        //   element = this.getPoint(this.createOnlyFun(item.editor.onlyFun, props.row, true))
        // }
        case "dialogTable": {
          if (item.createTable) {
            item.tableData = item.createTable(this.data)

          }
          if (item.tableData) {
            return this.createTable(item.tableData, {
              id: "table"
            })
          }
          break
        }
        case "onlyFun": {
          if (item.onlyFun) {
            return this.createOnlyFun(item.onlyFun, {
              id: "onlyFun"
            })
          }
        }
      }

      return (<div></div>)
    },
    createForm(form: Form, row: any, rowTitle: boolean = false) {
      let type: any = ""
      let disable: any = form.disable
      if (disable === undefined && form.getDisable) {
        disable = form.getDisable(this.data, row)
      }
      if (typeof form.type == "function" || typeof form.type == "object") {
        type = form.type(this.data, row)
      } else {
        type = form.type
      }
      form.data?.forEach((item) => {
        item.values = {}
      })
      function getData(unsub?: boolean) {
        let data: any = {}
        form.data?.forEach((item) => {
          if (item.unsub && unsub) {
            return
          }
          if (item.key && item.values) {
            data[item.key] = item.values[row.id] || ""
          }
        })
        if (form.primary) {
          data[form.primary] = row[form.primary]
        }
        return data
      }
      var errors: any = {}
      let formCan_tSub = ref(false)
      let formErrorsSeter = {
        addErrors(key?: any) {
          if (!errors) {
            errors = {}
          }
          if (!key) {
            let count = 0
            for (let _ in errors) {
              _
              count++
            }
            count++
            key = 're_key_' + count
          }
          errors[key] = true
          formCan_tSub.value = this.checkErrors()
          return key
        },
        checkErrors() {
          for (let key in errors) {
            if (errors[key]) {
              return true
            }
          }
          return false
        },
        delErrors(key: any) {
          if (!errors) {
            errors = {}
            return
          }
          errors[key] = false
          formCan_tSub.value = this.checkErrors()
        }
      }
      return (<div>
        <el-dialog
          modelValue={form.show === row.id}
          title={form.title}
          appendToBody={true}
          close-on-click-modal={false}
          onClose={() => {
            if (form.show) {
              form.show = false
            }
            for (let i in errors) {
              errors[i] = false
            }
          }}
          width="500"
          v-slots={{
            footer: () => {
              return (<div class="dialog-footer">
                <el-button size="small" onClick={() => {
                  form.show = false
                  this.$forceUpdate()
                }}>取消</el-button>
                <el-button size="small" type="primary" disabled={formCan_tSub.value} onClick={() => {
                  this.formSub(form, getData(true))
                }}>
                  确认
                </el-button>
              </div>)
            }
          }}
        >
          <el-form label-width="auto" size="small">
            {
              form.data?.map((item, i) => {
                if (item.hide) {
                  return null
                }
                return (<el-form-item ref={() => {
                  if (item.must) {
                    const formItem: any = form.data[i]
                    const value = formItem.values[row.id]
                    if (!value) {
                      formErrorsSeter.addErrors('form_ai_' + i)
                    } else {
                      if (formItem.validator && formItem.validator(this.data, getData())) {
                        formErrorsSeter.addErrors('form_ai_' + i)
                      }
                      else {
                        formErrorsSeter.delErrors('form_ai_' + i)
                      }
                    }
                  }
                }} prop="none" rules={item.must ? [{
                  required: true, trigger: ['blur', 'change'],
                  validator: (_: any, __: any, callback: any) => {
                    const formItem: any = form.data[i]
                    const value = formItem.values[row.id]
                    if (!value) {
                      formErrorsSeter.addErrors('form_ai_' + i)
                      callback(new Error("必填项"))
                    } else {
                      let validator: any = false
                      if (formItem.validator) {
                        validator = formItem.validator(this.data, getData())
                      }
                      if (validator) {
                        formErrorsSeter.addErrors('form_ai_' + i)
                        callback(new Error(validator))
                      }
                      else {
                        formErrorsSeter.delErrors('form_ai_' + i)
                      }
                    }
                  }
                }] : []} label={item.name}>
                  {form.show === row.id ? this.getFormNode(form, item, row, getData, formErrorsSeter) : ''}
                </el-form-item>)
              })
            }
          </el-form>
        </el-dialog >
        <el-button size="small" disabled={disable} type={type} onClick={() => {
          form.show = row.id
          this.$forceUpdate()
        }}>{rowTitle && form.key ? row[form.key] : form.title}</el-button>
      </div >
      )
    },
    getFormNode(form: Form, item: FormData, row: any, getData: any, formErrorsSeter: {
      addErrors: (key?: any) => any
      delErrors: (key: any) => void
    }) {
      if (!item.values) {
        item.values = {}
      }
      if (!item.errors) {
        item.errors = {}
      }
      if (item.values[row.id] === undefined) {
        if (item.getValue) {
          item.values[row.id] = item.getValue(this.data, row)
        }
        else {
          if (item.key) {
            item.values[row.id] = row[item.key]
          }
        }
      }
      if (item.getDisable) {
        let disable = item.getDisable(this.data, getData())
        if (item.disable != disable) {
          item.disable = disable
        }
      }
      switch (item.type) {
        case "none": {
          return null
        }
        case "input": {
          return (<el-input disabled={item.disable} vModel_trim={item.values[row.id]} clearable={true}
            type={item.rows ? 'textarea' : ''} rows={item.rows ? item.rows : null} placeholder={item.emptyLabel}
          ></el-input>)
        }
        case "select": {
          if (!item.items && item.getItems) {
            item.items = item.getItems(this.data)
            if (item.items && item.items.length > 0 && item.items[0].key === "") {
              item.emptyLabel = item.items[0].name
            }
          }
          return (<el-select disabled={item.disable} modelValue={item.values[row.id]} placeholder={item.emptyLabel} filterable={item.filterable}
            onChange={(e: any) => {
              if (item.values) {
                item.values[row.id] = e
              }
              if (item.onChange) {
                item.onChange(this.data, form, item, row.id)
              }
            }}>
            {
              item.items?.map((opt_item) => {
                return <el-option key={opt_item.key} value={opt_item.key} label={opt_item.name}></el-option>
              })
            }
          </el-select>)
        }
        case "cascader": {
          if (!item.items && item.getItems) {
            item.items = item.getItems(this.data)
            if (item.items && item.items.length > 0 && item.items[0].key === "") {
              item.emptyLabel = item.items[0].name
            }
          }
          return (<el-cascader disabled={item.disable} modelValue={item.values[row.id]} placeholder={item.emptyLabel} options={item.items} props={{
            value: 'key',
            label: 'name',
            children: 'children',
            checkStrictly: true,
            emitPath: false
          }} show-all-levels={false} filterable={item.filterable} onChange={(e: any) => {
            if (item.values) {
              item.values[row.id] = e
            }
            if (item.onChange) {
              item.onChange(this.data, form, item, row.id)
            }
          }}>
          </el-cascader>)
        }
        case "datetimerange": {
          return (<el-date-picker vModel_trim={item.values[row.id]} type="datetimerange" value-format="x"
            disabled={item.disable}
            range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" picker-options={item.opt ? item.opt : {
              shortcuts: [{
                text: '最近一周',
                onClick(picker: any) {
                  const end = new Date();
                  const start = new Date();
                  start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                  picker.$emit('pick', [start, end]);
                }
              }, {
                text: '最近一个月',
                onClick(picker: any) {
                  const end = new Date();
                  const start = new Date();
                  start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                  picker.$emit('pick', [start, end]);
                }
              }, {
                text: '最近三个月',
                onClick(picker: any) {
                  const end = new Date();
                  const start = new Date();
                  start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                  picker.$emit('pick', [start, end]);
                }
              }]
            }}>
          </el-date-picker>)
        }
        case "datetime": {
          return (<el-date-picker disabled={item.disable} vModel_trim={item.values[row.id]} type="datetime" value-format="x" style="width:100%"
            placeholder="选择日期">
          </el-date-picker>)
        }
        case "switch": {
          return (<el-switch disabled={item.disable} modelValue={item.values[row.id]} onChange={(e: any) => {
            if (item.values) {
              item.values[row.id] = e
            }
            if (item.onChange) {
              item.onChange(this.data, form, item, row.id)
            }
          }} active-value={item.openValue}
            inactive-value={item.closeValue}>
          </el-switch>)
        }
        case "json": {
          return (<CodeEditor
            modelValue={item.values[row.id]}
            hideSub={true}
            width="100%"
            height="300px"
            border="var(--el-border)"
            onChange={(e, error) => {
              if (item.values) {
                item.values[row.id] = e
              }
              if (item.errors) {
                if (error.value) {
                  if (!item.errors[row.id]) {
                    item.errors[row.id] = formErrorsSeter.addErrors()
                  }
                  else {
                    item.errors[row.id] = formErrorsSeter.addErrors(item.errors[row.id])
                  }
                }
                else {
                  if (item.errors[row.id]) {
                    formErrorsSeter.delErrors(item.errors[row.id])
                  }
                }
              }
            }}
          ></CodeEditor>)
        }
        case "jsonInput": {
          return (<JsonInputVue
            modelValue={item.values[row.id]}
            rows={item.rows || 5}
            hideSub={true}
            onChange={(e, error) => {
              if (item.values) {
                item.values[row.id] = e.value
              }
              if (item.errors) {
                if (error.value) {
                  if (!item.errors[row.id]) {
                    item.errors[row.id] = formErrorsSeter.addErrors()
                  }
                  else {
                    item.errors[row.id] = formErrorsSeter.addErrors(item.errors[row.id])
                  }
                }
                else {
                  if (item.errors[row.id]) {
                    formErrorsSeter.delErrors(item.errors[row.id])
                  }
                }
              }
            }}
          ></JsonInputVue>)
        }
      }
      return (<div></div>)
    },
    getTableButtons(item: TableColumn, row: {
      [prop: string]: any
    }) {
      let buttons: any = []
      for (let i in item.buttons) {
        const button = item.buttons[Number(i)]
        if (button.hide) {
          continue
        }
        if (button.type == "dialogForm") {
          if (!button.form && button.createForm) {
            button.form = button.createForm(this.data, row)
          }
          if (button.form) {
            if (button.form.show === undefined) {
              button.form.show = false
            }
            buttons.push(<div style="margin: 0 5px auto auto;">{this.createForm(button.form, row)}</div>)
          }
        }
        else if (button.type == "popoverConfirm") {
          if (!button.confirm && button.createConfirm) {
            button.confirm = button.createConfirm(this.data, row)
          }

          if (button.confirm) {
            buttons.push(<div style="margin: 0 5px auto auto;">{this.createConfirm(button.confirm, row)}</div>)
          }
        }
        else if (button.type == "dialogTable") {
          if (!button.tableData && button.createTable) {
            button.tableData = button.createTable(this.data, row)
          }
          if (button.tableData) {
            if (this.tableDataPath) {
              button.tableData.disable = true
            }
            else {
              button.tableData.disable = undefined
            }
            buttons.push(<div style="margin: 0 5px auto auto;">{this.createTable(button.tableData, row)}</div>)
          }
        }
        else if (button.type == "onlyFun") {
          if (button.onlyFun) {
            if (this.tableDataPath) {
              button.onlyFun.disable = true
            }
            else {
              button.onlyFun.disable = undefined
            }
            buttons.push(<div style="margin: 0 5px auto auto;">{this.createOnlyFun(button.onlyFun, row)}</div>)
          }
        }
      }
      // return <div class="flex-row" style="justify-content: space-between;">{buttons}</div>
      return (<el-popover trigger="click" popper-class="popper-auto-width" placement="top" width={160} v-slots={{
        reference: () => {
          return (<el-button size="small" type="primary">操作</el-button>)
        },
        default: () => <div class="flex-row" style="justify-content: space-between;">
          {buttons}
        </div>
      }}>

      </el-popover>)
    },
    createTable(tableData: TableData, row: any = null, rowTitle: boolean = false) {
      let disable: any = tableData.disable
      if (tableData.getDisable) {
        disable = tableData.getDisable(this.data, row)
      }
      let buttonType: any = "success"
      if (tableData.type) {
        if (typeof tableData.type == "function" || typeof tableData.type == "object") {
          buttonType = tableData.type(this.data, row)
        } else {
          buttonType = tableData.type
        }
      }
      let renderRow: any = null
      if (tableData.renderRow) {
        renderRow = utils.deepClone(tableData.renderRow)
        renderRow.fliter?.forEach((item: any) => {
          if (typeof item.value == "object") {
            if (row[item.value.row]) {
              item.value = row[item.value.row]
            }
          }
        })
      }
      return (<div>
        <el-dialog
          class="dialog-table"
          modelValue={tableData.show === row.id}
          title={tableData.title}
          appendToBody={true}
          close-on-click-modal={false}
          onClose={() => {
            if (tableData.show) {
              tableData.show = false
            }
          }}
          width="1800"
          v-slots={{
            default: () => { return tableData.show == row.id ? <TableLayout reWriteTableData={renderRow} tableDataPath={tableData.path}></TableLayout> : "" }
          }}
        ></el-dialog>
        <el-button size="small" disabled={disable} type={buttonType} onClick={() => {
          tableData.show = row.id
          this.$forceUpdate()
        }}>{rowTitle && tableData.key ? row[tableData.key] : tableData.title}</el-button>
      </div>)
    },
    createOnlyFun(onlyFun: OnlyFun, row: any, rowTitle: boolean = false) {
      let disable: any = onlyFun.disable
      if (onlyFun.getDisable) {
        disable = onlyFun.getDisable(this.data, row)
      }
      let buttonType: any = "success"
      if (onlyFun.type) {
        if (typeof onlyFun.type == "function" || typeof onlyFun.type == "object") {
          buttonType = onlyFun.type(this.data, row)
        } else {
          buttonType = onlyFun.type
        }
      }
      return (<el-button size="small" disabled={disable} type={buttonType} onClick={() => {
        onlyFun.fun(this.data, row)
      }}>{rowTitle && onlyFun.key ? row[onlyFun.key] : onlyFun.title}</el-button>)
    },
    createConfirm(confirm: Confirm, row: any, rowTitle: boolean = false) {
      let disable: any = confirm.disable
      if (confirm.getDisable) {
        disable = confirm.getDisable(this.data, row)
      }

      let buttonType: any = "danger"
      let confirmButtonType: any = "danger"
      let cancelButtonType: any = ""
      if (confirm.type) {
        if (typeof confirm.type == "function" || typeof confirm.type == "object") {
          buttonType = confirm.type(this.data, row)
        } else {
          buttonType = confirm.type
        }
      }
      if (confirm.confirmButton && confirm.confirmButton.type) {
        if (typeof confirm.confirmButton.type == "function" || typeof confirm.confirmButton.type == "object") {
          confirmButtonType = confirm.confirmButton.type(this.data, row)
        } else {
          confirmButtonType = confirm.confirmButton.type
        }
      }
      if (confirm.cancelButton && confirm.cancelButton.type) {
        if (typeof confirm.cancelButton.type == "function" || typeof confirm.cancelButton.type == "object") {
          cancelButtonType = confirm.cancelButton.type(this.data, row)
        } else {
          cancelButtonType = confirm.cancelButton.type
        }
      }
      return (<el-popover trigger="click" placement="bottom" width={160} v-slots={{
        reference: () => {
          return (<el-button size="small" disabled={disable} type={buttonType}>{rowTitle && confirm.key ? row[confirm.key] : confirm.title}</el-button>)
        }
      }}>
        <p>{confirm.confirmContent || "确认要删除吗"}</p>
        <div style="text-align: right; margin: 0">
          <el-button size="small" type={cancelButtonType} onClick={() => {
            this.$el.click()
          }}>取消</el-button>
          <el-button size="small" type={confirmButtonType} onClick={() => {
            let data: any = {}
            data[confirm.primary] = row[confirm.primary]
            this.formSub(confirm, data)
          }}>确认</el-button>
        </div >
      </el-popover>)
    },
    getNode(item: TableColumn, data: any = null) {
      if (!data) {
        data = this.data
      }
      if (item.key == "table_tools" && !item.fixed) {
        item.fixed = "right"
      }
      if (item.buttons?.length === 1) {
        item.editor = item.buttons[0]
        delete item.buttons
        item.key = "table_tools_butons_rewrite"
        item.editor.hidePoint = true
      }
      let index = 0
      return (<el-table-column fixed={item.fixed}
        show-overflow-tooltip={!item.buttons && !item.showJson && !item.editor}
        width={item.width}
        align="center"
        column-key={item.key}
        prop={item.key}
        label={item.name}
        sortable={["", "desc", "asc"].includes(item.sort || item.sort === "" ? item.sort : "none") ? "custom" : false}
        sort-orders={['ascending', 'descending', '']}
        v-slots={{
          default: (props: any) => {
            if (item.key == "table_tools") {
              return this.getTableButtons(item, props.row)
            }
            if (typeof props.row[item.key] == "object") {
              try {
                props.row[item.key] = JSON.stringify(props.row[item.key])
              } catch (e) {
                console.warn(e)
              }
            }
            if (!props.row.id) {
              props.row.id = index
              index += 1
            }
            let element = item.renderBodyCell ? item.renderBodyCell({
              row: props.row,
              column: props.column,
              rowIndex: props.cellIndex,
              self: this.data
            }) : item.html ? (<div v-html={props.row[item.key] || ""}></div>) : <div>{props.row[item.key] || ""}</div>
            if (item.showTag && !item.editor) {
              let tag = item.showTag[props.row[item.key]]
              if (!tag) {
                tag = {
                  type: "info",
                  content: "***"
                }
              }
              let value = ""
              if (tag.content == "***") {
                value = props.row[item.key]
              }
              else if (tag.content.includes("&&&|")) {
                let temp = tag.content.split("|")
                value = temp[2] && data.methods ? data.methods[temp[2]](temp[1]) : temp[1]
              }
              else {
                value = tag.content
              }
              if (value !== "") {
                element = (<el-tag size="small" type={tag.type}>{value}</el-tag>)
              }
            }
            if (item.showJson && !item.editor) {
              let value = {}
              if (item.showJson == "*") {
                value = props.row
              }
              else {
                value = props.row[item.showJson]
              }
              if (value == "") { value = "" }
              value = JSON.stringify(value)
              element = (
                <el-popover
                  placement="right"
                  width="400"
                  trigger="click"
                  v-slots={{
                    reference: () => this.getPoint(props.row[item.key] || ""),
                    default: () => <JsonViewer
                      value={value}
                    ></JsonViewer>
                  }}
                >
                </el-popover>)
            }
            if (item.showOverflow && !item.editor) {
              if (props.row[item.showOverflow]) {
                element = (<el-tooltip
                  class="box-item"
                  effect="dark"
                  content={props.row[item.showOverflow]}
                  placement="top-start"
                >
                  {element}
                </el-tooltip>)
              }
            }
            if (item.editor) {
              if (item.editor.type === "input") {
                const defaultCell = <div onClick={(e) => {
                  if (e.shiftKey && item.editor) {
                    item.editor.editoring = props.row.id
                    this.$forceUpdate()
                  }
                }}>{this.getEditor(props.row[item.key] || "")}</div>
                let editorRef: any = null
                element = (<div>
                  {
                    item.editor.editoring === props.row.id ?
                      <el-input
                        ref={(el: any) => editorRef = el}
                        vModel_trim={props.row[item.key]}
                        onMouseenter={() => {
                          if (editorRef) {
                            editorRef.focus()
                          }
                        }}
                        onBlur={() => {
                          if (item.editor) {
                            item.editor.editoring = false
                            this.$forceUpdate()
                          }
                        }}
                        onKeyup={(e: any) => {
                          if (e.key == "Enter" && item.editor) {
                            item.editor.editoring = false
                            this.$forceUpdate()
                            let data: any = {}
                            const primary = item.editor?.primary || "id"
                            data[primary] = props.row[primary]
                            data[item.key] = props.row[item.key]
                            this.editorSub(item, data)
                          }
                          else if (e.key == "Escape" && item.editor) {
                            item.editor.editoring = false
                            this.$forceUpdate()
                          }
                        }}
                      /> : defaultCell
                  }
                </div>)
              }
              else if (item.editor.type === "switch") {
                element = (<el-switch size="small" modelValue={props.row[item.key]} active-value={item.editor.openValue}
                  inactive-value={item.editor.closeValue} onChange={(e: any) => {
                    props.row[item.key] = e
                    let data: any = {}
                    const primary = item.editor?.primary || "id"
                    data[primary] = props.row[primary]
                    data[item.key] = props.row[item.key]
                    this.editorSub(item, data)
                  }}>
                </el-switch>)
              }
              else if (item.editor.type == "select") {
                if (!item.editor.emptyLabel && item.editor.items && item.editor.items[0].key == "") {
                  item.editor.emptyLabel = item.editor.items[0].name
                }
                if (!item.editor.items && item.editor.getItems) {
                  item.editor.items = item.editor.getItems(this.data)
                  if (item.editor.items && item.editor.items.length > 0 && item.editor.items[0].key === "") {
                    item.editor.emptyLabel = item.editor.items[0].name
                  }
                }
                element = (<el-select size="small" modelValue={props.row[item.key]} placeholder={item.editor.emptyLabel}
                  onChange={(e: any) => {
                    props.row[item.key] = e
                    let data: any = {}
                    const primary = item.editor?.primary || "id"
                    data[primary] = props.row[primary]
                    data[item.key] = props.row[item.key]
                    this.editorSub(item, data)
                  }}>
                  {
                    item.editor.items?.map((opt_item) => {
                      return <el-option key={opt_item.key + props.row.id} value={opt_item.key} label={opt_item.name}></el-option>
                    })
                  }
                </el-select>)
              }
              else if (item.editor.type === "html" || item.editor.type === "json") {
                element = (<el-popover
                  placement="right"
                  width="820"
                  trigger="click"
                  v-slots={{
                    reference: () => this.getPoint(props.row[item.key] || ""),
                    default: () => <CodeEditor
                      language={item.editor ? item.editor.type : "json"}
                      modelValue={props.row[item.key]}
                      onChange={(e) => { props.row[item.key] = e }}
                      onSub={() => {
                        let data: any = {}
                        const primary = item.editor?.primary || "id"
                        data[primary] = props.row[primary]
                        data[item.key] = props.row[item.key]
                        this.editorSub(item, data)
                      }}
                    ></CodeEditor>
                  }}
                >
                </el-popover>)
              }
              else if (item.editor.type == "dialogForm") {
                if (item.editor.createForm) {
                  item.editor.form = item.editor.createForm(this.data, props.row)
                }
                if (item.editor.form) {
                  element = this.createForm(item.editor.form, props.row, true)
                  if (!item.editor.hidePoint) {
                    element = this.getPoint(element)
                  }
                }
              }
              else if (item.editor.type == "dialogTable") {
                if (item.editor.createTable) {
                  item.editor.tableData = item.editor.createTable(this.data, props.row)
                }
                if (item.editor.tableData) {
                  element = this.createTable(item.editor.tableData, props.row, true)
                  if (!item.editor.hidePoint) {
                    element = this.getPoint(element)
                  }
                }
              }
              else if (item.editor.type == "popoverConfirm") {
                if (item.editor.createConfirm) {
                  item.editor.confirm = item.editor.createConfirm(this.data, props.row)
                }
                if (item.editor.confirm) {
                  element = this.createConfirm(item.editor.confirm, props.row, true)
                  if (!item.editor.hidePoint) {
                    element = this.getPoint(element)
                  }
                }
              }
              else if (item.editor.type == "onlyFun" && item.editor.onlyFun) {
                element = this.createOnlyFun(item.editor.onlyFun, props.row, true)
                if (!item.editor.hidePoint) {
                  element = this.getPoint(element)
                }
              }
            }
            return element
          }
        }} />)
    },
    formSub(item: Form | Confirm, data: any) {
      if (!item.subFun) {
        return
      }
      item.show = false
      const back = item.subFun(this.data, data)
      back && back.then(() => {
        message.success(item.successMsg || "操作成功")
        if (item.unflash) {
          return
        }
        this.fetchData()
      })
    },
    editorSub(item: TableColumn, data: any) {
      if (!item.editor || !item.editor.subFun) {
        return
      }
      const back = item.editor.subFun(this.data, data)
      back && back.then(() => {
        message.success("操作成功")
        if (item.unflash) {
          return
        }
        this.fetchData()
      })
    },
    getPoint(content: any) {
      return (<div class="can-point flex-row"><el-icon style="align-self: center;"><Pointer /></el-icon>{content}</div>)
    },
    getEditor(content: any) {
      return (<div class="can-point flex-row"><el-icon style="align-self: center;"><Edit /></el-icon>{content}</div>)
    },
    fetchData() {
      this.data.ready = false
      this.$forceUpdate()
      let fliter: any = {}
      this.data.fliter?.forEach((item: any) => {
        if (item.type == "datetimerange" && item.startKey && item.endKey) {
          fliter[item.startKey] = item.value && item.value.length == 2 ? (item.value[0] / 1000).toFixed(0) : ""
          fliter[item.endKey] = item.value && item.value.length == 2 ? (item.value[1] / 1000).toFixed(0) : ""
        }
        else if (item.key) {
          fliter[item.key] = item.value
        }
      })
      typeof this.data.beforeFetch == "function" && this.data.beforeFetch(this.data, fliter)
      if (!this.data.fetchFun) {
        console.error("未配置fetchFun")
        this.data.ready = true
        return
      }
      this.data.fetchFun(this.data, fliter).then((res: any) => {
        this.data.fetchDataitems = res.data.items
        this.data.total = res.data.total
        this.data.ready = true
        this.$forceUpdate()
      }).catch(() => {
        this.data.ready = true
        this.$forceUpdate()
      })
    },
    getFliterLabel(item: any) {
      if (item.type === 'switch' && item.openStr && item.closeStr) {
        if (item.value == item.openValue) {
          return item.openStr
        }
        else if (item.value == item.closeValue) {
          return item.closeStr
        }
      }
      else if (item.disableLabel) {
        return ''
      }
      else {
        return item.name
      }

    }
  }
}

</script>
<style lang="scss">
// 修改对话框高度
.dialog-table {
  height: 80vh !important;
  overflow: hidden !important;

  .el-dialog__body {
    height: 70vh !important;
    overflow: hidden !important;
  }
}


.can-point {
  width: 100%;
  color: #409eff;
  /* text-align: center; */
  /* justify-content: center; */
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>

<style lang="scss" scoped>
.page {
  user-select: none;
  height: 100%;
  width: 100%;


  .fliter-box {
    padding: 10px 10px 0 10px;
    margin: 30px auto 0 30px;
    width: calc(100% - 80px);
    height: max-content;
    border-radius: 10px;
    box-shadow: 1px 1px 10px 1px #e2e2e2;

    .el-input {
      width: 200px !important;
    }

    .el-form-item {
      margin-bottom: 0 !important;
    }

    .el-select {
      width: 200px !important;
    }

    .el-form-item {
      margin: auto;
      margin-right: 40px;
      margin-bottom: 10px !important;
    }
  }

  .content-box {
    overflow-y: hidden;
    overflow-x: auto;
    padding: 10px;
    margin: 10px auto 20px 30px;
    width: calc(100% - 80px);

    flex: 1;
    border-radius: 10px;
    box-shadow: 1px 1px 10px 1px #e2e2e2;

    // .el-table__header{
    //   width: 100%;
    // }
    :deep(.el-pagination) {
      margin-top: 20px;
    }

    :deep(.el-table__inner-wrapper) {
      height: 100% !important;
    }

    :deep(.table-head) {
      background: rgb(226, 226, 226) !important;
      color: #000;
    }
  }

}
</style>
