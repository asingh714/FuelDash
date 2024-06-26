import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../utils/AuthContext";
import Notification from "../Notification/Notification";
import { useQuery } from "@tanstack/react-query";

import newRequest from "../../utils/newRequest";
import PieChartBox from "../PieChartBox/PieChartBox";
import TinyChartBox from "../TinyChartBox/TinyChartBox";
import TopProductSalesBox from "../TopProductSalesBox/TopProductSalesBox";
import BarChartBox from "../BarChartBox/BarChartBox";
import PropertyDropdown from "../PropertyDropdown/PropertyDropdown";
import GasInventoryBoxes from "../GasInventoryBoxes/GasInventoryBoxes";
import InventoryContainer from "../InventoryContainer/InventoryContainer";
import DateSelector from "../DatePicker/DatePicker";

import "./DashboardContainer.scss";
import OvalLoader from "../OvalLoader/OvalLoader";

const getCurrentLocalDate = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const DashboardContainer = () => {
  const [errorMsg, setErrorMsg] = useState(null);
  const [propertyId, setPropertyId] = useState(undefined);
  const [notification, setNotification] = useState(null);
  const [date, setDate] = useState(null);

  const navigate = useNavigate();
  const { currentUser } = useAuth();

  useEffect(() => {
    if (!currentUser) {
      setNotification({
        type: "error",
        message: "You are not logged in. Redirecting to login page...",
      });
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    }
  }, [currentUser, navigate]);

  useEffect(() => {
    fetchLatestDate();
  }, [propertyId]);

  const fetchLatestDate = async () => {
    try {
      if (!propertyId) {
        setDate(getCurrentLocalDate());
        return;
      }
      const response = await newRequest.get(`/sales/${propertyId}/latestDate`);

      setDate(response.data.date);
    } catch (error) {
      console.error("Error fetching latest date:", error);
      setDate(getCurrentLocalDate());
      setErrorMsg("Error fetching latest date");
    }
  };

  const { isLoading, isError, error, data } = useQuery(
    [propertyId, date],
    async () => {
      if (!propertyId || !date) return null;

      const response = await newRequest.get(`/sales/${propertyId}/${date}`);
      console.log("response.data", response);

      return response.data;
    },
    { enabled: !!date }
  );

  useEffect(() => {
    if (error) {
      setErrorMsg(
        error instanceof Error ? error.response.data.msg : String(error)
      );
    }
  }, [error]);

  const hasData = data && Object.keys(data).length > 0;

  if (isLoading) {
    return <OvalLoader />;
  }

  if (isError) {
    console.error("Error loading data:", error);
    return (
      <div className="error-message">{errorMsg || "Error loading data"}</div>
    );
  }

  return (
    <>
      {notification && (
        <Notification
          type={notification.type}
          message={notification.message}
          onClose={() => setNotification(null)}
        />
      )}
      <div className="dashboard-whole-container">
        <div className="dashboard-menu-container">
          <DateSelector currentDate={date} onDateChange={setDate} />

          <PropertyDropdown
            onPropertiesFetched={(properties) => {
              if (properties?.length > 0 && !propertyId) {
                setPropertyId(properties[0]._id);
              }
            }}
            onPropertyChange={setPropertyId}
            defaultSelected={propertyId}
          />
        </div>
        {!hasData ? (
          <div className="error-message">
            <p>
              No sales data available. Please enter sales data to view the
              dashboard.
            </p>
          </div>
        ) : (
          <div className="dashboard-container">
            <div className="box box1">
              <TopProductSalesBox chartData={data?.topNonGasProducts} />
            </div>
            <div className="box box2">
              <TinyChartBox
                money={true}
                color="#84cc16"
                icon="/revenue.svg"
                title="Revenue"
                total={data?.totalRevenue}
                chartData={data?.sevenDaysRevenue}
                myDataKey="Revenue"
                lineDataKey="date"
                detailedPage="revenue"
                propertyId={propertyId}
              />
            </div>
            <div className="box box3">
              <TinyChartBox
                money={false}
                color="#3b82f6"
                icon="/gas-station.svg"
                title="Gallons Sold"
                total={data?.totalGallonsSold}
                chartData={data?.sevenDaysTotalGallons}
                myDataKey="Gallons Sold"
                lineDataKey="day"
                detailedPage="gallons"
                propertyId={propertyId}
              />
            </div>
            <div className="box box4">
              <PieChartBox
                title="Top Selling Gasoline Products"
                chartData={data?.topGasProducts}
              />
            </div>
            <div className="box box5">
              <TinyChartBox
                money={true}
                color="#0d9488"
                icon="/cash.svg"
                title="Cash Payments"
                total={data?.dailyCashPayments}
                chartData={data?.sevenDaysPaymentTotals}
                myDataKey="Total Cash"
                lineDataKey="day"
                detailedPage="cash"
                propertyId={propertyId}
              />
            </div>
            <div className="box box6">
              <TinyChartBox
                money={true}
                color="#7c3aed"
                icon="/credit-card.svg"
                title="Credit Card Payments"
                total={data?.dailyCreditCardPayments}
                chartData={data?.sevenDaysPaymentTotals}
                myDataKey="Total Credit Card"
                lineDataKey="day"
                detailedPage="credit"
                propertyId={propertyId}
              />
            </div>
            <div className="box box7">
              <BarChartBox
                chartData={data?.sevenDaysRevenue}
                color="#0d9488"
                title="7 Day Revenue"
                bar="Revenue"
                xaxis="date"
              />
            </div>
            <div className="box box8">
              <BarChartBox
                chartData={data?.sevenDaysTotalGallons}
                color="#3b82f6"
                title="7 Day Gallons Sold"
                bar="Gallons Sold"
                xaxis="day"
              />
            </div>

            <div className="box box9">
              <GasInventoryBoxes propertyId={propertyId} />
            </div>

            <div className="box box10">
              <InventoryContainer propertyId={propertyId} />
            </div>
          </div>
        )}
      </div>
    </>
  );
};
export default DashboardContainer;
