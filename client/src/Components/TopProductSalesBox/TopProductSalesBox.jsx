import PropTypes from "prop-types";

import defaultImages from "../../utils/imageData";
import {
  formatCurrency,
  formatNumberToWholeNumbers,
} from "../../utils/formatCurrency";
import "./TopProductSalesBox.scss";

const TopProductSalesBox = ({ chartData = [] }) => {
  return (
    <div className="top-product-sales-box-container">
      <h2>Top Selling Non Gasoline Products</h2>
      <div className="top-products-item-container">
        {chartData.map((product) => (
          <div className="product-container" key={product.name}>
            <img
              src={defaultImages[product.name]}
              alt=""
              className="product-image"
            />
            <div className="name-price-container">
              <span className="product-name">{product.name}</span>
              <span className="product-price">
                {formatCurrency(product.price)}
              </span>
            </div>
            <span className="product-sales">
              {formatNumberToWholeNumbers(product.quantitySold)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

TopProductSalesBox.propTypes = {
  chartData: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      quantitySold: PropTypes.number,
    })
  ),
};

export default TopProductSalesBox;
