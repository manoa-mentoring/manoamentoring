import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Roles } from 'meteor/alanning:roles';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Footer from '../components/Footer';
import Landing from '../pages/Landing';
import ListContacts from '../pages/ListContacts'; // Changed import
import NotFound from '../pages/NotFound';
import SignUp from '../pages/SignUp';
import SignOut from '../pages/SignOut';
// eslint-disable-next-line import/no-named-as-default,import/no-named-as-default-member
import NavBar from '../components/NavBar';
import SignIn from '../pages/SignIn';
import NotAuthorized from '../pages/NotAuthorized';
import LoadingSpinner from '../components/LoadingSpinner';
import ListContactsAdmin from '../pages/ListContactsAdmin';
import ListProfiles from '../pages/ListProfiles';
import ListCurrentProfile from '../pages/ListCurrentProfile';
import UserHomePage from '../pages/UserHomePage';
import CalendarPage from '../pages/CalendarPage';
import ListStudySessions from '../pages/ListStudySessions';
import EditStudySession from '../pages/EditStudySession';
import CreateProfile from '../pages/CreateProfile';
import EditProfile from '../pages/EditProfile';
import MySessions from '../pages/MySessions';
import DisplayAddSession from '../pages/DisplayAddSession';

/** Top-level layout component for this application. Called in imports/startup/client/startup.jsx. */
const App = () => {
  const { ready } = useTracker(() => {
    const rdy = Roles.subscription.ready();
    return {
      ready: rdy,
    };
  });
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <NavBar />
        <Routes>
          <Route exact path="/" element={<Landing />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signout" element={<SignOut />} />
          <Route path="/home" element={<ProtectedRoute><Landing /></ProtectedRoute>} />
          <Route path="/list" element={<ProtectedRoute><ListContacts /></ProtectedRoute>} /> {/* Changed ListStuff to ListContacts */}
          <Route path="/view-profiles" element={<ProtectedRoute><ListProfiles /></ProtectedRoute>} /> {/* Added link to viewable profiles */}
          <Route path="/calendar" element={<CalendarPage />} /> {/* Added the Calendar Page */}
          <Route path="/my-profile" element={<ProtectedRoute><ListCurrentProfile /></ProtectedRoute>} /> {/* Added link to viewable profiles */}
          <Route path="/user-home" element={<ProtectedRoute><UserHomePage /></ProtectedRoute>} /> {/* Added link to viewable profiles */}
          <Route path="/create-study-session" element={<ProtectedRoute><DisplayAddSession /></ProtectedRoute>} />
          <Route path="/view-study-session" element={<ProtectedRoute><ListStudySessions /></ProtectedRoute>} />
          <Route path="/create" element={<ProtectedRoute><CreateProfile /></ProtectedRoute>} />
          <Route path="/my-sessions" element={<ProtectedRoute><MySessions /></ProtectedRoute>} />
          <Route path="/edit/:_id" element={<ProtectedRoute><EditProfile /></ProtectedRoute>} />
          <Route path="/edit-study-session/:_id" element={<ProtectedRoute><EditStudySession /></ProtectedRoute>} />
          <Route path="/admin" element={<AdminProtectedRoute ready={ready}><ListContactsAdmin /></AdminProtectedRoute>} />
          <Route path="/notauthorized" element={<NotAuthorized />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

/*
 * ProtectedRoute (see React Router v6 sample)
 * Checks for Meteor login before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const ProtectedRoute = ({ children }) => {
  const isLogged = Meteor.userId() !== null;
  return isLogged ? children : <Navigate to="/signin" />;
};

/**
 * AdminProtectedRoute (see React Router v6 sample)
 * Checks for Meteor login and admin role before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const AdminProtectedRoute = ({ ready, children }) => {
  const isLogged = Meteor.userId() !== null;
  if (!isLogged) {
    return <Navigate to="/signin" />;
  }
  if (!ready) {
    return <LoadingSpinner />;
  }
  const isAdmin = Roles.userIsInRole(Meteor.userId(), 'admin');
  return (isLogged && isAdmin) ? children : <Navigate to="/notauthorized" />;
};

// Require a component and location to be passed to each ProtectedRoute.
ProtectedRoute.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
};

ProtectedRoute.defaultProps = {
  children: <Landing />,
};

// Require a component and location to be passed to each AdminProtectedRoute.
AdminProtectedRoute.propTypes = {
  ready: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
};

AdminProtectedRoute.defaultProps = {
  ready: false,
  children: <Landing />,
};

export default App;
