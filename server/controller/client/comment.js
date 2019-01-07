const commentModel = require('../../models/comment')
const friendsModel = require('../../models/friends')
module.exports = {
  async addComment(ctx, next) {
    let { params } = ctx.request.body
    let { name, email } = params
    try {
      let res = await ctx.findOne(friendsModel, { name, email })
      if (res) {
        params.power = res.power;
        params.image = res.image;
      }
      let data = await ctx.add(commentModel, params)
      ctx.send(data)
    } catch (err) {
      ctx.sendError(err)
    }
  },
  async getCommentList(ctx, next) {
    let {
      pageSize = 10,
      currentPage = 1,
      noteId
    } = ctx.request.query
    try {
      let data = await ctx.findPage(commentModel, { noteId: noteId }, {
        noteId: 0
      }, {
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
  },
}