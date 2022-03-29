const Backdoor = ({ coinStocks=[] }) => {
  return (
    <div className="backdoor">
      {coinStocks
        .sort((a, b) => b.id < a.id)
        .map((item, id) => {
          return (
            <div key={id} className={`backdoor__${item.types}`}>
              <img
                key={id}
                className={`backdoor__${item.types}-image`}
                src={`/assets/img/${item.types}${item.value}.png`}
                alt={`${item.types}${item.value}`}
              />
              <div className="backdoor__remaining">= {item.amount}</div>
            </div>
          );
        })}
    </div>
  );
};

export default Backdoor;
