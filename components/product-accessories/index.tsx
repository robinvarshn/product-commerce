import '@styles/_product-accessories';
import { ProductAccessories } from './product-accessories';

const ProductAccessories = ({ accList }: ProductAccessories): JSX.Element => {
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
