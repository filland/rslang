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
          && <nav class="main-menu">
            <div id="menuToggle">
              <input type="checkbox" />
              <span></span>
              <span className="span-2"></span>
              <span className="span-3"></span>

              <div id="menu" className="menu-ul">
                <ul>
                  <li class="has-subnav">
                    <Link to="/game/speakit">
                      <i class="icon-menu icon-menu_speakit"></i>
                      <span class="nav-text">
                        SpeakIt
                  </span>
                    </Link>

                  </li>
                  <li class="has-subnav">
                    <Link to="/english-puzzle">
                      <i class="icon-menu icon-menu_english-puzzle"></i>
                      <span class="nav-text">
                        English puzzle
              </span>
                    </Link>

                  </li>
                  <li class="has-subnav">
                    <Link to="/savanna">
                      <i class="icon-menu icon-menu_savanna"></i>
                      <span class="nav-text">
                        Саванна
              </span>
                    </Link>

                  </li>

                  <li class="has-subnav">
                    <Link to="/audioChallenge">
                      <i class="icon-menu icon-menu_audio-challenge"></i>
                      <span class="nav-text">
                        Аудиовызов
                </span>
                    </Link>
                  </li>
                  <li class="has-subnav">
                    <Link to="/sprint">
                      <i class="icon-menu icon-menu_sprint"></i>
                      <span class="nav-text">
                        Спринт
              </span>
                    </Link>
                  </li>
                </ul>

                <ul>
                  <li class="has-subnav">
                    <Link to="/learning">
                      <i class="icon-menu icon-menu_learning"></i>
                      <span class="nav-text">
                        Learning words
                </span>
                    </Link>

                  </li>
                  <li class="has-subnav">
                    <Link to="/promo">
                      <i class="icon-menu icon-menu_promo"></i>
                      <span class="nav-text">
                        Promo
            </span>
                    </Link>

                  </li>
                  <li class="has-subnav">
                    <Link to="/settings">
                      <i class="icon-menu icon-menu_settings"></i>
                      <span class="nav-text">
                        Settings
            </span>
                    </Link>

                  </li>

                  <li class="has-subnav">
                    <Link to="/dictionary">
                      <i class="icon-menu icon-menu_dictionary"></i>
                      <span class="nav-text">
                        Dictionary
              </span>
                    </Link>
                  </li>
                  <li class="has-subnav">
                    <Link to="/statistics">
                      <i class="icon-menu icon-menu_statistics"></i>
                      <span class="nav-text">
                        Statistics
            </span>
                    </Link>
                  </li>
                  <li class="has-subnav">
                    <Link to="/long-term-statistics">
                      <i class="icon-menu icon-menu_statistics_full"></i>
                      <span class="nav-text">
                        Long-term statistics
          </span>
                    </Link>
                  </li>
                </ul>

                <ul class="logout">
                  <li>
                    <Link onClick={this.logoutUser} to="/logout">
                      <i class="icon-menu icon-menu_logout"></i>
                      <span class="nav-text">
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
