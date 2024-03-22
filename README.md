<h1 align="center"> MagicTable </h1>
<div align="center">v0.2.0</div>
<div align="center">
  <img src="https://avatars.githubusercontent.com/u/80308986?v=4" style="width:100px;height:100px;"/>
</div>
<div>联系QQ:1613921123</div>
<div>欢迎大佬批评指正</div>

<div align="center">

[![GitHub](https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/YSASM)
![Profile views](https://views.whatilearened.today/views/github/Xuenew/views.svg)
![](https://img.shields.io/badge/Vue.js-black?style=flat-square&logo=vue.js)

</div>

# 快速搭建一个公司管理系统

基于 element-plus 等实现的网页快速生成框架，只需要编写 tsx 文件就能实现管理面板的表格页面。

## github 链接

[https://github.com/YSASM/MagicTableV2](https://github.com/YSASM/MagicTableV2)

vue2.x 请移步[https://github.com/YSASM/MagicTable](https://github.com/YSASM/MagicTable)

## 特点

- 更轻量
- 更简洁
- 缩短更多开发时间

## 如何开始

```
git clone https://github.com/YSASM/MagicTableV2.git

cd MagicTableV2

yarn

yarn run dev
```

## 如何创建新页面

- 在@/router/routes.js 中声明新的路由
- 在@/views 下对应的路径下创建 \*.tsx
- 编写你的第一个网页吧

```
// 示例
// 如果路由设置如下
{
  path: '/xxx',
  // ......
  children: [
    {
      path: 'yyy',
      // ......
    },
  ],
}
// *.tsx的路径就为@/views/xxx/yyy.tsx
// 文件内容如下
import type { TableData } from "@/type/TableData"
const data:TableData = {
    //详细结构和功能请看@/type/TableData和演示页面
}

export default data
```

## 接口返回数据与数据格式化

接着要创建api接口文件路径为*.tsx在api文件夹下的同名目录
比如*.tsx的路径为@/views/xxx/yyy.tsx
api接口文件路径就为@/api/xxx/yyy.ts

注意！！！！！！！！！！！！！！！
页面配置文件为.tsx
接口文件为.ts
api文件会自动引入到页面配置文件的data.api下，无需二次引用

调用方式如下

```
api接口文件*.ts
import Request from "@/utils/requests";
export default {
    api函数名(data:any) {
        return Request({
            url: '/admin/xxx',
            method: 'post',
            data,
        })
    }
}

表格配置文件*.tsx
//...
const data:TableData = {
    fetchFun(self, data) {
        return self.api?.api函数名(data)
    },
}
//...

//api接口数据结构如下
{
  code:0,
  message:"ok"
  data:{
    total:0,//数据总量
    items:[],//表格数据
  }
}
```

## 生产环境构建

部署生成环境可以选择nginx等第三方工具，或者本项目提供的在service文件夹下
以下为配置方法
代理需要配置service/core/router/proxy.cjs下的内容

```
/* eslint-disable no-undef */
const fs = require("fs")
const logger = require("../utils/log.cjs")
const isDev = fs.existsSync("service/dev")
logger.info("DEV:" + isDev)
module.exports = {
    '/api': {
        target: isDev ? 'http://xxx.com' : "http://127.0.0.1:8888",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
    },
}
//本地测试可以在service目录下创建一个名为dev的空文件，然后通过const isDev = fs.existsSync("service/dev")就能判断是不是线上环境
//.gitignore有屏蔽service/dev，所以不会提交
```

```
//构建项目
yarn build
//启动service服务
yarn start
//或
node --stack-size=12800 --stack-trace-limit=20  ./service/main.cjs
//没有--stack-trace-limit=20 参数时，日志无法打印出日志发送位置
```

## 其他设置

- 在@/config/index.ts 中 baseUrlList 参数可在登录时替换要使用的 baseurl，如不需要留空即可
- 在路由的 meta 属性中添加了 range 参数类型为数组,如 range: ['/test','/test1']，用于限制页面只在某个 baseurl 时显示，不设置参数时不做限制，如不需要不使用即可
- data.js 相关配置请阅读测试用例和组件核心代码@/layout/TableLayout.vue
- 更多详细内容请阅读以下相关文档

## 相关文档

[element-plus](https://element-plus.org/zh-CN/#/zh-CN)
