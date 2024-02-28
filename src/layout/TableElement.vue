<template>
    <el-table size="small" @cell-dblclick="dbClickCell" v-if="data.fetchDataitems" height="calc(100% - 50px)" :fit="false"
        :data="data.fetchDataitems" header-cell-class-name="table-head" @sort-change="sortChange"
        :default-sort="data.sortFliter && data.sortFliter.tableDefault || ''" border>
        <ElementRender :vNode="item.node ? item.node : ''" v-for="item, index in data.tableColumns" :key="index">
        </ElementRender>
    </el-table>
    <div class="flex-row">
        <el-pagination v-if="data.pageFliter && data.sizeFliter" :total="data.total"
        v-model:current-page="data.pageFliter.value" v-model:page-size="data.sizeFliter.value" :page-sizes="data.sizeOption"
        :disabled="false" :background="true" layout="total, sizes, prev, pager, next, jumper" @size-change="fetchData"
        @current-change="fetchData" />
        <div class="el-pagination tip-text">{{ data.showText }}</div>
    </div>
</template>

<script lang="ts" setup>
import { defineProps } from "vue"
import ElementRender from "./ElementRender"
import type { TableData } from "@/type/TableData";
import clipboard from "clipboard";
import message from "@/utils/message";

const props = defineProps({
    data: {
        type: Object,
        required: true
    }
});


const data: TableData = props.data
const fetchData = () => {
    data.methods?.fetchData && data.methods?.fetchData()
}
const dbClickCell = (row: any, column: any) => {
    let text = row[column.columnKey]||""
    clipboard.copy(text)
    message.success("复制成功:"+text)
}
const sortChange = (sort: any) => {
    if (!sort.order && data.sortFliter && data.sortFliter.tableDefault.order == "ascending") {
        sort.order = "descending"
    }
    if (!sort.order && data.sortFliter && data.sortFliter.tableDefault.order == "descending") {
        sort.order = "ascending"
    }
    if (data.sortFliter) {
        data.sortFliter.tableDefault.prop = sort.prop
        data.sortFliter.tableDefault.order = sort.order
        const sortValue = data.methods?.getSort && data.methods?.getSort({
            key: sort.prop,
            sort: sort.order.replace(/ending/g, "")
        })
        if (sortValue) {
            data.sortFliter.value = sortValue
        }
        fetchData()
    }
}
</script>

<style lang="scss">
.tip-text{
    margin-left: auto;
    margin-right: 20px;
    color: red;
    font-size: 15px;
}
</style>