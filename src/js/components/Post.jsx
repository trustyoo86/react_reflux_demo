'use strict';

import React, { PropTypes } from 'react';
import {Panel} from 'react-bootstrap';

const Post = React.createClass({
  propTypes : {
    post : PropTypes.object
  },

  render() {
    const { post } = this.props;

    return (
      <Panel header={ post.title }>
        <p>{ post.regDate }</p>
        <p>{ post.content }</p>
      </Panel>
    );
  }
});

export default Post;