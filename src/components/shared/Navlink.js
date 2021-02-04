import React from 'react';
import { Link,withRouter } from 'react-router-dom';

const NavLink=(props) => {
    var isActive = props.location.pathname == props.to;
    var className = isActive ? 'active' : '';
    console.log(isActive)
    console.log(props.location)
    console.log(props.to)
    if(className)
    {
        return (
            <li className={className}>
                <Link {...props} className="toggled">
                    {props.children}
                </Link>
            </li>
        );
    }
    else{
        return (
            <li>
                <Link {...props}>
                    {props.children}
                </Link>
            </li>
        );   
    }
};


export default withRouter(NavLink);