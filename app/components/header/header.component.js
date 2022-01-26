import PropTypes from "prop-types";
import Avatar from 'react-avatar';
import Link from "next/link";
import { Button, Layout } from "antd";
import { HomeOutlined, LoginOutlined, LogoutOutlined, ShopOutlined } from "@ant-design/icons";

import auth from "../../utils/auth";
import { ROUTES } from "../../utils/constants";

import styles from "./header.module.scss";

const HeaderComponent = (props) => {
    const { user, logoutUser } = props;
    const { Header } = Layout;

    const logoutHandler = () => {
        auth.removeAuth().then(() => {
            logoutUser();
        })
    }

    const userContentRender = user
        ? (<div className={styles.header__user}>
            <span className={styles.avatar}>
                <Avatar
                    size={25}
                    name={user[0]}
                    round={true}
                />
            </span>
            {user}
            <Button
                type="link"
                onClick={logoutHandler}
                icon={<LogoutOutlined />}
            />
        </div>)
        : (
            <ul className={styles.header__nav}>
                <li className={styles.header__navItem} >
                    <Link href={ROUTES.login}><a><LoginOutlined /> Авторизация</a></Link>
                </li>
            </ul>);

    return (
        <Header className={styles.header}>
            <div className={styles.header__wrapper}>
                <div className={styles.header__block}>
                    <div className={styles.header__logo}>
                         МОБИЛЬКИН
                    </div>
                    <ul className={styles.header__nav}>
                        <li className={styles.header__navItem} ><Link href={ROUTES.main}><a><HomeOutlined /> Главная</a></Link></li>
                        <li className={styles.header__navItem} ><Link href={ROUTES.shop}><a><ShopOutlined /> Магазин</a></Link></li>
                    </ul>
                </div>
                <div className={styles.header__block}>
                    {userContentRender}
                </div>
            </div>
        </Header>
    );
};

HeaderComponent.propTypes = {
    //Авторизованный пользователь
    user: PropTypes.oneOfType([PropTypes.string,  PropTypes.oneOf([null])] ),
    // Удалить пользователя
    logoutUser: PropTypes.func,
}

export default HeaderComponent;