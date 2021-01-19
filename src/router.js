import React from 'react';
import {BrowserRouter as Router, Route,Switch, useHistory} from 'react-router-dom'

//Views
import Home from "./views/Home";

const TmobRouter = () => {
    let history = useHistory();
    return (
        <Router history={history}>
            <Switch>
                <Route exact path={'/'} component={Home}/>
            </Switch>
        </Router>
    )

}
export default TmobRouter;