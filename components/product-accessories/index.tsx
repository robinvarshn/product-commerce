import '@styles/_product-accessories.scss';
import { ProductAccessoriesTypes } from './product-accessories';

const ProductAccessories = ({ accList }: ProductAccessoriesTypes): JSX.Element => {
    return (
        <div className="accessories">
            <ul className="accessories__list">
                {accList &&
                    accList.map((x, index) => (
                        <li key={index} className="accessories__item">
                            {x}
                        </li>
                    ))}
            </ul>
        </div>
    );
};

export default ProductAccessories;
