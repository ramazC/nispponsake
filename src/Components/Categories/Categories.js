import React, { Component } from "react";
//import Container from 'react-bootstrap/Container'
import ListGroup from "react-bootstrap/ListGroup";
import * as Content from "../../locales/en/content.json";
// import * as Catgory from '../../data/category.json'
import { connect } from "react-redux";
import { compose } from "redux";

import "./Categories.css";

import { withNamespaces } from "react-i18next";

class Categories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // categoriesList: Catgory.categories,
      categoriesList: null,
      selectIndex: 0,
      selectDefault: "default"
    };
  }

  componentDidMount() {
    this.setState({
      categoriesList: this.props.categories
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.brewery !== prevProps.brewery) {
      this.setState({ selectIndex: 0 });

      //document.getElementById("categorySelect").value="default";
    }
    if (this.props.categories !== prevProps.categories) {
      this.setState({
        categoriesList: this.props.categories
      });
    }
  }
  onSelect = (index, e) => {
    this.setState({ selectIndex: index });
    //alert(this.state.categoriesList[index].label)

    if (this.props.brewery === null)
      this.props.onCategoryChange(this.state.categoriesList[index].products);
    else {
      //alert(JSON.stringify(this.props.brewery))
      let categoryProducts = this.state.categoriesList[index].products;
      let breweryProducts = this.props.brewery[0].products;
      let intersection = categoryProducts.filter(x =>
        breweryProducts.includes(x)
      );
      this.props.onCategoryChange(intersection);
    }
  };

  onCategoryChange = event => {
    if (event.target.value === "default") return;
    //this.props.onCategoryChange(this.state.categoriesList[event.target.value].products)
    if (this.props.brewery === null)
      this.props.onCategoryChange(
        this.state.categoriesList[event.target.value].products
      );
    else {
      //alert(JSON.stringify(this.props.brewery))
      let categoryProducts = this.state.categoriesList[event.target.value]
        .products;
      let breweryProducts = this.props.brewery[0].products;
      let intersection = categoryProducts.filter(x =>
        breweryProducts.includes(x)
      );
      this.props.onCategoryChange(intersection);
    }
  };

  render() {
    const { categoriesList } = this.state;
    const { t } = this.props;
    return (
      <div className="category-container">
        <p className="category-title category-title-mobile-display-none">
          <a
          //  href="#"
          >
            {t("categories.categories")}
          </a>
        </p>
        <div className="line mobile-list-group-none"></div>

        <ListGroup className="mobile-list-group-none">
          {categoriesList &&
            categoriesList.map((categoriesItems, i) => (
              <ListGroup.Item
                className={
                  i === this.state.selectIndex ? "list-item-select" : ""
                }
                key={i}
                onClick={this.onSelect.bind(this, i)}
              >
                {Content.category[categoriesItems.name]}
              </ListGroup.Item>
            ))}
        </ListGroup>

        <select
          className="select-category-mobile select-category-style"
          id="categorySelect"
          onChange={this.onCategoryChange}
        >
          <option key={1001} value="default">
            Categories
          </option>
          {categoriesList &&
            categoriesList.map((category, i) => (
              <option
                //  selected={this.state.selectIndex == i ? true : false}
                value={i}
                key={i}
              >
                {Content.category[category.name]}
              </option>
            ))}
        </select>
      </div>
    );
  }
}

// export default withNamespaces() (Categories);

const mapStateToProps = state => {
  return {
    state,
    categories: state.data.categories
  };
};

export default compose(
  connect(mapStateToProps),
  withNamespaces()
)(Categories);
