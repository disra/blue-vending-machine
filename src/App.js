import "./App.scss";
import { Container, Row, Col } from "react-bootstrap";
import { useCallback, useEffect, useState } from "react";
import { VendingMachine, Backdoor, AdjustProduct } from "./components/index";

function App() {
  const [products, setProducts] = useState([]);
  const [coinStocks, setCoinStocks] = useState([]);

  const restructure = (data) => {
    return Object.keys(data).map((item, index) => {
      return { ...Object.values(data)[index], id: item };
    });
  };

  const getProducts = useCallback(() => {
    let option = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch("/api/get-product", option)
      .then((res) => res.json())
      .then((data) => {
        let temp = restructure(data);
        setProducts(temp);
      })
      .catch((err) => {
        alert(err);
      });
  }, []);

  const getCoinStocks = useCallback(() => {
    let option = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch("/api/get-coinstocks", option)
      .then((res) => res.json())
      .then((data) => {
        let temp = restructure(data);
        setCoinStocks(temp);
      })
      .catch((err) => {
        alert(err);
      });
  }, []);

  const updateStock = (id, product) => {
    let option = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    };
    fetch(`/api/update-product/${id}`, option)
      .then((res) => res.json())
      .then((data) => {
        let temp = restructure(data);
        setProducts(temp);
      })
      .catch((err) => {
        alert(err);
      });
  };

  const updateCoinStock = (coinstocks) => {
    let temp = restructure(coinstocks);
    setCoinStocks(temp);
  };

  useEffect(() => {
    getProducts();
    getCoinStocks();
  }, [getProducts, getCoinStocks]);

  return (
    <div className="App">
      <section className="headers">
        <Container>
          <Row>
            <Col>
              <h1>Blue vending machines</h1>
            </Col>
          </Row>
        </Container>
      </section>
      <section>
        <Container>
          <Row className="position-static justify-content-center">
            <Col lg={8}>
              <VendingMachine
                products={products}
                coinStocks={coinStocks}
                updateStock={updateStock}
                updateCoinStock={updateCoinStock}
              />
            </Col>
            <Col lg={2}>
              <Backdoor coinStocks={coinStocks}></Backdoor>
            </Col>
            <Col sm={12} className="position-static">
              <AdjustProduct
                products={products}
                restructure={restructure}
                setProducts={setProducts}
              />
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
}

export default App;
