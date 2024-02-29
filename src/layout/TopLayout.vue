<template>
    <div class="top-layout flex-row">
        <div class="user flex-row">
            <el-icon>
                <UserFilled />
            </el-icon>
            <span>{{ username }}</span>
            <el-button @click="logout" class="logout" type="danger" :icon="CloseBold" circle />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { CloseBold } from '@element-plus/icons-vue';
</script>

<script lang="ts">
import { indexStore } from '@/stores';


export default {
    data() {
        return {
            username:""
        };
    },
    created(){
        const store = indexStore()
        this.username = store.$state.username
    },
    methods:{
        logout(){
            const store = indexStore()
            store.$patch({
                username:"",
                token:""
            })
            location.reload()
        }
    }
}
</script>

<style lang="scss" scoped>
.top-layout {
    width: 100%;
    height: 100%;
    box-shadow: 0 1px 4px rgba(0, 21, 41, .08);
    background-color: #fff;

    .user {
        align-self: center;
        margin-left: auto;
        margin-right: 20px;
        span{
            margin-left: 10px;
        }
        .logout{
            height: 20px;
            width: 20px;
            margin-left: 20px;
            padding: 0 !important;
        }
    }
}</style>