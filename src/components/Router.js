import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";

import App from "../App";
import Movie from "./Movie";

const Router = () => (
    <BrowserRouter>
        <Switch>
            <Route path="/" component={App} exact />
            <Route path="/movie/:imdbID" component={Movie} />
        </Switch>
    </BrowserRouter>   
);

export default Router;