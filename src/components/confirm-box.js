const ConfirmBox = ({
  show,
  product={},
  pay,
  confirmClick,
  confirm,
  coinInsert,
  cancel,
}) => {
  const handleClose = () => {
    cancel();
    setTimeout(() => confirmClick, 1000);
  };

  const calculateInsertedCoin = () => {
    if (coinInsert.length > 0) {
      let total = coinInsert.reduce(
        (total, coin) => (total += coin.value * coin.amount),
        0
      );
      return total > 0 ? total : 0;
    }
    return 0;
  };

  return (
    <div className={`confirm-box ${show ? "show" : ""}`}>
      <div className="confirm-box__product">
        <div className="confirm-box__product-name">{product.name}</div>
        <div className="confirm-box__product-pic">
          <img
            className="confirm-box__product-image"
            src="/assets/img/bottle.png"
            alt={`product${product.id}`}
          />
        </div>
        <div className="confirm-box__product-price">{product.price} THB</div>
        {confirm ? (
          <div className="text-center">
            <div className="small">Please insert money for purchase</div>
            <div>Inserted: {calculateInsertedCoin()}</div>
          </div>
        ) : (
          ""
        )}
        <div className="confirm-box__button-group">
          <div
            className="confirm-box__button btn btn-primary"
            onClick={confirm ? pay : confirmClick}
          >
            OK
          </div>
          <div
            className="confirm-box__button btn btn-danger"
            onClick={handleClose}
          >
            Cancel
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmBox;
