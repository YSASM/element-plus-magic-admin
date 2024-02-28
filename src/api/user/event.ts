import Request from "@/utils/requests";

export default {
    getUserEventList(params: any) {
        return Request({
            url: '/admin/user/event',
            method: 'get',
            params
        })
    },
    editorUserEventList(data: any) {
        return Request({
            url: '/admin/user/event',
            method: 'put',
            data
        })
    }
}

