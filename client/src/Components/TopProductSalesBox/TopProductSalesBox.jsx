import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";

import defaultImages from "../../utils/imageData";
import "./TopProductSalesBox.scss";

const TopProductSalesBox = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["topNonGasProducts"],
    queryFn: () =>
      newRequest
        .get("/sales/64ff54c0b485b42210278316/6500a125cb0d5cb6450b6ca5")
        .then((res) => res.data.topNonGasProducts),
  });

  return (
    <div className="top-product-sales-box-container">
      <h2>Top Selling Non Gasoline Products</h2>
      {isLoading
        ? "loading"
        : error
        ? "error"
        : data.map((product) => (
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
  );
};

export default TopProductSalesBox;
