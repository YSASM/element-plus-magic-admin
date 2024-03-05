<template>
    <div class="page">
        <div class="login-box flex-col">
            <div class="title">登录</div>
            <div class="input-box flex-row">
                <label class="input-label">账号</label>
                <ElInput class="input" v-model="username"></ElInput>
            </div>
            <div class="input-box flex-row">
                <label class="input-label">密码</label>
                <ElInput class="input" v-model="password" type="password" show-password></ElInput>
            </div>
            <div class="input-box flex-row" v-if="baseUrlList && baseUrlList.length > 0">
                <label class="input-label">产品</label>
                <ElSelect placeholder="请选择要登陆的产品" class="input" v-model="baseUrl" type="password" show-password>
                    <ElOption v-for="item in baseUrlList" :key="item.url" :label="item.name" :value="item.url">
                    </ElOption>
                </ElSelect>
            </div>
            <ElButton type="primary" class="login" @click="login">登录</ElButton>
        </div>
    </div>
</template>

<script lang="ts">
import { getConfig } from '@/config';
import { indexStore } from '@/stores';
import loginApi from "@/api/login"
import message from '@/utils/message';
export default {
    data() {
        return {
            username: "",
            password: "",
            baseUrl: "",
            baseUrlList: getConfig("baseUrlList")
        };
    },
    created() {
        const store = indexStore();
        this.baseUrl = store.$state.baseUrl || "/api";
    },
    methods: {
        getLoginItem() {
            let matchitem: any = null
            this.baseUrlList.forEach((item: any) => {
                if (matchitem) {
                    return
                }
                if (item.url == this.baseUrl) {
                    matchitem = item
                }
            })
            return matchitem
        },
        login() {
            if (this.username == "") {
                message.error("请输入用户名")
                return
            }
            if (this.password == "") {
                message.error("请输入密码")
                return
            }
            if (this.baseUrl == "") {
                message.error("请选择产品")
                return
            }
            const store = indexStore();
            store.$patch({
                baseUrl: this.baseUrl
            });
            const data:any = {
                username: this.username,
                password: this.password,
            }
            let item:any
            if (this.baseUrlList && this.baseUrlList.length > 0) {
                item = this.getLoginItem()
                data.appid = item.appid
            }
            loginApi.login(data).then((res) => {
                const patchdata:any = {
                    token: res.data.token,
                    username: res.data.username,
                }
                if (item){
                    patchdata.title = item.name
                }
                store.$patch(patchdata)
                message.success("登录成功")
                this.$router.push("/")
            })

        }
    },
}
</script>

<style lang="scss" scoped>
.page {
    background-image: url("@/assets/static/login.jpg");
    background-repeat: no-repeat;
    background-size: 100% 100%;

    .login-box {
        // height: 400px;
        width: 400px;
        // border: solid;
        padding-bottom: 30px;
        background-color: #fff;
        margin: auto;
        border-radius: 10px;
        box-shadow: 1px 1px 10px 2px rgb(69, 82, 141);

        .title {
            margin: 30px auto 20px auto;
            font-size: 30px;
            font-weight: bold;
            color: rgb(26, 36, 83);
        }

        .input-box {
            margin: 10px auto;
            width: 300px;

            .input-label {
                align-self: center;
                width: 40px;
            }

            .input {
                width: 260px;
            }
        }

        .login {
            margin: 30px auto;
            width: 300px;
            height: 40px;
        }
    }
}
</style>