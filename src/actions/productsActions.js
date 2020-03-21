import firebase from "../firebase";

export function getProducts() {
  return dispatch => {
    const database = firebase.firestore();
    const productsRef = database.collection("products");
    productsRef.get().then(snapshot => {
      const datas = snapshot.docs.map(doc => doc.data());
      dispatch({ type: "GET_PRODUCTS_SUCCESS", payload: datas });
    });
  };
}

export function getCategories() {
  return dispatch => {
    const database = firebase.firestore();
    const productsRef = database.collection("categories");
    productsRef.get().then(snapshot => {
      const datas = snapshot.docs.map(doc => doc.data());
      dispatch({ type: "GET_CATEGORIES_SUCCESS", payload: datas });
    });
  };
}

export function getBreweries() {
  return dispatch => {
    // firebase
    //   .auth()
    //   .signInWithEmailAndPassword({ email, password })
    //   .then(resp => {
    const database = firebase.firestore();
    const productsRef = database.collection("breweries");
    productsRef.get().then(snapshot => {
      const datas = snapshot.docs.map(doc => doc.data());
      dispatch({ type: "GET_BREWERIES_SUCCESS", payload: datas });
    });
    // });
  };
}

// export function setProducts(data) {
//   return dispatch => {
//     const database = firebase.firestore();
//     data.default.categories.map((item, index) => {
//       database
//         .collection("categories")
//         .doc()
//         .set(item);
//     });
//   };
// }
