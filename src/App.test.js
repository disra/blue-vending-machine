import React from "react";
import App from "./App";
import { shallow, mount } from "enzyme";

import { AdjustProduct, Backdoor, VendingMachine } from "./components";
import Product from "./components/product";
import AlertBox from "./components/alert-box";
import ConfirmBox from "./components/confirm-box";

describe("App", () => {
  it("renders without crashing", () => {
    shallow(<App />);
  });
});

describe("AdjustProduct", () => {
  it("renders without crashing", () => {
    shallow(<AdjustProduct />);
  });
});

describe("AlertBox", () => {
  it("renders without crashing", () => {
    shallow(<AlertBox />);
  });
});

describe("Backdoor", () => {
  it("renders without crashing", () => {
    shallow(<Backdoor />);
  });
});

describe("ConfirmBox", () => {
  it("renders without crashing", () => {
    shallow(<ConfirmBox />);
  });
});

describe("Product", () => {
  it("renders without crashing", () => {
    shallow(<Product />);
  });
});

describe("VendingMachine", () => {
  it("renders without crashing", () => {
    shallow(<VendingMachine />);
  });
});
