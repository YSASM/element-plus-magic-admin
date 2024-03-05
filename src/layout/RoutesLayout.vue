<template>
    <div class="routes-layout">
        <div class="title" @click="goUrl('/')">{{ title }}</div>
        <RoutesListLayout :routes="routes" @go-url="goUrl" @show-children="showMoreRotes" :route-now="routeNow">
        </RoutesListLayout>
    </div>
</template>
<script lang="ts">

import { useRouter } from 'vue-router';
import { indexStore } from "@/stores"
import RoutesListLayout from './RoutesListLayout.vue';
import { reactive } from 'vue';
export default {
    props: {
        routeNow: {
            type: [String],
            default: "/"
        }
    },
    components: { RoutesListLayout },
    setup(props) {
        // var routeNow = location.pathna
        const store = indexStore()
        const title = store.$state.title
        const baseUrl = store.$state.baseUrl
        function formatRoutes(routes: any) {
            let temp: any = []
            routes.forEach((route: any) => {
                if (route.meta && (route.meta.hidden || route.meta.range && !route.meta.range.includes(baseUrl))) {
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
                        route2.path = (route.path + "/" + route2.path).replace(/\/\//, "/")
                        if (route2.path === props.routeNow) {
                            route.showChildren = true
                        }
                    })
                }
                temp.push(route)
            })
            return temp
        }
        var routes = reactive(formatRoutes(JSON.parse(JSON.stringify(useRouter().options.routes))))

        return {
            title,
            routes
        }
    },
    methods: {
        goUrl(path: any) {
            this.$router.push(path)
            this.$emit("reload")
        },
        showMoreRotes(index: number) {
            const route = this.routes[index]
            route.showChildren = !route.showChildren
            this.routes[index] = route
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


}
</style>