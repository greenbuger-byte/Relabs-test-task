import PropTypes from "prop-types";
import { useState } from "react";
import { Col } from "antd";
import { StarOutlined, StarFilled, HeartFilled, HeartOutlined } from "@ant-design/icons";

import mirSvg from "../../icons/mir.svg";
import gPaySvg from "../../icons/g_pay.svg";
import sbpSvg from "../../icons/spb.svg";

import styles from "./product-card.module.scss";

const ProductCardComponent = (props) => {
    const { product } = props;
    const [favorite, setFavorite] = useState(false);

    const renderFavorites = favorite ? <HeartFilled /> : <HeartOutlined />;
    const formatPrice = (price) => new Intl.NumberFormat('ru-RU').format(price);

    const renderOldPrice = product.oldPrice && (
        <span  className={styles.product__oldPrice}>
            {formatPrice(product.oldPrice)}₽
        </span>
    );

    const renderStars = Array(5)
        .fill(0)
        .map( (_, index) => product.rating.mark > index
            ? <StarFilled key={index} className={styles.product__star} />
            : <StarOutlined key={index} className={styles.product__star}/> );
    return (
        <Col xs={12} sm={8} lg={4} md={6} >
            <div className={styles.product}>
                <div className={styles.product__image}>
                    <div className={styles.product__preview}>
                        <button>Быстрый просмотр</button>
                    </div>
                    <img src={product.images[0]} alt={product.title} />
                    {product?.sale && <div className={styles.product__sale}>{product.sale}</div>}
                </div>
                <div className={styles.product__body}>
                    <div className={styles.product__price}>
                   {formatPrice(product.price)}₽ {renderOldPrice}
                    </div>
                    <div className={styles.product__priceCard}>
                        {formatPrice(product.price)}₽
                        <img src={mirSvg.src}  alt={"Карта мир"}/>
                        <img src={gPaySvg.src}  alt={"Google pay"}/>
                        <img src={sbpSvg.src}  alt={"Система быстрых платежей"}/>
                    </div>
                    <div className={styles.product__title}>
                        {product.title}
                    </div>
                    <div className={styles.product__col}>
                        {renderStars} <span className={styles.product__totalCount}>{product?.rating?.total}</span>
                    </div>
                    <div className={styles.product__col}>
                        <button className="buttonWithGradient">РАССРОЧКА 0-0-6</button>
                    </div>
                    <div className={styles.product__buy}>
                        <button className="buttonPrimary"> В корзину </button>
                        <span
                            className={styles.product__favorite}
                            onClick={setFavorite.bind(null, (prev => !prev))}
                        >
                            {renderFavorites}
                        </span>
                    </div>
                </div>
            </div>
        </Col>
    );
};

ProductCardComponent.propTypes = {
    product: PropTypes.shape({
        // id товара
        id: PropTypes.string,
        // Название товара
        title:PropTypes.string,
        // Список изображений товара
        images: PropTypes.array,
        //Актуальная цена
        price: PropTypes.number,
        // Старая цена
        oldPrice: PropTypes.number,
        // Цена за покупку определенных карт
        cardPrice: PropTypes.number,
        // Выды оплаты со скидкой
        pays: PropTypes.array,
        // Рейтинг товара
        rating: PropTypes.shape({
            total: PropTypes.number,
            mark: PropTypes.number,
        }),
        // Доступные платежи
        credit: PropTypes.array,
    })
}

export default ProductCardComponent;