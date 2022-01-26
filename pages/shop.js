import ProductCardComponent from "../app/components/product-card";
import DefaultLayout from "../app/layout/default/default.layout";
import { Row, Typography } from "antd";
import { useEffect, useState } from "react";
import { getProducts } from "../mock/products";

const Shop = () => {
    const [products, setProducts] = useState([]);
    useEffect( () => {
        getProducts().then(response => {
            setProducts(response);
        })
    }, []);
    const renderProducts = products && products.map(product => <ProductCardComponent key={product.id} product={product} />)

    return (
        <DefaultLayout title="Страница магазина" withBreadcrumbs>
            <Typography.Title level={1}>Магазин товаров</Typography.Title>
            <Row gutter={5}>
                {renderProducts}
            </Row>
        </DefaultLayout>
    );
};

export default Shop;