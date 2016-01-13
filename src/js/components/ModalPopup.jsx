/**
 *   React Modal Boiler Plate
 *   ver 0.0.1
 *
 *   Note : 사용법
 *   modalInfo가 있어야 함.
 *   ex)
 *   var modalObj = {
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
    var modal = <ModalPopup modalInfo = { modalObj } />

    this.setState({modal : modal});

    { modal } 형태로 사용
 *
 */


'use strict';

import React, { PropTypes } from 'react';
import { Modal } from 'react-bootstrap';

const ModalPopup = React.createClass({
  propTypes : {
    modalInfo : PropTypes.object
  },
  /**
   * 초기 state 상태 출력
   * @returns {{showModal: (*|boolean|showModal), title: (*|string), body: (*|string), button: (*|string), scope: (*|scope|null|Scope|string)}}
   */
  getInitialState() {
    return {
      showModal : this.props.modalInfo.showModal || false,
      title : this.props.modalInfo.title || '',
      body : this.props.modalInfo.body || '',
      button : this.props.modalInfo.button || '',
      scope : this.props.modalInfo.scope || null
    }
  },
  /**
   *  modal 닫기
   *  닫으면서 modalInfo에 내장된 closeFunc 출력
   */
  closeModal() {
    this.setState({showModal : false})
    this.props.modalInfo.closeFunc();
  },
  /**
   * render
   * @returns {XML}
   */
  render() {
    const { showModal, title, body, button, scope } = this.state;

    return (
      <Modal
        show={ showModal }
        onHide={ this.closeModal }
        container={ scope }
      >
        <Modal.Header closeButton>
          <Modal.Title>{ title }</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          { body }
        </Modal.Body>
        <Modal.Footer>
          { button }
        </Modal.Footer>
      </Modal>
    );
  }
});

export default ModalPopup;