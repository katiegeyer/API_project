import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import OpenModalButton from '../OpenModalButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <div className='profile-groups-button'>
        <button className='start-a-new-group'>
          <NavLink to="/create-group">Start a New Group</NavLink>
        </button>
        <li>
          <ProfileButton user={sessionUser} />
        </li>
      </div>
    );
  } else {
    sessionLinks = (
      <li className="auth-buttons">
        <OpenModalButton
          buttonText="Log In"
          modalComponent={<LoginFormModal />}
        />
        <OpenModalButton
          buttonText="Sign Up"
          modalComponent={<SignupFormModal />}
        />
      </li>
    );
  }

  return (
    <ul className="nav-ul">
      <li>
        <NavLink exact to="/">
          SpeakUp
          <img src="https://thumbs.dreamstime.com/b/web-protester-banner-concept-hand-hold-empty-protest-sign-wood-stick-isolated-clipart-white-background-poster-announcement-163731176.jpg" />
        </NavLink>
      </li>
      {isLoaded && sessionLinks}
    </ul>
  );
}

export default Navigation;

// import React from "react";
// import { NavLink } from "react-router-dom";
// import { useSelector } from "react-redux";
// import ProfileButton from "./ProfileButton";
// import OpenModalButton from "../OpenModalButton";
// import LoginFormModal from "../LoginFormModal";
// import SignupFormModal from "../SignupFormModal";
// import "./Navigation.css";

// function Navigation({ isLoaded }) {
//     const sessionUser = useSelector((state) => state.session.user);

//     let sessionLinks;
//     if (sessionUser) {
//         sessionLinks = (
//             <li>
//                 <ProfileButton user={sessionUser} />
//             </li>
//         );
//     } else {
//         sessionLinks = (
//             <>
//                 <li>
//                     <OpenModalButton
//                         buttonText="Log In"
//                         modalComponent={<LoginFormModal />}
//                     />
//                 </li>
//                 <li>
//                     <OpenModalButton
//                         buttonText="Sign Up"
//                         modalComponent={<SignupFormModal />}
//                     />
//                 </li>
//             </>
//         );
//     }

//     return (
//         <nav>
//             <ul>
//                 <li>
//                     <NavLink exact to="/">
//                         Beatup
//                     </NavLink>
//                 </li>
//                 {isLoaded && sessionLinks}
//             </ul>
//         </nav>
//     );
// }

// export default Navigation;
