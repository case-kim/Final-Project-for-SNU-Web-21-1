import React, {Component} from "react";

import PropTypes from "prop-types";

import {BrowserRouter, Switch, Redirect, Route} from "react-router-dom";

import HomePage from "../HomePage";
import AdminPage from "../AdminPage";
import UserPage from "../UserPage";
import NotFoundPage from "../NotFoundPage";
import Questions from "../Test/Questions";
import ShowResult from "../Test/Result";
import Matching from "../Matching/Matching";
import ChatBoard from "../Chat/ChatBoard";

class Router extends Component {

    render() {
        // Properties
        const {user, roles, bar} = this.props;

        // Functions
        const {openSnackbar} = this.props;

        return (
            <BrowserRouter basename={process.env.REACT_APP_BASENAME}>
                {bar}

                <Switch>
                    <Route path="/" exact>
                        <HomePage user={user} openSnackbar={openSnackbar}/>
                    </Route>

                    <Route path="/admin">
                        {user && roles.includes("admin") ? (
                            <AdminPage/>
                        ) : (
                            <Redirect to="/"/>
                        )}
                    </Route>

                    <Route path="/test">
                        {user ? <Questions /> : <Redirect to="/" />}
                    </Route>

                    <Route path="/result">
                        {user ? <ShowResult /> : <Redirect to="/" />}
                    </Route>

                    <Route path="/matching">
                        {user ? <Matching /> : <Redirect to="/" />}
                    </Route>

                    <Route path="/chatting">
                        {user ? <ChatBoard /> : <Redirect to="/" />}
                    </Route>

                    <Route path="/user/:userId">
                        {user ? <UserPage/> : <Redirect to="/"/>}
                    </Route>

                    <Route>
                        <NotFoundPage/>
                    </Route>
                </Switch>
            </BrowserRouter>
        );
    }
}

Router.propTypes = {
    // Properties
    user: PropTypes.object,
    roles: PropTypes.array.isRequired,
    bar: PropTypes.element,

    // Functions
    openSnackbar: PropTypes.func.isRequired,
};

export default Router;
