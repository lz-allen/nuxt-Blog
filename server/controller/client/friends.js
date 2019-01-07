const friendsModel = require('../../models/friends')
module.exports = {
  async friendsList(ctx, next) {
    try {
      let data = await ctx.find(friendsModel)
      ctx.send(data)
    } catch (error) {
      ctx.sendError(error)
    }
  }
}