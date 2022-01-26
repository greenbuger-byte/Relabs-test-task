import { useEffect, useState } from "react";
import { Layout } from "antd";
import Head from "next/head";
import PropTypes from "prop-types";
import styles from "./default.module.scss";
import auth from "../../utils/auth";
import FooterComponent from "../../components/footer";
import BreadcrumbsComponent from "../../components/breadcrumbs/breadcrumbs.component";
import HeaderComponent from "../../components/header/header.component";


const DefaultLayout = (props) => {
  const { children, title, withBreadcrumbs } = props;
  const { Content } = Layout;
  const [user, setUser] = useState(null);

  useEffect( () => {
      !user && auth.getAuth().then(response => {
          setUser(response);
      });
  })

  const logoutUserHandler = () =>   setUser(null);

  return (
      <Layout>
          <Head>
              <title>{title}</title>
              <meta name="description" content="Тестовое приложение Relabs" />
              <link rel="icon" href="/favicon.ico" />
          </Head>
          <HeaderComponent user={user} logoutUser={logoutUserHandler} />
          <Content className={styles.container}>
              {withBreadcrumbs && <BreadcrumbsComponent />}
              {children}
          </Content>
          <FooterComponent />
    </Layout>);
};

DefaultLayout.proptypes = {
    //Контент страницы
    children: PropTypes.node,
    // Название страницы
    title: PropTypes.string,
    //Отображение breadcrumbs
    withBreadcrumbs: PropTypes.bool,
}

export default DefaultLayout;
