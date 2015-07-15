var boom = require('boom');
var log = require('bole')('api');

module.exports = function (request, reply) {

  var username = request.query.username;
  var sendLink = request.server.methods.yo.sendLink;
  var getUserToken = request.server.methods.getUserToken;

  var feedsLink = 'http://app.yomypopcorn.com/feed?username=' + username + '&token=' + getUserToken(username);

  sendLink(username, feedsLink, function (err) {
    if (err) {
      log.error(err);

      return reply(boom.badImplementation());
    }

    reply({ status: 'ok' });
  });

};
