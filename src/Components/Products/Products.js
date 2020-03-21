import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
//import Button from 'react-bootstrap/Button'
//import FormControl from 'react-bootstrap/FormControl'
//import Form from 'react-bootstrap/Form'
import { connect } from "react-redux";
import { compose } from "redux";
import { Helmet } from "react-helmet";
import "./Products.css";
import "../Home/Home.css";
import "../../style/style.css";

import Header from "../Header/Header";
import MobileHeader from "../MobileHeader/MobileHeader";
import Categories from "../Categories/Categories";
import ProductListItems from "./ProductListItems/ProductListItems";
import * as Constant from "../../utils/constants.js";
// import * as BreweriesData from "../../data/breweries.json";
// import * as CategoriesData from "../../data/category.json";
import * as LocalizedStrings from "../../locales/en/content.json";
import * as Utils from "../../utils/utils.js";

import { withNamespaces } from "react-i18next";

class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileMenu: false,
      show: false,
      productIdList: [],
      selectedCategory: null,
      selectedBrewery: null
    };
  }

  componentDidMount() {
    const { categories } = this.props;
    categories && this.setState({ productIdList: categories[0].products });
    document.getElementById("products-container") &&
      document.getElementById("products-container").scrollIntoView();
  }

  componentDidUpdate(prev) {
    const { categories } = this.props;
    if (categories !== prev.categories)
      this.setState({ productIdList: categories[0].products });
  }

  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  openMenu = () => {
    this.setState({ mobileMenu: true });
  };

  closeMenu = () => {
    this.setState({ mobileMenu: false });
  };

  onCategoryChange = (productIdList, selectedCategory) => {
    this.setState({
      productIdList: productIdList,
      selectedCategory: selectedCategory
    });
  };

  onBreweryChange = event => {
    if (event.target.value === "default") return;
    var selectedBrewery = this.props.breweries.filter(brewery => {
      if (brewery.id === event.target.value) return brewery;
    });
    this.setState({
      productIdList: selectedBrewery[0].products,
      selectedBrewery: selectedBrewery
    });
  };

  render() {
    const { t, breweries } = this.props;
    let bgImage = Utils.isMobile()
      ? process.env.PUBLIC_URL +
        "/images/mobile-bg-img/background-product-image.png"
      : process.env.PUBLIC_URL + "/images/product/product-background-image.jpg";

    return (
      <div id="products-container" className="products-container">
        <Helmet>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>Craft Sake Imports Direct From Japan</title>
          <meta
            name="description"
            content="Experts in importing craft sake from Japan's finest medium/small breweries into Canada. "
          />
          <meta
            name="keywords"
            content="Japanese Sake, Craft Sake, Nihonshu, Japan Imports, Canada Sake Import, Ontario Sake, Rice Wine, Japanese wine, Importing Sake"
          />
          <link
            rel="canonical"
            href="https://nipponsake-cdd8f.web.app/products"
          />
        </Helmet>
        <div className=" header-img-section ">
          <img src={bgImage} className="product-banner" alt="" />
          <div className="product-banner-overlay-content">
            <div className="desktop-display">
              <Header
                pageId={Constant.page.products}
                history={this.props.history}
              />
            </div>

            <div
              className={
                this.state.mobileMenu === false
                  ? "mobile-display-none"
                  : "mobile-display-block"
              }
            >
              <MobileHeader
                pageId={Constant.page.products}
                closeMenu={this.closeMenu}
                history={this.props.history}
              />
            </div>

            <div className="icon-bar-display clearfix" onClick={this.openMenu}>
              <div className="icon-bar-mobile">
                <i className="fa fa-bars"></i>
              </div>
              <div className="logo-mobile">
                <img
                  src={process.env.PUBLIC_URL + "/images/logo/logo_white.png"}
                  className="logo-responsive"
                  alt="logo"
                />
              </div>
            </div>

            <Container className="products-inner-text">
              <div className="products-main-title">
                <p className="products-subtitle">
                  {t("products.ourSakeSelection")}
                </p>

                <h1 className="products-title">{t("products.products")} </h1>
                <p className="products-subtitles">{t("products.tagline")}</p>
              </div>
            </Container>
          </div>
        </div>

        <Container className="products-select-section">
          <div className="select-brewery-width clearfix display-select-option-desktop">
            <select className="select-brewery" onChange={this.onBreweryChange}>
              <option key={1001} value="default">
                {t("products.selectbrewery")}
              </option>

              {breweries &&
                breweries.map((brewery, index) => {
                  return (
                    <option key={index} value={brewery.id}>
                      {LocalizedStrings.brewery[brewery.title]}
                    </option>
                  );
                })}
            </select>
          </div>
        </Container>

        <Container className="products-category-list">
          <Row>
            <Col md={3} xs={12}>
              <div className="category-list category-mobile-none">
                <Categories
                  brewery={this.state.selectedBrewery}
                  onCategoryChange={this.onCategoryChange}
                />
              </div>
              <div className="category-list margin-mobile-ctaegory category-mobile-block">
                <Categories
                  brewery={this.state.selectedBrewery}
                  onCategoryChange={this.onCategoryChange}
                />
              </div>
            </Col>
            <Col xs={12} className="display-select-option-mobile">
              <div className="select-brewery-width clearfix">
                <select
                  className="select-brewery margin-select-list"
                  onChange={this.onBreweryChange}
                >
                  <option key={1001} value="default">
                    {LocalizedStrings.brewery.selectBreweryLabel}
                  </option>

                  {breweries &&
                    breweries.map((brewery, index) => {
                      return (
                        <option key={index} value={brewery.id}>
                          {LocalizedStrings.brewery[brewery.title]}
                        </option>
                      );
                    })}
                </select>
              </div>
            </Col>
            <Col md={9} xs={12}>
              <div className="products-list-category">
                <ProductListItems
                  history={this.props.history}
                  productIdList={this.state.productIdList}
                />
              </div>
            </Col>
          </Row>
        </Container>

        <div className="product-space"></div>
        <div className="border-bottom"></div>
      </div>
    );
  }
}

// export default withNamespaces() (Products);
const mapStateToProps = state => {
  return {
    state,
    products: state.data.products,
    categories: state.data.categories,
    breweries: state.data.breweries
  };
};

export default compose(
  connect(mapStateToProps),
  withNamespaces()
)(Products);
