import Request from "@/utils/requests";
export default {
  getPromptList(params:any) {
    return Request({
      url: '/admin/prompt',
      method: 'get',
      params
    })
  },
  editorPromptList(data:any) {
    return Request({
      url: '/admin/prompt',
      method: 'put',
      data
    })
  },
  addPromptList(data:any) {
    return Request({
      url: '/admin/prompt',
      method: 'post',
      data
    })
  },
  delPromptList(params:any) {
    return Request({
      url: '/admin/prompt',
      method: 'delete',
      params
    })
  }
}

