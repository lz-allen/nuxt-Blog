const productionModel = require('../../models/production')
module.exports = {
  async getProductionList(ctx, next) {
    let {
      pageSize = 9,
      currentPage = 1
    } = ctx.request.query
    try {
      let data = await ctx.findPage(productionModel, {}, {}, {
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