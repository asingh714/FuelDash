import PropTypes from "prop-types";

import defaultImages from "../../utils/imageData";
import "./TopProductSalesBox.scss";

const TopProductSalesBox = ({ chartData }) => {
  return (
    <div className="top-product-sales-box-container">
      <h2>Top Selling Non Gasoline Products</h2>
      <div className="top-products-item-container">
        {chartData.map((product) => (
          <div className="product-container" key={product.id}>
            <img
              src={defaultImages[product.name]}
              alt=""
              className="product-image"
            />
            <div className="name-price-container">
              <div className="product-name">{product.name}</div>
            </div>
            <div className="product-sales">{product.quantitySold}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

TopProductSalesBox.propTypes = {
  chartData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      quantitySold: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default TopProductSalesBox;
