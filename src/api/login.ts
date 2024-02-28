import Request from "@/utils/requests";

export default {
    login(data:any) {
        return Request({
            url: '/admin/login',
            method: 'post',
            data,
        })
    }
}