import React, { Component } from "react";
//import Container from 'react-bootstrap/Container'
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
//import ModalBody from 'react-bootstrap/ModalBody'
//import ModalFooter from 'react-bootstrap/ModalFooter'
import { connect } from "react-redux";

import "../Products/ProductListItems/modal.css";
import "./ProductDetails.css";
import * as Constant from "../../utils/constants.js";

// import * as ProductData from '../../data/products.json'
// import * as CategoryData from "../../data/category.json";
import * as LocalizedStrings from "../../locales/en/content.json";

//const productIDs = Object.keys(ProductData.products)

class ProductDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: this.props.list,
      currentIndex: 0,
      show: true,
      hoverImage: null,
      loading: false
    };
  }

  componentDidMount() {
    this.setState({
      currentIndex: this.state.list.findIndex(id => {
        return id === this.props.id;
      })
    });
  }

  onContactUs = () => {
    this.props.history &&
      this.props.history.push(Constant.routes_url.contactUs);
  };

  prevProduct = () => {
    let productIndex = this.state.currentIndex;
    if (productIndex > 0) {
      productIndex = productIndex - 1;
      this.setState({ currentIndex: productIndex });
    }
  };

  nextProduct = () => {
    let productIndex = this.state.currentIndex;
    let productCount = this.state.list.length;

    if (productIndex < productCount - 1) {
      productIndex = productIndex + 1;
      this.setState({ currentIndex: productIndex });
    }
  };

  getProductCategories = (e, id) => {
    const { categories } = this.props;
    var categoryName = [];
    var currentId = this.state.list[this.state.currentIndex];
    categories &&
      categories.filter(category => {
        if (category.products.includes(currentId)) {
          categoryName.push(LocalizedStrings.category[category.name]);
        }
      });
    return categoryName.join(", ");
  };

  getProduct = () => {
    const { products } = this.props;
    let currentId = this.state.list[this.state.currentIndex];

    if (products) return Object.values(this.getProductById(currentId))[0];
    else return null;
  };

  hideModal = () => {
    this.setState({ show: false });
    this.props.hideModal();
  };
  imageChange = (imagePath, event) => {
    if (this.state.loading === false) {
      this.setState({ hoverImage: imagePath, loading: true });
      setTimeout(
        () => this.setState({ loading: false, hoverImage: null }),
        1000
      );
    }
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
    let currentIndex = this.state.currentIndex;
    let productCount = this.state.list.length - 1;
    let product = this.getProduct();

    return (
      <div>
        {product && (
          <Modal
            show={this.state.show}
            onHide={this.hideModal}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header
              closeButton
              className="close-icons-product-details-display-none"
            >
              <Modal.Title id="contained-modal-title-vcenter">
                <div className="close-icons change-postion-left-arrow clearfix">
                  <div className="left-right-icons position-img">
                    <a
                      onClick={this.prevProduct}
                      className=" close-btn-arrrow-l"
                    >
                      <img
                        src={
                          currentIndex > 0
                            ? Constant.image_path.common + "arrow-left-red.png"
                            : Constant.image_path.common +
                              "arrow-left-black.png"
                        }
                        alt="left"
                      />
                    </a>
                    <a
                      onClick={this.nextProduct}
                      className="close-btn-arrrow-r"
                    >
                      <img
                        src={
                          currentIndex < productCount
                            ? Constant.image_path.common + "arrow-right-red.png"
                            : Constant.image_path.common +
                              "arrow-right-black.png"
                        }
                        alt="left"
                      />
                    </a>
                  </div>
                </div>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="main-product-details-box">
                <div className="products-details-close-mobile">
                  <a onClick={this.props.hideModal} className="">
                    <img
                      src={Constant.image_path.common + "cross.png"}
                      className="right-arrow"
                      alt="right-arrow"
                    />
                  </a>
                </div>
                <Row>
                  <Col md={4}>
                    <div className="products-details-image">
                      <img
                        src={
                          this.state.hoverImage !== null
                            ? this.state.hoverImage
                            : Constant.image_path.product +
                              product.id +
                              "/" +
                              product.comboImage
                        }
                        className="products-image-large"
                        alt="img"
                      />
                    </div>
                  </Col>
                  <Col md={2}>
                    <div className="select-details-more-img">
                      {product.images.map((image, index) => (
                        <img
                          key={index}
                          src={
                            Constant.image_path.product +
                            product.id +
                            "/" +
                            image
                          }
                          className="thumbs-img-size margin-bottom-size"
                          onMouseOver={this.imageChange.bind(
                            this,
                            Constant.image_path.product +
                              product.id +
                              "/" +
                              image
                          )}
                          alt="thumb-img-size"
                        />
                      ))}
                    </div>
                  </Col>

                  <Col md={6}>
                    <div className="products-details-name">
                      <p className="deatils-subtitle">
                        {LocalizedStrings.product[product.brewerName]}
                      </p>
                      <h2 className="details-title">
                        {LocalizedStrings.product[product.name]}
                      </h2>
                      <ul className="details-product">
                        <li>
                          <span className="details-name">TYPE:</span>
                          <span className="details-value">
                            {LocalizedStrings.product[product.type]}{" "}
                          </span>
                        </li>
                        <li>
                          <span className="details-name">ALC(VOL.):</span>
                          <span className="details-value">
                            {" "}
                            {LocalizedStrings.product[product.alc]}{" "}
                          </span>
                        </li>
                        <li>
                          <span className="details-name">SMV:</span>
                          <span className="details-value">
                            {LocalizedStrings.product[product.smv]}{" "}
                          </span>
                        </li>
                        <li>
                          <span className="details-name">ACIDITY:</span>
                          <span className="details-value">
                            {LocalizedStrings.product[product.acidity]}{" "}
                          </span>
                        </li>
                        <li>
                          <span className="details-name">RICE:</span>
                          <span className="details-value">
                            {LocalizedStrings.product[product.riceBrand]}
                          </span>
                        </li>
                        <li>
                          <span className="details-name">RICE MILLING:</span>
                          <span className="details-value">
                            {LocalizedStrings.product[product.riceMilling]}
                          </span>
                        </li>
                        <li>
                          <span className="details-name">CHAMPION SAKE:</span>
                          <span className="details-value">
                            {LocalizedStrings.product[product.championSake]}
                          </span>
                        </li>
                      </ul>
                      <div className="contactus-btn-div">
                        <Button
                          className="contactus-btn"
                          onClick={this.onContactUs}
                        >
                          contact us
                        </Button>
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
              <div className="description-details">
                <Row>
                  <Col md={6}>
                    <div className="description-text">
                      <p className="description-heading">Description</p>
                      <p className="details-dsec-subtitle">
                        {LocalizedStrings.product[product.description]}
                      </p>
                    </div>

                    <div className="desc-catogery-main-section">
                      <ul className="desc-product">
                        <li>
                          <span className="desc-name">SKU: </span>
                          <span className="desc-value">
                            {LocalizedStrings.product[product.sku]}
                          </span>
                        </li>
                        <li>
                          <span className="desc-name">Categories:</span>
                          <span className="desc-value">
                            {" "}
                            {this.getProductCategories()}
                          </span>
                        </li>
                        <li>
                          <span className="desc-name">Tags:</span>
                          <span className="desc-value">
                            {" "}
                            {LocalizedStrings.product[product.tags]}{" "}
                          </span>
                        </li>
                      </ul>
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="products-details-map-section">
                      <img
                        src={
                          product &&
                          Constant.image_path.breweryMaps + product.map
                        }
                        className="map-image-large"
                        style={{ height: "100%" }}
                        alt="img"
                      />
                    </div>
                  </Col>
                </Row>
              </div>
            </Modal.Body>
          </Modal>
        )}
      </div>
    );
  }
}

// export default ProductDetails;
const mapStateToProps = state => {
  return {
    state,
    categories: state.data.categories,
    products: state.data.products
  };
};

export default connect(mapStateToProps)(ProductDetails);
