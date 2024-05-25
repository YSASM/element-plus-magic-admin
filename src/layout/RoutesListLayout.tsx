import { ArrowDown } from "@element-plus/icons-vue";
import { defineComponent, h, resolveComponent } from "vue";
import "./RoutesListLayout.scss"
import RoutesListLayout from './RoutesListLayout';

const RenderVnode = defineComponent({
    props: {
        routeNow: {
            type: [String]
        },
        routes: {
            type: Array<
                {
                    [prop: string]: any
                }>
        }
    },
    emits: ["goUrl"],
    render() {
        return <ul class="routes-list">
            {
                this.routes?.map(route => {
                    const liClass = ["flex-row", "item"]
                    let onClick = () => { }
                    if (route.path === this.routeNow) {
                        liClass.push("checked")
                    }
                    else if (route.children && route.children.length > 0) {
                        liClass.push("child")
                        onClick = () => {
                            route.showChildren = !route.showChildren
                        }
                        if (route.showChildren) {
                            liClass.push("child-show")
                        }
                        else {
                            liClass.push("child-hide")
                        }
                    }
                    else {
                        onClick = () => this.$emit('goUrl', route.path)
                    }

                    return [<li class={liClass.join(" ")} onClick={onClick}>
                        <el-icon class="icon">
                            {h(resolveComponent(route.meta.icon))}
                        </el-icon>
                        {route.meta.title}
                        {
                            liClass.includes("child") ? <el-icon class={route.showChildren ? "child-icon child-icon-show" : "child-icon"}>
                                <ArrowDown />
                            </el-icon> : ""
                        }
                    </li>, <RoutesListLayout style={{
                        height: route.showChildren ? "" : "0px",
                        transformOrigin: "top center",
                        transform: route.showChildren ? "scaleY(1)" : "scaleY(0)",
                        overflow: "hidden",
                        background: "rgb(27, 28, 31)",
                        transition: "transform .2s",
                        marginLeft:"-5px",
                        marginRight:"-5px",

                    }} onGoUrl={
                        (path) => this.$emit('goUrl', path)
                    } routes={route.children} routeNow={this.routeNow}></RoutesListLayout>]
                })
            }
        </ul>
    },
});

export default RenderVnode;