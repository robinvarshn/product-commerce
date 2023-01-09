import '@styles/_product-info.scss';
import Rating from 'components/rating';
import { ProductInfoTypes } from './product-info.tsx';

const ProductInfo = ({ features, tags }: ProductInfoTypes): JSX.Element => {
    return (
        <div className="product-info">
            <p className="product-info__title">Iphone 14 PRO - 64GB</p>
            <div className="product-info__rating">
                <div className="product-info__stars">
                    <Rating rating="4.5" />
                </div>
                <div className="product-info__reviews">910 Ratings And 68 Reviews</div>
            </div>
            <div className="product-info__pricing">Rs. 73,002</div>
            <div className="product-info__features">
                <p className="product-info__featuretitle">{`WHY IT'S SPECIAL:`}</p>
                <ul className="product-info__featurelist">
                    {features.map((x, index) => (
                        <li key={index} className="product-info__featureitem">
                            {x}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="product-info__tags">
                <p className="product-info__tagstitle">{`GOOD TO KNOW:`}</p>
                <ul className="product-info__taglist">
                    {tags.map((x, index) => (
                        <li key={index} className="product-info__tagitem">
                            {x}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ProductInfo;
