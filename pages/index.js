import { Col, Row, Typography } from "antd";

import DefaultLayout from "../app/layout/default/default.layout";
import UserListComponent from "../app/components/users-list";
import EventsComponent from "../app/components/events/events.component";

const Home = () => {
  return (
    <DefaultLayout title={'Главная страница'}>
        <Row gutter={10}>
            <Col sm={24} lg={12}>
                <Typography.Title level={3}>Список пользователей</Typography.Title>
               <UserListComponent />
            </Col>
            <Col sm={24} lg={12}>
                <Typography.Title level={3}>События</Typography.Title>
                <EventsComponent />
            </Col>
        </Row>
    </DefaultLayout>
  )
}

export default Home;
