import Request from "@/utils/requests";

export default {
    getUserList(params: any) {
        return Request({
            url: '/admin/user',
            method: 'get',
            params
        })
    },
    editorUserList(data: any) {
        return Request({
            url: '/admin/user',
            method: 'put',
            data
        })
    },
    pushMessage(data: any) {
        return Request({
            url: '/admin/push/message',
            method: 'post',
            data
        })
    }
}