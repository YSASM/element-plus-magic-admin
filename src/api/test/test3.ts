import Request from "@/utils/requests";

export default {
    async test3GetList(data: any) {
        return {
            code: 0,
            data: {
                total: 2,
                items: [
                    {
                        id: "1",

                    },
                    {
                        id: "2",
                    }
                ]
            }
        }
    }
}