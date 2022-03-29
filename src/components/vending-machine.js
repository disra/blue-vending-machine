import { useState } from "react";
import Product from "./product";
import AlertBox from "./alert-box";
import ConfirmBox from "./confirm-box";
import Swal from "sweetalert2";

const VendingMachine = ({
  products=[],
  coinStocks=[],
  updateStock,
  updateCoinStock,
}) => {
  const [selectedProduct, setSelectedProduct] = useState({ price: 0 });
  const [coinInsert, setCoinInsert] = useState();
  const [changes, setChanges] = useState(0);
  const [alertBox, setAlertBox] = useState({
    show: false,
    message: "",
  });
  const [confirmBox, setConfirmBox] = useState({
    show: false,
    confirm: false,
    product: {},
  });
  const changeDIV = (data) => {
    return `<div class="mb-2">Your changes ${data[1]} THB</div>
  <div class="change">
    ${data[2]
      .map(
        (item) => `<div class="mt-2 mr-2">
        <img class="${item[0] > 10 ? "bank-image" : "coin-image"}" 
              src="/assets/img/${
                item[0] > 10 ? `bank${item[0]}` : `coin${item[0]}`
              }.png"/> : ${item[1]},</div>`
      )
      .join(" ")}
  </div>`;
  };

  const showPrice = (product) => {
    setConfirmBox({ show: true, product: product });
    setCoinInsert(
      coinStocks.map((coin) => {
        return { ...coin, amount: 0 };
      })
    );
    setSelectedProduct(product);
  };

  const close = () => {
    setChanges(0);
    setAlertBox({ ...alertBox, show: false });
    setConfirmBox({ ...confirmBox, show: false });
  };

  const cancel = () => {
    close();
    setSelectedProduct({
      ...selectedProduct,
      id: null,
      price: 0,
    });
  };

  const confirmPayment = () => {
    setConfirmBox({ ...confirmBox, confirm: true });
  };

  const insert = (value) => {
    let coinType = coinInsert.filter((coin) => coin.value === value)[0];
    let temp = coinInsert.filter((coin) => coin.value !== value);
    coinType = { ...coinType, amount: coinType.amount + 1 };
    setCoinInsert([...temp, coinType]);
  };

  const pay = () => {
    fetch("/api/calculate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productPrice: selectedProduct.price,
        coinInsert: coinInsert,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.Error !== undefined) {
          throw data.Error;
        }
        updateStock(selectedProduct.id, {
          ...selectedProduct,
          quantity: selectedProduct.quantity - 1,
        });
        setSelectedProduct({
          ...selectedProduct,
          id: null,
          price: 0,
        });
        updateCoinStock(data[0]);
        close();
        Swal.fire({
          icon: "success",
          title: "Thank you for purchase",
          html: changeDIV(data),
          showConfirmButton: false,
          timer: 5000,
        });
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: err,
          showConfirmButton: false,
          timer: 3000,
        });
      });
  };

  return (
    <div className="vending-machine">
      <div className="vending-machine__showcase">
        <AlertBox
          show={alertBox.show}
          message={alertBox.message}
          changes={changes}
          close={close}
        ></AlertBox>
        <ConfirmBox
          show={confirmBox.show}
          product={confirmBox.product}
          pay={pay}
          confirmClick={confirmPayment}
          confirm={confirmBox.confirm}
          cancel={cancel}
          coinInsert={coinInsert}
        ></ConfirmBox>
        <div className="vending-machine__shelf">
          {products.map((product, product_id) => {
            return (
              <Product
                key={product_id}
                product={product}
                showPrice={showPrice}
                isSelected={selectedProduct.id}
              />
            );
          })}
        </div>
      </div>
      <div className="vending-machine__slot">
        <div className="vending-machine__price-panel">
          {selectedProduct.price}
        </div>
        <div className="vending-machine__coin-slot">
          {coinStocks
            .filter((item) => item.types === "coin")
            .map((item, index) => {
              return (
                <div
                  key={index}
                  className={`vending-machine__coin ${
                    alertBox.show || !confirmBox.confirm ? "disable" : ""
                  }`}
                  onClick={() => insert(item.value)}
                >
                  <img
                    src={`/assets/img/coin${item.value}.png`}
                    className="vending-machine__coin-image"
                    alt={item.value}
                  />
                </div>
              );
            })}
        </div>
        <div className="vending-machine__banknote-slot">
          {coinStocks
            .filter((item) => item.types === "bank")
            .map((item, index) => {
              return (
                <div
                  key={index}
                  className={`vending-machine__banknote  ${
                    alertBox.show || !confirmBox.confirm ? "disable" : ""
                  }`}
                  onClick={() => insert(item.value)}
                >
                  <img
                    src={`/assets/img/bank${item.value}.png`}
                    className="vending-machine__banknote-image"
                    alt={item.value}
                  />
                </div>
              );
            })}
        </div>
        <div
          className={`vending-machine__changes btn btn-${
            changes > 0 ? "success" : "danger"
          }`}
          onClick={close}
        >
          Take changes
        </div>
      </div>
    </div>
  );
};

export default VendingMachine;
