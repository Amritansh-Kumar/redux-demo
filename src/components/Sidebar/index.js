import React, {useState} from "react";
import { NavLink } from 'react-router-dom';
import styles from "./Sidebar.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
    faHome,
    faCaretUp,
    faCaretDown,
    faPalette,
    faUser
} from "@fortawesome/free-solid-svg-icons"

const Sidebar = () => {
    const [showSubMenu, setShowSubMenu] = useState(false);

    return (
        <div className={styles.sidebar}>
            <h1 className={styles.sidebarHeading}>
                Demo
            </h1>
            <nav>
                <NavLink className={styles.menuItemContainer} exact to="/" onClick={() => {
                    setShowSubMenu(!showSubMenu)
                }} >
                    <div className={styles.menuItem}>
                        <FontAwesomeIcon icon={faHome} />
                        <span className={styles.menuItemLabel}>
                            Home
                        </span>
                        <FontAwesomeIcon
                            className={styles.caretIcon}
                            icon={showSubMenu ? faCaretUp : faCaretDown}
                        />
                    </div>
                </NavLink>
                {showSubMenu && (
                    <div className={styles.subMenu}>
                        <NavLink
                            className={styles.subMenuItemContainer}
                            exact to={"/Canvas"}
                        >
                            <div className={styles.menuItem}>
                                <FontAwesomeIcon icon={faPalette} />
                                <span className={styles.menuItemLabel}>
                                    Canvas
                                </span>
                            </div>
                        </NavLink>
                        <NavLink
                            className={styles.subMenuItemContainer}
                            exact to={"/user"}
                        >
                            <div className={styles.menuItem}>
                                <FontAwesomeIcon icon={faUser} />
                                <span className={styles.menuItemLabel}>
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