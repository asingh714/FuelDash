import { useQuery } from "@tanstack/react-query";

import newRequest from "../../utils/newRequest";
import "./TopProductSalesBox.scss";

const TopProductSalesBox = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["topNonGasolineProducts"],
    queryFn: () =>
      newRequest.get("/sales/64ff54c0b485b42210278316").then((res) => {
        console.log(res);
      }),
  });

  return (
    <div className="top-product-sales-box-container">
      <h2>Top Non Gasoline Products</h2>
    </div>
  );
};

export default TopProductSalesBox;
