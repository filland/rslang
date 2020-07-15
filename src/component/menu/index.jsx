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

            <div id="menuToggle">
              <input type="checkbox" />
              <span></span>
              <span className="span-2"></span>
              <span className="span-3"></span>

              <div className="menu-ul">
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
                        Audio challenge
                </span>
                    </Link>
                  </li>
                  <li className="has-subnav">
                    <Link to="/sprint">
                      <i className="icon-menu icon-menu_sprint"></i>
                      <span className="nav-text">
                        Sprint
              </span>
                    </Link>
                  </li>
                </ul>
                <ul>
                  <li className="has-subnav">
                    <Link to="/learning">
                      <i className="icon-menu icon-menu_learning"></i>
                      <span className="nav-text">
                        Memorizer
                </span>
                    </Link>

                  </li>
                  <li className="has-subnav">
                    <Link to="/promo">
                      <i className="icon-menu icon-menu_promo"></i>
                      <span className="nav-text">
                        Promo
            </span>
                    </Link>

                  </li>
                  <li className="has-subnav">
                    <Link to="/settings">
                      <i className="icon-menu icon-menu_settings"></i>
                      <span className="nav-text">
                        Settings
            </span>
                    </Link>

                  </li>

                  <li className="has-subnav">
                    <Link to="/dictionary">
                      <i className="icon-menu icon-menu_dictionary"></i>
                      <span className="nav-text">
                        Dictionary
              </span>
                    </Link>
                  </li>
                  <li className="has-subnav">
                    <Link to="/long-term-statistics">
                      <i className="icon-menu icon-menu_statistics_full"></i>
                      <span className="nav-text">
                        Statistics
          </span>
                    </Link>
                  </li>
                  <li className="has-subnav">
                    <Link to="/team">
                      <i className="icon-menu icon-menu_team"></i>
                      <span className="nav-text">
                        Our team
            </span>
                    </Link>
                  </li>
                </ul>

                <ul className="logout">
                  <li>
                    <Link onClick={this.logoutUser} to="#">
                      <i className="icon-menu icon-menu_logout"></i>
                      <span className="nav-text">
                        Logout
                  </span>
                    </Link>
                  </li>
                </ul>

              </div>
            </div>
          </nav>
        }
      </div>
    );
  }
}

export default withRouter(Menu);
