import type { TableData } from "@/type/TableData"
import utils from "@/utils"
const data: TableData = {
  fliter: [
    {
      name: 'ID',
      key: 'id',
      type: "input",
      value: ""
    },
    {
      name: '用户名称',
      key: 'name',
      type: "input",
      value: ""
    },
    {
      name: '推送Id',
      key: 'cid',
      type: "input",
      value: ""
    },
    {
      name: '微信Id',
      key: 'unionid',
      type: "input",
      value: ""
    },
    {
      name: '电话',
      key: 'phone',
      type: "input",
      value: ""
    },
    {
      name: '版本',
      key: 'version',
      type: "input",
      value: ""
    },
    {
      name: '渠道',
      key: 'channel',
      type: "input",
      value: ""
    },
    {
      name: '手机品牌',
      key: 'brand',
      type: "input",
      value: ""
    },
    {
      name: '手机型号',
      key: 'model',
      type: "input",
      value: ""
    },
    {
      name: '设备ID',
      key: 'device_id',
      type: "input",
      value: ""
    },
    {
      name: '用户IP',
      key: 'client_ip',
      type: "input",
      value: ""
    },
    {
      name: '广告ID',
      key: 'ad_identify',
      type: "input",
      value: ""
    },
    {
      name: '用户类型',
      key: 'role',
      type: "select",
      items: [
        {
          name: '所有用户',
          key: ''
        },
        {
          name: '临时用户',
          key: '1'
        },
        {
          name: '登录用户',
          key: '2'
        }
      ],
      value: ''
    },
    {
      name: '会员类型',
      key: 'vip_type',
      type: "select",
      items: [
        {
          name: '所有会员',
          key: ''
        },
        {
          name: '非会员',
          key: '1'
        },
        {
          name: '普通会员',
          key: '2'
        },
        {
          name: '终身会员',
          key: '3'
        }
      ],
      value: ''
    },
    {
      name: '用户平台',
      key: 'platform',
      type: "select",
      items: [
        {
          name: '全部平台',
          key: ''
        },
        {
          name: '安卓',
          key: 'android'
        },
        {
          name: '苹果',
          key: 'ios'
        },
        {
          name: '电脑端',
          key: 'pc'
        },
        {
          name: '电脑端网页',
          key: 'web'
        },
        {
          name: '小程序',
          key: 'wx-mp'
        },
        {
          name: '移动端网页',
          key: 'h5'
        }
      ],
      value: ''
    },
    {
      name: '广告来源',
      key: 'ad_source',
      type: "select",
      items: [
        {
          name: '全部来源',
          key: ''
        },
        {
          name: '自然流量',
          key: 'free'
        },
        {
          name: '百度推广',
          key: 'baidu'
        },
        {
          name: '巨量推广',
          key: 'ocean'
        },
        {
          name: '腾讯推广',
          key: 'tencent'
        },
        {
          name: '快手推广',
          key: 'kuaishou'
        },
        {
          name: 'vivo推广',
          key: 'vivo'
        },
        {
          name: 'oppo推广',
          key: 'oppo'
        },
        {
          name: '华为推广',
          key: 'huawei'
        },
        {
          name: '星图推广',
          key: 'xingtu'
        }
      ],
      value: ''
    },
    {
      name: '状态',
      key: 'status',
      type: 'select',
      items: [
        {
          name: "全部",
          key: ""
        },
        {
          name: "正常",
          key: "1"
        },
        {
          name: "禁用",
          key: "2"
        },
        {
          name: "删除",
          key: "3"
        }
      ],
      value: ""
    },
    {
      name: '时间',
      key: "time",
      startKey: 'start_time',
      endKey: 'end_time',
      type: "datetimerange",
      value: utils.defaultDate()
    },
  ],
  fetchFun(self, data) {
    return self.api?.getUserList(data)
  },
  tableColumns: [
    { key: "id", name: "ID", sort: "", width: "100px", fixed: "left", showJson: "*" },
    {
      key: "name", name: "用户", width: "150px",
      renderBodyCell: ({ row }) => {
        return (
          <div class="flex-row">
            <el-avatar size={20} src={row.avater} style="algin-self:center"> </el-avatar>
            <div style="algin-self:center;margin-left:10px;width:70px">{row.name}</div>
          </div>
        )
      }
    },
    // { key: "name", name: "用户名",  },
    { key: "platform", name: "平台", width: "80px" },
    { key: "version", name: "版本", width: "80px" },
    { key: "channel", name: "渠道", width: "80px" },
    { key: "ad_source", name: "广告来源", width: "100px" },
    { key: "brand", name: "手机品牌", width: "100px" },
    { key: "model", name: "手机型号", width: "120px" },
    {
      key: "role", name: "用户类型", width: "100px", showTag: {
        "临时用户": {
          type: 'info',
          content: '临时用户'
        },
        "登录用户": {
          type: 'primary',
          content: '登录用户'
        }
      }
    },
    {
      key: "status", name: "用户状态", width: "100px", showTag: {
        "正常": {
          type: 'success',
          content: '正常'
        },
        "禁用": {
          type: 'warning',
          content: '禁用'
        },
        "删除": {
          type: 'danger',
          content: '删除'
        },
      }
    },
    {
      key: "vip_name", name: "会员类型", width: "100px", showTag: {
        "终生会员": {
          type: 'success',
          content: "终生会员"
        },
        "普通会员": {
          type: 'primary',
          content: "普通会员"
        },
        "非会员": {
          type: 'info',
          content: "非会员"
        }
      }, showOverflow: "vip_expire_time"
    },
    // { field: "phone", key: "phone", name: "手机号",  width: 30, },
    {
      key: "getui_status", name: "个推在线", width: "100px", showTag: {
        "online": {
          type: 'success',
          content: "在线"
        },
        "offline": {
          type: 'warning',
          content: "离线"
        }
      },
    },
    { key: "device_id", name: "设备Id", width: "100px", },
    { key: "ad_identify", name: "广告Id", width: "100px", },
    { key: "client_ip", name: "用户IP", width: "200px", },
    { key: "active_time", name: "活跃时间", width: "200px", sort: "" },
    { key: "create_time", name: "激活时间", width: "200px", sort: "desc" },
    {
      key: "table_tools", name: "操作", buttons: [
        {
          type: "dialogTable",
          tableData: {
            title: "订单",
            path: "/order/order",
            getDisable(self, row) {
              return row.vip_expire_time == ""
            },
            renderRow: {
              fliter: [
                {
                  key: "user_id",
                  value: {
                    row: "id"
                  }
                },
                {
                  key: "time",
                  value: ""
                }
              ]
            }
          }
        },
        {
          type: "dialogTable",
          tableData: {
            title: "日志",
            path: "/user/event",
            renderRow: {
              fliter: [
                {
                  key: "user_id",
                  value: {
                    row: "id"
                  }
                }
              ]
            }
          }
        },
        {
          type: "dialogForm",
          form: {
            type: "primary",
            title: "推送",
            unflash: true,
            successMsg: "推送成功",
            getDisable(self, row) {
              return row.getui_status == ''
            },
            subFun(self, data) {
              return self.api?.pushMessage(data)
            },
            data: [
              {
                key: "user_id",
                type: "none",
                getValue: (self, row) => row.id,
              },
              {
                name: '标题',
                key: 'title',
                type: 'input',
                must: true,
              },
              {
                name: '正文',
                key: 'message',
                type: 'input',
                must: true
              },
              {
                name: '启动页面',
                key: 'intent',
                type: 'input',
                rows: 2,
                must: true
              },
              {
                name: "启动参数",
                key: "payload",
                type: "jsonInput",
                getValue() {
                  return {
                    "page": "跳转页面",
                    "params":"跳转参数"
                    }
                },
              }
            ]
          }
        },
        {
          type: "dialogForm",
          form: {
            type: "warning",
            title: "编辑",
            subFun(self, data) {
              if (data.no_vip_expire_time) {
                data.vip_expire_time = "-1"
              }
              else {
                data.vip_expire_time = String(Math.floor(data.vip_expire_time / 1000))
              }
              delete data.no_vip_expire_time
              switch (data.status) {
                case "正常": data.status = "1"; break
                case "禁用": data.status = "2"; break
                case "删除": data.status = "3"; break
              }
              return self.api?.editorUserList(data)
            },
            data: [
              {
                key: "user_id",
                type: "none",
                getValue: (self, row) => row.id,
              },
              {
                name: '头像',
                key: 'avater',
                type: 'input',
                must: true
              },
              {
                name: '会员过期时间',
                key: 'vip_expire_time',
                type: 'datetime',
                getDisable(self, data) {
                  return data.no_vip_expire_time ? true : false
                },
                getValue(self, row) {
                  row.vip_expire_time = row.vip_type === "3" ? new Date().getTime() : row.vip_expire_time
                  if (row.vip_expire_time && typeof row.vip_expire_time == "string") {
                    return new Date(row.vip_expire_time).getTime()
                  }
                  return row.vip_expire_time
                },
              },
              {
                name: '永久会员',
                key: 'no_vip_expire_time',
                type: 'switch',
                openValue: true,
                closeValue: false,
                getValue(self, row) {
                  return row.vip_type === 3
                },
              },
              {
                name: '状态',
                key: 'status',
                type: 'select',
                items: [
                  {
                    name: "正常",
                    key: "1"
                  },
                  {
                    name: "禁用",
                    key: "2"
                  },
                  {
                    name: "删除",
                    key: "3"
                  }
                ]
              }
            ]
          }
        }
      ]
    }
  ]
}
export default data