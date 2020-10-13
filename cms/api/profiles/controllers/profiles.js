const { parseMultipartData, sanitizeEntity } = require('strapi-utils');

module.exports = {
  /**
   * Create a Profile.
   *
   * By default the authenticated user is assigned to the created profile
   * @return {Object}
   */

  async create(ctx) {
    let entity;
    if (ctx.is('multipart')) {
      const { data } = parseMultipartData(ctx);
      data.user = ctx.state.user.id;
      entity = await strapi.services.profiles.create(data);
    } else {
      ctx.request.body.user = ctx.state.user.id;
      entity = await strapi.services.profiles.create(ctx.request.body);
    }
    return sanitizeEntity(entity, { model: strapi.models.profiles });
  }
};
