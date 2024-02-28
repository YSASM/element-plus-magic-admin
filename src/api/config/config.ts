import Request from "@/utils/requests";

export default {
  getConfigList(params:any) {
    return Request({
      url: '/admin/config',
      method: 'get',
      params
    })
  },
  editorConfigList(data:any) {
    return Request({
      url: '/admin/config',
      method: 'put',
      data
    })
  },
  addConfigList(data:any) {
    return Request({
      url: '/admin/config',
      method: 'post',
      data
    })
  },
  delConfigList(params:any) {
    return Request({
      url: '/admin/config',
      method: 'delete',
      params
    })
  }
}

