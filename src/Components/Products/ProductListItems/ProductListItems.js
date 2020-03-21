import React, { Component } from "react";
//import Container from 'react-bootstrap/Container'
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
//import Button from 'react-bootstrap/Button'
//import Modal from 'react-modal';
import { connect } from "react-redux";

import ProductDetails from "../../ProductDetails/ProductDetails";
import "./ProductListItems.css";
import "./modal.css";
// import * as Product from "../../../data/products.json";
import * as LocalizedStrings from "../../../locales/en/content.json";
import * as Constant from "../../../utils/constants.js";

class ProductListItems extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productIdList: this.props.productIdList,
      show: false,
      productId: null
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (
      JSON.stringify(nextProps.productIdList) !==
      JSON.stringify(this.state.productIdList)
    ) {
      this.setState({ productIdList: nextProps.productIdList });
      return true;
    }
    if (nextState.show !== this.state.show) {
      return true;
    }
    if (nextState.productId !== this.state.productId) {
      return true;
    }
    return false;
  }

  showModal = (productId, e) => {
    this.setState({ show: true, productId: productId });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  getProductById = id => {
    const { products } = this.props;
    if (products) {
      let product = products.filter(item => {
        if (Object.values(item)[0].id === id) return item;
      });
      return product[0];
    }
  };

  render() {
    const { products } = this.props;
    return (
      <div>
        {this.state.show && (
          <ProductDetails
            id={this.state.productId}
            list={this.state.productIdList}
            hideModal={this.hideModal}
            history={this.props.history}
          ></ProductDetails>
        )}
        <Row className="first-child-text-align-left">
          {products &&
            this.state.productIdList.map((productId, i) => (
              <Col
                style={{ cursor: "pointer" }}
                md={4}
                key={i}
                onClick={this.showModal.bind(this, productId)}
              >
                <div className="products-list-items">
                  <img
                    src={
                      this.getProductById(productId) &&
                      Constant.image_path.product +
                        productId +
                        "/" +
                        Object.values(this.getProductById(productId))[0]
                          .images[0]
                    }
                    className="product-img-size"
                    alt="img"
                  />
                  <p className="products-list-items-title">
                    {this.getProductById(productId) &&
                      LocalizedStrings.product[
                        Object.values(this.getProductById(productId))[0].name
                      ]}
                  </p>
                  <p className="products-list-items-desc">
                    {this.getProductById(productId) &&
                      LocalizedStrings.product[
                        Object.values(this.getProductById(productId))[0]
                          .description
                      ]}
                  </p>
                </div>
              </Col>
            ))}
        </Row>
      </div>
    );
  }
}

// export default ProductListItems;
const mapStateToProps = state => {
  return {
    state,
    products: state.data.products
  };
};

export default connect(mapStateToProps)(ProductListItems);
