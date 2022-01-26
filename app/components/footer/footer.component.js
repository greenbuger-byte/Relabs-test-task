import React from 'react';
import { Layout } from 'antd';

import styles from "./footer.module.scss";

const FooterComponent = () => {
    const { Footer } = Layout;
    return (
        <Footer className={styles.footer}>
           <div className={styles.footer__wrapper}>
              МОБИЛЬКИН {new Date().getFullYear()}
           </div>
        </Footer>
    );
};

export default FooterComponent;