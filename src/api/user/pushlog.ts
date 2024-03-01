import Request from "@/utils/requests";

export default {
  getPushMessage(params:any) {
    return Request({
      url: '/admin/push/message',
      method: 'get',
      params
    })
  },
  pushMessage(data: any) {
    return Request({
        url: '/admin/push/message',
        method: 'put',
        data
    })
}
}

