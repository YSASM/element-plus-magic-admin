// import Request from "@/utils/requests";

export default {
    // login(data:any) {
    //     return Request({
    //         url: '/admin/login',
    //         method: 'post',
    //         data,
    //     })
    // }
    async login(data:any) {
        return {
            code: 0,
            message: "OK",
            data: {
                token: "12345",
                username: "ysasm"
            }
        }
    }
}