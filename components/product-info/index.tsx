import '@styles/_product-info.scss';
import Rating from 'components/rating';
import { ProductInfoTypes } from './product-info.tsx';

const ProductInfo = ({ productMeta, features, tags }: ProductInfoTypes): JSX.Element => {
    return (
        <div className="product-info">
            <p className="product-info__title">{productMeta?.title}</p>
            <div className="product-info__rating">
                <div className="product-info__stars">
                    <Rating rating={productMeta?.rating} />
                </div>
                <div className="product-info__reviews">{productMeta?.reviews}</div>
            </div>
            <div className="product-info__pricing">{productMeta?.price}</div>
            <div className="product-info__features">
                <p className="product-info__featuretitle">{features?.title}</p>
                <ul className="product-info__featurelist">
                    {features?.features.map((x, index) => (
                        <li key={index} className="product-info__featureitem">
                            {x}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="product-info__tags">
                <p className="product-info__tagstitle">{tags?.title}</p>
                <ul className="product-info__taglist">
                    {tags?.tags.map((x, index) => (
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
