import Request from "@/utils/requests";

export default {
    async test1GetList(data: any) {
        return {
            code: 0,
            data: {
                total: 2,
                items: [
                    {
                        id: "1",
                        title:"123",
                        content:"456",
                        status:"1",
                        config:{
                            test:"1",
                            a:"12",
                            b:{
                                c:"3"
                            }
                        },
                        fliter:data
                    },
                    {
                        id: "2",
                        title:"2123",
                        content:"2456",
                        status:"2",
                        config:{
                            test:"2",
                            wdawad:"12",
                            d:{
                                c:"2"
                            }
                        },
                        fliter:data
                    }
                ]
            }
        }
    }
}