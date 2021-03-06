'use strict';

import React from 'react/addons';
import {Link} from 'react-router';
import ShowsStore from '../stores/ShowsStore';
import ShowsActions from '../actions/ShowsActions';
import ShowsListItem from './ShowsListItem';
import ShowsSearchInput from './ShowsSearchInput';

var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var ShowsSubscriptions = React.createClass({

  getInitialState () {
    return ShowsStore.getState();
  },

  componentDidMount () {
    ShowsStore.listen(this.onChange);
  },

  componentWillUnmount () {
    ShowsStore.unlisten(this.onChange);
  },

  onChange (state) {
    this.setState(state);
  },

  render () {

    var shows = this.state.shows;

    shows = shows.filter((show) => show.get('isSubscribed'));

    var showsList = shows.map((show) => {
      return <ShowsListItem
        key={show.get('id')}
        id={show.get('id')}
        imdbId={show.get('imdb_id')}
        title={show.get('title')}
        rating={show.get('rating')}
        color={show.getColor()}
        isSubscribed={show.get('isSubscribed')} />;
    }).toList();

    var emptyState = null;
    if(!showsList.size){
      emptyState = <div className="empty-state">Get started by adding your favorite shows. Tap below!</div>;
    }

    var addText = showsList.size ? '+ Add more shows' : '+ Add your first show';

    var addLink = <Link to="/shows/search" query={this.props.location.query} className="list-btn list-item">{addText}</Link>;

    var topAddLink = showsList.size >= 10 ? addLink : '';

    return (
      <div>
        {emptyState}
        <ReactCSSTransitionGroup
          component="div"
          transitionEnter={false}
          transitionLeave={true}
          transitionName="add-link">
          {topAddLink}
        </ReactCSSTransitionGroup>
        <ReactCSSTransitionGroup
          component="div"
          transitionEnter={false}
          transitionLeave={true}
          transitionName="list-item-remove">
          {showsList}
        </ReactCSSTransitionGroup>
        {addLink}
      </div>
    );
  }

});

export default ShowsSubscriptions;
