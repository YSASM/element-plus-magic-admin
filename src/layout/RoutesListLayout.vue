<template>
    <ul class="routes-list">
        <li class="flex-col"
            :class="routeNow === route.path ? 'route-now' : route.children && route.children.length > 0 && route.showChildren ? 'route-more' : route.children && route.children.length > 0 && !route.showChildren ? 'route-more-show' : 'route'"
            v-for="route, index in routes" :key="index"
            @click="routeNow !== route.path && (!route.children || route.children.length === 0) ? $emit('goUrl', route.path) : ''">
            <div class="name flex-row"
                @click="route.children && route.children.length > 0 ? showChildren(route, index) : ''">
                <el-icon class="icon">
                    <component :is="route.meta.icon"></component>
                </el-icon>
                {{ route.meta.title }}
                <el-icon v-if="route.children && route.children.length > 0" class="show-children">
                    <ArrowDown />
                </el-icon>
            </div>
            <RoutesListLayout :father-path="fatherPath+route.path" v-if="route.children && route.children.length > 0 && route.showChildren"
                :routes="route.children" :route-now="routeNow" @update-routes="(i) => { $emit('updateRoutes', routes) }"
                @go-url="(r) => { $emit('goUrl', r) }" />
        </li>
    </ul>
</template>
<script setup lang="ts">
import RoutesListLayout from './RoutesListLayout.vue';
</script>
<script lang="ts">
export default {
    props: {
        routeNow: {
            type: [String]
        },
        routes: {
            type: Array<
                {
                    [prop: string]: any
                }>
        },
        fatherPath:{
            type: [String],
            default:""
        }
    },
    created() {
        
    },
    emits: ["updateRoutes", "goUrl"],
    methods: {
        showChildren(route: any, index: any) {
            route.showChildren = !route.showChildren
            if(this.routes){
                // eslint-disable-next-line vue/no-mutating-props
                this.routes[index] = route
                this.$forceUpdate()
            }
        }
    }
}
</script>
<style lang="scss">
.routes-list {
    list-style-type: none;
    padding: 0;

    .route-more-list {
        width: 100%;
        list-style-type: none;
        padding: 0;
        transition: height .3s;
    }

    .show-children {
        margin: auto;
        margin-right: 20px;
        transition: transform .3s;
    }

    .name {
        padding-left: 20px;

        .icon {
            align-self: center;
        }
    }

    .route-more {
        // height: 50px;
        line-height: 50px;
        vertical-align: middle;
        color: rgba(255, 255, 255, 0.95);
        background-color: rgb(33, 37, 43);
        border-radius: 5px;
        margin: 7px;
        font-size: 14px;
        transition: background-color .3s;
    }

    .route-more-show {
        // height: 50px;
        line-height: 50px;
        vertical-align: middle;
        color: rgba(255, 255, 255, 0.95);
        background-color: rgb(33, 37, 43);
        border-radius: 5px;
        margin: 7px;
        font-size: 14px;
        transition: background-color .3s;

        .show-children {
            transform: rotate(180deg);
        }
    }

    .route {
        height: 50px;
        line-height: 50px;
        vertical-align: middle;
        color: rgba(255, 255, 255, 0.95);
        background-color: rgb(33, 37, 43);
        border-radius: 5px;
        margin: 7px;
        font-size: 14px;
        transition: background-color .3s;
    }

    .route-now {
        height: 50px;
        line-height: 50px;
        vertical-align: middle;
        color: rgba(255, 255, 255, 0.95);
        background-color: #409eff;
        border-radius: 5px;
        margin: 7px;
        font-size: 14px;
    }

    .route:hover {
        background-color: #409eff;
    }
}
</style>