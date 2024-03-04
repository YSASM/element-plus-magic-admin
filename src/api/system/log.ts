import Request from "@/utils/requests";

export default {
    getLogList(params:any) {
        return Request({
            url: '/admin/log',
            method: 'get',
            params,
        })
    }
}