import React, {useState} from "react";
import { NavLink } from 'react-router-dom';
import styles from "./Sidebar.module.css"
import cx from "classnames";
import {
    faAngleDoubleRight,
    faAngleDoubleLeft,
    faCaretUp,
    faCaretDown,
    faHome,
    faPalette,
    faUser
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const Sidebar = () => {
    const [showSubMenu, setShowSubMenu] = useState(false);
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

    return (
        <div className={sidebarCollapsed ? styles.sidebarCollapsed : styles.sidebar}>
            <h1 className={
                sidebarCollapsed ? styles.sidebarHeadingCollapsed : styles.sidebarHeading
            }>
                Demo
            </h1>
            <FontAwesomeIcon
                className={styles.toggleSidebarIcon}
                icon={sidebarCollapsed ? faAngleDoubleRight : faAngleDoubleLeft}
                onClick={() => {
                    setSidebarCollapsed(!sidebarCollapsed);
                }}
            />
            <nav>
                <NavLink
                    className={
                        cx(styles.menuItemContainer, { [styles.subMenuActive]: showSubMenu })
                    }
                    exact
                    to="/"
                    onClick={() => {
                    setShowSubMenu(!showSubMenu)
                }} >
                    <div className={
                        sidebarCollapsed ? styles.menuItemCollapsed : styles.menuItem
                    }>
                        <FontAwesomeIcon
                            className={sidebarCollapsed ? styles.menuIconCollapsed : styles.menuIcon}
                            icon={faHome}
                        />
                        <span className={
                            sidebarCollapsed ? styles.menuItemLabelCollapsed : styles.menuItemLabel
                        }>
                            Home
                        </span>
                        <FontAwesomeIcon
                            className={
                                sidebarCollapsed ? styles.caretIconCollapsed : styles.caretIcon
                            }
                            icon={showSubMenu ? faCaretUp : faCaretDown}
                        />
                    </div>
                </NavLink>
                {showSubMenu && (
                    <div className={styles.subMenu}>
                        <NavLink
                            className={styles.subMenuItemContainer}
                            exact
                            to={"/Canvas"}
                            activeClassName={styles.active}
                        >
                            <div className={
                                sidebarCollapsed ? styles.menuItemCollapsed : styles.menuItem
                            }>
                                <FontAwesomeIcon
                                    className={sidebarCollapsed ? styles.menuIconCollapsed : styles.menuIcon}
                                    icon={faPalette}
                                />
                                <span className={
                                    sidebarCollapsed ? styles.menuItemLabelCollapsed : styles.menuItemLabel
                                }>
                                    Canvas
                                </span>
                            </div>
                        </NavLink>
                        <NavLink
                            className={styles.subMenuItemContainer}
                            exact
                            to={"/user"}
                            activeClassName={styles.active}
                        >
                            <div className={
                                sidebarCollapsed ? styles.menuItemCollapsed : styles.menuItem
                            }>
                                <FontAwesomeIcon
                                    className={sidebarCollapsed ? styles.menuIconCollapsed : styles.menuIcon}
                                    icon={faUser}
                                />
                                <span className={
                                    sidebarCollapsed ? styles.menuItemLabelCollapsed : styles.menuItemLabel
                                }>
                                    User
                                </span>
                            </div>
                        </NavLink>
                    </div>
                )}
            </nav>
        </div>
    )
}

export default Sidebar;