const messageBoardModel = require('../../models/messageBoard')
const friendsModel = require('../../models/friends')
module.exports = {
  async addMessage(ctx, next) {
    let { params } = ctx.request.body
    let { name, email} = params
    try {
      let res = await ctx.findOne(friendsModel, {name, email})
      if(res) {
        params.power = res.power;
        params.image = res.image;
      }
      let data = await ctx.add(messageBoardModel, params)
      ctx.send(data)
    } catch (err) {
      ctx.sendError(err)
    }
  },
  async getMessageList(ctx, next) {
    let {
      pageSize = 20,
      currentPage = 1
    } = ctx.request.query
    try {
      let data = await ctx.findPage(messageBoardModel, {}, {website: 0, email: 0}, {
        limit: pageSize * 1,
        skip: (currentPage - 1) * pageSize,
        sort: {
          time: -1
        }
      })
      ctx.send(data)
    } catch (error) {
      ctx.sendError(error)
    }
  }
}