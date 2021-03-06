'use strict';

import axios from 'axios';
import LoginStore from '../stores/LoginStore';
import config from '../config';

var apiBase = config.apiBaseUrl;

var FeedSource = {

  fetch () {
    var credentials = LoginStore.getState();

    return axios.get(apiBase + '/users/' + credentials.username + '/feed?token=' + credentials.token)
      .then(response => response.data);
  },

  removeItem (showId, sien) {
    var credentials = LoginStore.getState();
    return axios.delete(apiBase + '/users/' + credentials.username + '/feed?showId=' + showId + '&sien=' + sien + '&token=' + credentials.token)
      .then(response => response.data);
  }

};

export default FeedSource;
