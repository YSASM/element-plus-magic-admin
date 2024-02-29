<template>
    <div class="routes-layout">
        <div class="title" @click="goUrl('/')">{{ title }}</div>
        <ul class="routes-list">
            <li class="flex-col"
                :class="routeNow === route.path ? 'route-now' : route.children && route.children.length > 0 && route.showChildren ? 'route-more' : route.children && route.children.length > 0 && !route.showChildren ? 'route-more-show' : 'route'"
                v-for="route, index in routes" :key="index"
                @click="routeNow !== route.path && (!route.children || route.children.length === 0) ? goUrl(route.path) : ''">
                <div class="name flex-row" @click="route.children && route.children.length > 0 ? showMoreRotes(index) : ''">
                    <el-icon class="icon"><component :is="route.meta.icon"></component></el-icon>
                    {{ route.meta.title }}
                    <el-icon v-if="route.children && route.children.length > 0" class="show-children">
                        <ArrowDown />
                    </el-icon>
                </div>
                <ul class="route-more-list" v-show="route.showChildren">
                    <li class="flex-col"
                        :class="routeNow === (route.path + '/' + route2.path).replace(/\/\//, '/') ? 'route-now' : route2.children && route2.children.length > 0 && route2.showChildren ? 'route-more' : route2.children && route2.children.length > 0 && !route2.showChildren ? 'route-more-show' : 'route'"
                        v-for="route2, index in route.children" :key="index"
                        @click="routeNow !== (route.path + '/' + route2.path).replace(/\/\//, '/') ? goUrl((route.path + '/' + route2.path).replace(/\/\//, '/')) : ''">
                        <div class="name flex-row">
                            <el-icon class="icon"><component :is="route2.meta.icon"></component></el-icon>
                            {{ route2.meta.title }}
                        </div>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
</template>
<script lang="ts">

import { useRouter } from 'vue-router';
import { indexStore } from "@/stores"

export default {
    props:{
        routeNow:{
            type:[String],
            default:"/"
        }
    },
    setup(props) {
        // var routeNow = location.hash.replace(/#/g,"")
        function formatRoutes(routes: any) {
            let temp: any = []
            routes.forEach((route: any) => {
                if (route.meta && route.meta.hidden) {
                    return
                }
                if (route.children.length === 1) {
                    let path = (route.path + "/" + route.children[0].path).replace(/\/\//, "/")
                    route = route.children[0]
                    route.path = path
                }
                else if (route.children.length > 1) {
                    route.showChildren = false
                    route.children.forEach((route2: any) => {
                        if ((route.path + "/" + route2.path).replace(/\/\//, "/") === props.routeNow) {
                            route.showChildren = true
                        }
                    })
                }
                temp.push(route)
            })
            return temp
        }
        var routes = formatRoutes(JSON.parse(JSON.stringify(useRouter().options.routes)))
        const title = indexStore().$state.title
        return {
            title,
            routes,
        }
    },
    created() {
    },
    methods: {
        goUrl(path: any) {
            this.$forceUpdate()
            this.$router.push(path)
            let timer:any = setInterval(()=>{
                if(path===location.hash.replace(/#/g,"")){
                    clearInterval(timer)
                    timer =null
                    this.$emit("reload")
                }
            },1)
        },
        showMoreRotes(index: number) {
            this.routes[index].showChildren = !this.routes[index].showChildren
            this.$forceUpdate()
        }
    }
}
</script>
<style lang="scss" scoped>
.routes-layout {
    width: 200px;
    height: 100vh;
    overflow: hidden;
    background: #21252b;
    box-shadow: 2px 0 6px rgba(0, 21, 41, .35);
    transition: width .3s;

    .title {
        font-size: 24px;
        max-width: 140px;
        margin: 30px auto 30px auto;
        color: #fff;
        text-align: center;
    }

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
            .icon{
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
}
</style>