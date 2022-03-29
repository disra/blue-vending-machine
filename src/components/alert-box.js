const AlertBox = ({ show, message, changes, close }) => {
  return (
    <div className={`alert-box ${show ? "show" : ""}`}>
      <div className="alert-box__message">
        <div className="alert-box__close-button" onClick={close}>
          <img
            src="/assets/icons/close.png"
            className="alert-box__close-button-icon"
            alt="close"
          />
        </div>
        <div>{message}</div>
        <div className="font-weight-bold">
          {changes === 0
            ? ""
            : "Your changes is " + Math.abs(changes).toLocaleString()}
        </div>
      </div>
    </div>
  );
};

export default AlertBox;
