import Link from 'next/link';
import { useEffect, useState } from "react";
import { Breadcrumb, Space } from "antd";
import { HomeOutlined } from '@ant-design/icons';

import { ROUTES } from "../../utils/constants";

const BreadcrumbsComponent = () => {
    const LIST = {
        main: '<HomeOutlined />',
        shop: 'Магазин',
        login: 'Авторизация'
    }
    const [address, setAddress] = useState([]);

    useEffect( () => {
        if(typeof window !=='undefined'){
            setAddress(window.location.pathname.split('/'));
        }
    }, []);

    const renderBreadcrumbsList = () =>{
        if(address) {
            return address.map(
                item =>  (
                    <Breadcrumb.Item key={item}>
                       {LIST[item]}
                    </Breadcrumb.Item>
                )
            )
        }
    }

    return (
        <Space size="small">
            <Breadcrumb>
                <Breadcrumb.Item>
                    <Link href={ROUTES.main}><a><HomeOutlined /></a></Link>
                </Breadcrumb.Item>
                {renderBreadcrumbsList()}
            </Breadcrumb>
        </Space>
    );

};

export default BreadcrumbsComponent;