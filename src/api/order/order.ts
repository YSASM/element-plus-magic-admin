import Request from "@/utils/requests";

export default {
    getBillList(params:any) {
      return Request({
        url: '/admin/order',
        method: 'get',
        params
      })
    },
    billRefund(data:any) {
      return Request({
        url: '/admin/order/refund',
        method: 'post',
        data
      })
    },
  }
  
  