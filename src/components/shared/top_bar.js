import React from 'react'
import $ from 'jquery'
import UserProfile from './../shared/userInfo'
import { Redirect } from 'react-router-dom';
import {Link} from 'react-router-dom'
class TopBar extends React.Component {
    js() {
        $(function () {
            $.Admin.nav.activate();
        });

        $.Admin = {};
        $.Admin.nav = {
            activate: function () {
                var $body = $('body');
                var $overlay = $('.overlay');

                //Open left sidebar panel
                $('.bars').on('click', function () {
                    $body.toggleClass('overlay-open');
                    if ($body.hasClass('overlay-open')) { $overlay.fadeIn(); } else { $overlay.fadeOut(); }
                });

                $('.sidemenu-collapse').on('click', function () {
                    var $body = $('body');
                    if ($body.hasClass('side-closed')) {
                        $body.removeClass('side-closed');
                        $body.removeClass('submenu-closed');
                    } else {
                        $body.addClass('side-closed');
                        $body.addClass('submenu-closed');
                    }
                });

                $(".content, .navbar").mouseenter(function () {
                    var $body = $('body');
                    $body.removeClass('side-closed-hover');
                    $body.addClass('submenu-closed');
                });
                $(".sidebar").mouseenter(function () {
                    var $body = $('body');
                    $body.addClass('side-closed-hover');
                    $body.removeClass('submenu-closed');
                });
                //Close collapse bar on click event
                $('.nav [data-close="true"]').on('click', function () {
                    var isVisible = $('.navbar-toggle').is(':visible');
                    var $navbarCollapse = $('.navbar-collapse');

                    if (isVisible) {
                        $navbarCollapse.slideUp(function () {
                            $navbarCollapse.removeClass('in').removeAttr('style');
                        });
                    }
                });
            }
        }
    }

    componentDidMount() {
        this.js();
    }
    logout(){
        UserProfile.destroySession()
       return  (<Redirect to="/login" /> )
    }
    render() {
        return (
            <nav className="navbar">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <Link  className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-collapse" aria-expanded="false" > </Link>
                        <Link onclick="return false;" className="bars" ></Link>
                        <a className="navbar-brand" href="index.html">
                            <span className="logo-name">Jaffa Suites</span>
                        </a>
                    </div>
                    <div className="collapse navbar-collapse" id="navbar-collapse">
                        <ul className="pull-left">
                            <li>
                                <Link  className="sidemenu-collapse">
                                    <i className="material-icons">reorder</i>
                                </Link>
                            </li>
                        </ul>
                        <ul className="nav navbar-nav navbar-right">
                            {/* Full Screen Button */}
                            <li className="fullscreen">
                                <a href="javascript:;" className="fullscreen-btn">
                                    <i className="fas fa-expand" />
                                </a>
                            </li>
                            {/* #END# Full Screen Button */}
                            {/* #START# Notifications*/}
                            <li className="dropdown">
                                <a href="javascript:;" onclick="return false;" className="dropdown-toggle" data-toggle="dropdown" role="button">
                                    <i className="far fa-bell" />
                                    <span className="label-count bg-orange" />
                                </a>
                                <ul className="dropdown-menu pullDown">
                                    <li className="header">NOTIFICATIONS</li>
                                    <li className="body">
                                        <ul className="menu">
                                            <li>
                                                <a href="javascript:;" onclick="return false;">
                                                    <span className="table-img msg-user">
                                                        <img src="assets/images/user/user1.jpg" alt="" />
                                                    </span>
                                                    <span className="menu-info">
                                                        <span className="menu-title">Sarah Smith</span>
                                                        <span className="menu-desc">Booked a new room</span>
                                                    </span>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="javascript:;" onclick="return false;">
                                                    <span className="table-img msg-user">
                                                        <img src="assets/images/user/user1.jpg" alt="" />
                                                    </span>
                                                    <span className="menu-info">
                                                        <span className="menu-title">John Smith</span>
                                                        <span className="menu-desc">Booked a new room</span>
                                                    </span>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="javascript:;" onclick="return false;">
                                                    <span className="table-img msg-user">
                                                        <img src="assets/images/user/user1.jpg" alt="" />
                                                    </span>
                                                    <span className="menu-info">
                                                        <span className="menu-title">Orton Gulfam</span>
                                                        <span className="menu-desc">Requested Cancellation</span>
                                                    </span>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="javascript:;" onclick="return false;">
                                                    <span className="table-img msg-user">
                                                        <img src="assets/images/user/user1.jpg" alt="" />
                                                    </span>
                                                    <span className="menu-info">
                                                        <span className="menu-title">Abdurrehman</span>
                                                        <span className="menu-desc">Sent a message. Please check your mail</span>
                                                    </span>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="javascript:;" onclick="return false;">
                                                    <span className="table-img msg-user">
                                                        <img src="assets/images/user/user1.jpg" alt="" />
                                                    </span>
                                                    <span className="menu-info">
                                                        <span className="menu-title">Andy Jufran</span>
                                                        <span className="menu-desc">Booked a new room</span>
                                                    </span>
                                                </a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li className="footer">
                                        <a href="javascript:;" onclick="return false;">View All Notifications</a>
                                    </li>
                                </ul>
                            </li>
                            {/* #END# Notifications*/}
                            <li className="dropdown user_profile">
                                <a href="javascript:;" onclick="return false;" className="dropdown-toggle" data-toggle="dropdown" >
                                    <img src="assets/user.jpg" width={32} height={32} alt="User" />
                                </a>
                                <ul className="dropdown-menu pullDown">
                                    <li className="body">
                                        <ul className="user_dw_menu">
                                            <li>
                                                <a href={'/admins/'+UserProfile.getName()} onclick="return false;">
                                                    <i className="material-icons">person</i>Profile
                  </a>
                                            </li>
                                            <li>
                                                <a href="/faq" onclick="return false;">
                                                    <i className="material-icons">help</i>Help
                                                </a>
                                            </li>
                                            <li>
                                                <a href="/#" onClick={this.logout}>
                                                    <i className="material-icons">power_settings_new</i>Logout
                                                </a>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </li>
                            {/* #END# Tasks */}
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}

export default TopBar;