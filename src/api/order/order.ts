import Request from "@/utils/requests";

export default {
    getOrderList(params:any) {
      return Request({
        url: '/admin/order',
        method: 'get',
        params
      })
    },
    updateOrder(data:any) {
      return Request({
        url: '/admin/order',
        method: 'put',
        data
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
  
  