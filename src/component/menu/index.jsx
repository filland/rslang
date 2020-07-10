/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import { isAuthorized, deleteJwtToken } from '../../common/utils/TokenUtils';
import { deleteUserId } from '../../common/utils/UserUtils';
import './styles.scss';

class Menu extends Component {
  logoutUser = () => {
    deleteJwtToken();
    deleteUserId();
    const { history } = this.props;
    history.push('/login');
  };

  render() {
    return (
      <div>
        {
          isAuthorized()
          && <nav className="main-menu">
            <ul>
              <li className="has-subnav">
                <Link to="/game/speakit">
                  <i className="icon-menu icon-menu_speakit"></i>
                  <span className="nav-text">
                    SpeakIt
                  </span>
                </Link>

              </li>
              <li className="has-subnav">
                <Link to="/english-puzzle">
                  <i className="icon-menu icon-menu_english-puzzle"></i>
                  <span className="nav-text">
                    English puzzle
              </span>
                </Link>

              </li>
              <li className="has-subnav">
                <Link to="/savanna">
                  <i className="icon-menu icon-menu_savanna"></i>
                  <span className="nav-text">
                    Саванна
              </span>
                </Link>

              </li>

              <li className="has-subnav">
                <Link to="/audioChallenge">
                  <i className="icon-menu icon-menu_audio-challenge"></i>
                  <span className="nav-text">
                    Аудиовызов
                </span>
                </Link>
              </li>
              <li className="has-subnav">
                <Link to="/sprint">
                  <i className="icon-menu icon-menu_sprint"></i>
                  <span className="nav-text">
                    Спринт
              </span>
                </Link>
              </li>
            </ul>

            <ul className="logout">
              <li>
                <Link onClick={this.logoutUser} to="/logout">
                  <i className="icon-menu icon-menu_logout"></i>
                  <span className="nav-text">
                    Logout
                  </span>
                </Link>
              </li>
            </ul>
          </nav>
        }
      </div>
    );
  }
}

export default withRouter(Menu);
