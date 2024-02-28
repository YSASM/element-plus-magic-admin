import Request from "@/utils/requests";

export default {
  getGoodsList(params:any) {
    return Request({
      url: '/admin/goods',
      method: 'get',
      params
    })
  },
  editorGoodsList(data:any) {
    return Request({
      url: '/admin/goods',
      method: 'put',
      data
    })
  },
  addGoodsList(data:any) {
    return Request({
      url: '/admin/goods',
      method: 'post',
      data
    })
  },
  delGoodsList(params:any) {
    return Request({
      url: '/admin/goods',
      method: 'delete',
      params
    })
  }
}

