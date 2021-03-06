import './headerNav.css';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Route } from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';

import Avatar from 'material-ui/Avatar';

import { getUser, changeUser, getCurrentUser, registerUser, loginUser ,logOut} from '../reducers/Account';

import { addMsg, getMsgs, getChats } from '../reducers/Chat';


class HeaderNav extends Component {

    constructor(props){
      super(props);
    }
    handleChange = (event, logged) => {
        this.setState({ logged: logged });
    };

    changePage(value) {
        push('/' + value);
    }

    styles = {
        'padding-bottom': '2px'
    };

    render() {
        return (
                <div className="nav-bar">
                    <div>
                      <Route render={({ history }) => (
                        <div className="new-chat" primary={true} onClick={() => { history.push('/accountScreen')}}>
                            <label className="new-chat-lbl"> NEW CHAT </label>
                        </div>
                      )} />

                        <div className="new-group" primary={true} onClick={() => {}}>
                            <label className="new-group-lbl">NEW GROUP </label>
                        </div>
                    </div>

                    {
                      this.props.currentUser ?
                      <label className="name-lbl">{this.props.currentUser.userName + ' ' + this.props.currentUser.userSurname}</label>
                      :
                      <label className="name-lbl">No Logged in</label>
                    }

                    {
                      !this.props.currentUser ?
                      <Route render={({ history }) => (
                        <div className="new-chat" primary={true} onClick={() => { history.push('/')}}>
                            <label className="new-chat-lbl"> LOG IN </label>
                        </div>
                      )} />

                      :
                      <div>
                          <IconMenu
                          className="mini-img-placeholder"
                              iconButtonElement={
                                  <IconButton>
                                      <img
                                          className="mini-pro-image"
                                          src={this.props.currentUser.userImg}
                                      ></img>
                                  </IconButton>
                              }
                              targetOrigin={{ horizontal: 'right', vertical: 'top' }}
                              anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
                          >
                              <Route
                                  render={({ history }) => (
                                      <MenuItem
                                          primaryText="Settings"
                                          onClick={() => {
                                              history.push('/settings');
                                          }}
                                      />
                                  )}>
                              </Route>
                              <Route
                                  render={({ history }) => (

                                      <MenuItem
                                          primaryText="Log out"
                                          onClick={() => {
                                              this.props.logOut()
                                              history.push('/');
                                          }}
                                      />
                                  )}>
                          </Route>
                          </IconMenu>
                          <div
                              className="logo-border"
                              src="https://files.slack.com/files-pri/T02LJS8M9-F6F8J3988/logo-01.png"
                          />
                      </div>
                    }

                          </div>
        );
    }
}


const mapStateToProps = state => {
    return {
        chats: state.Chat.chats,
        msgs: state.Chat.msgs,
        currentUser: state.Account.currentUser,
        users: state.Account.users,
        receiver: state.Account.receiver
    };
};

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            getUser,
            getCurrentUser,
            changeUser,
            addMsg,
            getMsgs,
            registerUser,
            loginUser,
            getChats,
            logOut
        },
        dispatch
    );


export default connect(mapStateToProps, mapDispatchToProps)(HeaderNav);
