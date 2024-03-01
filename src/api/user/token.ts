import Request from "@/utils/requests";

export default {
    getToken(params:any) {
        return Request({
            url: '/admin/user/token',
            method: 'get',
            params,
        })
    },
    updateToken(data:any) {
        return Request({
            url: '/admin/user/token',
            method: 'put',
            data,
        })
    },
    delToken(params:any) {
        return Request({
            url: '/admin/user/token',
            method: 'delete',
            params,
        })
    }
}