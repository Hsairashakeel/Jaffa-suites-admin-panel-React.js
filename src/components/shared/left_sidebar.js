import React from 'react'
import UserProfile from './../shared/userInfo'
import {Link, Redirect} from 'react-router-dom'
import $ from 'jquery'
import NavLink from './Navlink'
class example extends React.Component {
  js()
  {
    $(function () {
      $.MyAdmin.leftSideBar.activate();
      callFullScreen();
      setTimeout(function () { $('.page-loader-wrapper').fadeOut(); }, 50);
  });
  
  $.MyAdmin = {};
  $.MyAdmin.options = {
leftSideBar: {
    scrollColor: 'rgba(0,0,0,0.5)',
    scrollWidth: '4px',
    scrollAlwaysVisible: false,
    scrollBorderRadius: '0',
    scrollRailBorderRadius: '0',
    scrollActiveItemWhenPageLoad: true,
    breakpointWidth: 1170
},
dropdownMenu: {
    effectIn: 'pullDown',
    effectOut: 'fadeOut'
}
}

$.MyAdmin.leftSideBar = {
activate: function () {
  var _this = this;
  var $body = $('body');
  var $overlay = $('.overlay');

  //Close sidebar
  $(window).on("click", function (e) {
      var $target = $(e.target);
      if (e.target.nodeName.toLowerCase() === 'i') { $target = $(e.target).parent(); }

      if (!$target.hasClass('bars') && _this.isOpen() && $target.parents('#leftsidebar').length === 0) {
          if (!$target.hasClass('js-right-sidebar')) $overlay.fadeOut();
          $body.removeClass('overlay-open');
      }
  });

  $.each($('.menu-toggle.toggled'), function (i, val) {
      $(val).next().slideToggle(0);
  });

  //When page load
  $.each($('.menu .list li.active'), function (i, val) {
      var $activeAnchors = $(val).find('a:eq(0)');

      $activeAnchors.addClass('toggled');
      $activeAnchors.next().show();
  });

  //Collapse or Expand Menu
  $('.menu-toggle').on('click', function (e) {
      var $this = $(this);
      var $content = $this.next();

      if ($($this.parents('ul')[0]).hasClass('list')) {
          var $not = $(e.target).hasClass('menu-toggle') ? e.target : $(e.target).parents('.menu-toggle');

          $.each($('.menu-toggle.toggled').not($not).next(), function (i, val) {
              if ($(val).is(':visible')) {
                  $(val).prev().toggleClass('toggled');
                  $(val).slideUp();
              }
          });
      }

      $this.toggleClass('toggled');
      $content.slideToggle(320);
  });

  //Set menu height
  _this.setMenuHeight();
  _this.checkStatuForResize(true);
  $(window).resize(function () {
      _this.setMenuHeight();
      _this.checkStatuForResize(false);
  });
},
setMenuHeight: function (isFirstTime) {
  if (typeof $.fn.slimScroll != 'undefined') {
      var configs = $.MyAdmin.options.leftSideBar;
      //var height = ($(window).height() - ($('.legal').outerHeight() + $('.user-info').outerHeight() + $('.navbar').innerHeight()));
      var height = ($(window).height() - ($('.navbar').innerHeight()));
      var $el = $('.list');

      $el.slimscroll({
          height: height + "px",
          color: configs.scrollColor,
          size: configs.scrollWidth,
          alwaysVisible: configs.scrollAlwaysVisible,
          borderRadius: configs.scrollBorderRadius,
          railBorderRadius: configs.scrollRailBorderRadius
      });

      //Scroll active menu item when page load, if option set = true
      if ($.MyAdmin.options.leftSideBar.scrollActiveItemWhenPageLoad) {
          var activeItemOffsetTop = $('.menu .list li.active')[0].offsetTop
          if (activeItemOffsetTop > 150) $el.slimscroll({ scrollTo: activeItemOffsetTop + 'px' });
      }
  }
},
checkStatuForResize: function (firstTime) {
  var $body = $('body');
  var $openCloseBar = $('.navbar .navbar-header .bars');
  var width = $body.width();

  if (firstTime) {
      $body.find('.content, .sidebar').addClass('no-animate').delay(1000).queue(function () {
          $(this).removeClass('no-animate').dequeue();
      });
  }

  if (width < $.MyAdmin.options.leftSideBar.breakpointWidth) {
      $body.addClass('ls-closed');
      $openCloseBar.fadeIn();
  }
  else {
      $body.removeClass('ls-closed');
      $openCloseBar.fadeOut();
  }
},
isOpen: function () {
  return $('body').hasClass('overlay-open');
}
};

function callFullScreen() {
$(document).on('click', '.fullscreen-btn', function (e) {
  if (!document.fullscreenElement &&    // alternative standard method
      !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {  // current working methods
      if (document.documentElement.requestFullscreen) {
          document.documentElement.requestFullscreen();
      } else if (document.documentElement.msRequestFullscreen) {
          document.documentElement.msRequestFullscreen();
      } else if (document.documentElement.mozRequestFullScreen) {
          document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullscreen) {
          document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
      }
  } else {
      if (document.exitFullscreen) {
          document.exitFullscreen();
      } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
      } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
      }
  }

});
}
  }

  logout(){
    UserProfile.destroySession()
   return  (<Redirect to="/login" /> )
}
  componentDidMount()
  {
    this.js();
  }

  render() {
    return (
         <aside id="leftsidebar" class="sidebar menu_dark">
            <div class="menu">
                <ul class="list">
                    <li class="sidebar-user-panel active">
                        <div class="user-panel">
                            <div class=" image">
                                <img src="assets/user.jpg" class="img-circle user-img-circle" alt="User " />
                            </div>
                        </div>
                        <div class="profile-usertitle">
                            <div class="sidebar-userpic-name">{UserProfile.getName()}</div>
                            <div class="profile-usertitle-job ">Admin </div>
                        </div>
                    </li>
                    <li>
                        <a href="javascript:;" class="menu-toggle">
                            <i class="fas fa-tachometer-alt"></i>
                            <span>Home</span>
                        </a>
                        <ul class="ml-menu">
                            <NavLink to="/dashboard">Dashboard</NavLink>
                            <NavLink to={"/admins/"+UserProfile.getName()}>My Profile</NavLink>
                            <NavLink to="/admins">All Admins</NavLink>
                        </ul>
                    </li>
                    <li>
                        <a href="javascript:;"  class="menu-toggle">
                            <i class="fas fa-user"></i>
                            <span>Users</span>
                        </a>
                        <ul class="ml-menu">
                            <NavLink to="/users">All Users</NavLink>
                        </ul>
                    </li>
                    <li>
                        <a href="javascript:;"  class="menu-toggle">
                            <i class="fas fa-book"></i>
                            <span>Rooms</span>
                        </a>
                        <ul class="ml-menu">
                            <NavLink to="/rooms">All Rooms</NavLink>
                            <NavLink to="/rooms/addroom">Add New Room</NavLink>
                        </ul>
                    </li>
                    <li>
                        <a href="javascript:;"  class="menu-toggle">
                            <i class="far fa-calendar"></i>
                            <span>Bookings</span>
                        </a>
                        <ul class="ml-menu">
                            <NavLink to="/bookings">All Bookings</NavLink>
                            <NavLink to="/bookroom">Book Room</NavLink>
                        </ul>
                    </li>
                    <li>
                        <a href="javascript:;" class="menu-toggle">
                            <i class="fas fa-images"></i>
                            <span>Gallery</span>
                        </a>
                        <ul class="ml-menu">
                            <NavLink to="/gallery">All Images</NavLink>
                            <NavLink to="/addgallery">Add New Image</NavLink>
                        </ul>
                    </li>
                    <li>
                        <a href="#" onClick={this.logout}>
                            <i class="fas fa-sign-out-alt"></i>
                            <span>Logout</span>
                        </a>
                    </li>
                </ul>
            </div>
        </aside>
    );
  }
}
export default example;