import React, { useState, ComponentType, useEffect } from "react";
import { useObserver } from "mobx-react";
import { services } from "../../Services";
import {
    ThemeProvider
} from "@material-ui/core";
import { Route as DomRoute } from "react-router-dom";
import { Router, Switch } from "react-router";
import { theme } from "../../theme";
import Frame, { LazyRoute } from "../frame/Frame";
import { History } from "history";
import { ChildRoute, Route } from "../../Models";
import HeaderToolbar from "./ecosystems/HeaderToolbar";
import { lazyWithPreload } from "../../Commons/lazyWithPreload";

interface MacchaMainProp {
    history: History;
    hiddenLazyRoutes: (Route & { loadedComponent: any })[];
    settings: Route[];
    menus: Route[];
}

export default (props: MacchaMainProp) => useObserver(() => {
    const [filteredMenus, setFilteredMenus] = useState([]);
    const [filteredSettings, setFilteredSettings] = useState([]);
    const { authService } = services;

    useEffect(() => {
        handleRoute();
    }, [services.pluginsService.plugins]);

    function handleRoute() {
        setFilteredMenus(
            loadAll([...props.menus, ...services.pluginsService.plugins]).filter((r: any) => r.role <= services.authService.loginInfo.role) as any
        );
        setFilteredSettings(
            loadAll(props.settings).filter((r: any) => r.role <= services.authService.loginInfo.role) as any
        );
    }

    return <ThemeProvider theme={theme}>
        <Router history={props.history}>
            <Switch>
                {props.hiddenLazyRoutes.map((x, i) => (
                    <DomRoute key={i}
                        exact path={x.path}
                        component={x.loadedComponent as any}>
                    </DomRoute>
                ))}
                <DomRoute path="/">
                    <Frame
                        logo="/maccha.png"
                        settings={filteredSettings}
                        menus={filteredMenus}
                        user={authService.loginInfo}
                        toolbarContent={
                            <HeaderToolbar />
                        } />
                </DomRoute>
            </Switch>
        </Router>
    </ThemeProvider >;
});


// helpers
function loadAll(root: Route[]) {
    const load = (route: ChildRoute | Route) => ({ ...route, lazyComponent: lazyWithPreload(route.component) }) as any;

    function loadChildren(route: ChildRoute | Route): LazyRoute & (ChildRoute | Route) {
        return {
            ...load(route),
            lazyChildren: route.children?.map(r => loadChildren(r)) ?? []
        };
    }

    return root.map(r => loadChildren(r));
}