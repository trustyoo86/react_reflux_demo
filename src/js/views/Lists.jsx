'use strict';

import React,{ PropTypes } from 'react';
import { Input, ButtonInput } from 'react-bootstrap';

import UserStore from '../stores/UserStore';
import ListActions from '../actions/ListActions';
import Post from '../components/Post.jsx';
import ModalPopup from '../components/ModalPopup.jsx';

const Lists = React.createClass({
  contextTypes : {
    history : PropTypes.object
  },
  /**
   *  property type
   */
  propTypes : {
    params : PropTypes.object
  },
  /**
   * 초반의 this.state 받아오기
   * @returns {{listData: Array}}
   */
  getInitialState() {
    return {
      listData : [],
      modal : null
    };
  },
  /**
   *  render를 수행하기 전, 실행할 메소드
   */
  componentWillMount() {
    var self = this;

    ListActions.getLists((data) => {
      console.log(data);
      self.setState({listData : data.body});
    });
  },
  changeInput() {
    console.log('hi?');
  },
  /**
   *  Post 등록
   *  - Popup 출력 -
   */
  addPost() {
    var self = this;
    var modalObj = {
      showModal : true,
      title : 'Post 등록',
      body : (
        <form>
          <Input type="text" onChange={ self.changeInput } placeholder="입력하세요."/>
        </form>
      ),
      button : (
        <ButtonInput></ButtonInput>
      ),
      container : this,
      closeButton : true,
      closeFunc() {
        self.setState({modal: null});
      }
    };
    var modal = <ModalPopup modalInfo={ modalObj } />;

    this.setState({ modal : modal});
  },
  /**
   * render
   * @returns {XML}
   */
  render() {
    const { modal, listData } = this.state;

    const listEls = listData.length?
                      listData.map((list) => (
                        <Post post={ list } key={ list.id }/>
                      )) : 'There are no lists!'

    return (
      <div className="post_div">
        { listEls }
        <ButtonInput onClick={ this.addPost }>
          새 포스트 생성
        </ButtonInput>
        { modal }
      </div>
    );
  }
});

export default Lists;