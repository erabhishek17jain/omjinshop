import { Link } from 'react-router-dom';

export const getDiscount = (price, cuttedPrice) => {
    return (((cuttedPrice - price) / cuttedPrice) * 100).toFixed();
};

export const getDeliveryDate = () => {
    const deliveryDate = new Date();
    deliveryDate.setDate(new Date().getDate() + 7);
    return deliveryDate.toUTCString().substring(0, 11);
};

export const formatDate = (dt) => {
    return new Date(dt).toUTCString().substring(0, 16);
};

export const getRandomProducts = (prodsArray, n) => {
    return prodsArray.sort(() => 0.5 - Math.random()).slice(0, n);
};

export const getNavigation = (navigation) => {
    return (
        <div className="u-s-p-y-60">
            <div className="section__content">
                <div className="container">
                    <div className="breadcrumb">
                        <div className="breadcrumb__wrap">
                            <ul className="breadcrumb__list">
                                {Array.from(navigation).map((item, index) => (
                                    <li className={navigation.length - 1 === index ? 'is-marked' : 'has-separator'} key={item.title}>
                                        <Link to={item.path}>{item.title}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
