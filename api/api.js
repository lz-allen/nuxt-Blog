import axios from 'axios'
const host = 'http://lzf-allen.top'

// 搜索结果
const search = (params) => {
  return new Promise((resolve, reject) => {
    axios.get(`${host}/client_demo_api/article/search`, { params }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

// 获取文章列表
const getList = (params) => {
  return new Promise((resolve, reject) => {
    axios.get(`${host}/client_demo_api/article/listData`, { params }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

// 获取文章
const getArticle = (params) => {
  return new Promise((resolve, reject) => {
    axios.get(`${host}/client_demo_api/article/articleInfo`, { params }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

const getCategory = () => {
  return new Promise((resolve, reject) => {
    axios.get(`${host}/client_demo_api/article/getCategory`).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

const getRandomArticle = () => {
  return new Promise((resolve, reject) => {
    axios.get(`${host}/client_demo_api/article/randomArticle`).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
// 增加文章评论接口
const addComment = (params) => {
  return new Promise((resolve, reject) => {
    axios.post(`${host}/client_demo_api/comment/addComment`, { params }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
// 获取文章评论接口
const getCommentList = (params) => {
  return new Promise((resolve, reject) => {
    axios.get(`${host}/client_demo_api/comment/getCommentList`, { params }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

// 作品接口
const getProductionList = (params) => {
  return new Promise((resolve, reject) => {
    axios.get(`${host}/client_demo_api/production/getProductionList`, { params }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

// 友链接口
const getfriends = () => {
  return new Promise((resolve, reject) => {
    axios.get(`${host}/client_demo_api/friends/friendsList`).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

// 留言板接口

const addMessage = (params) => {
  return new Promise((resolve, reject) => {
    axios.post(`${host}/client_demo_api/messageBoard/addMessage`, { params }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

const getMessageList = (params) => {
  return new Promise((resolve, reject) => {
    axios.get(`${host}/client_demo_api/messageBoard/getMessageList`, { params }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}


export {
  search,
  getList,
  getArticle,
  getCategory,
  getRandomArticle,
  getCommentList,
  addComment,
  getfriends,
  addMessage,
  getMessageList,
  getProductionList
}
