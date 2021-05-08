import React from "react";
import Sidebar from "../Sidebar"
import { Switch, Route, Redirect } from "react-router-dom"
import UserForm from "../UserForm";
import styles from "./Home.module.css"
import UserCard from "../UserCard";
import Canvas from "../Canvas";

const Home = () => {
    return (
        <div className={styles.home}>
            <Sidebar />
            <Switch>
                <Route path='/' exact component={UserForm} />
                <Route path='/canvas' exact component={Canvas} />
                <Route path='/user' exact component={UserCard} />
                <Redirect to="/" />
            </Switch>
        </div>
    );
}

export default Home;
