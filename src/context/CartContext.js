import React, { Component } from "react";

const CartContext = React.createContext();
export default CartContext;

export class CartProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cartItems: [],
      total: 0,
    };

    this.addToCart = this.addToCart.bind(this);
    this.increaseQuantity = this.increaseQuantity.bind(this);
    this.decreaseQuantity = this.decreaseQuantity.bind(this);
    this.removeFromCart = this.removeFromCart.bind(this);
    this.getTotal = this.getTotal.bind(this);
  }

  addToCart = (product) => {
    const { cartItems } = this.state;
    // find whether the product is there in the cartItems by 'array.some()'
    const isProductPresent = cartItems.some((item) => item.id === product.id);
    if (isProductPresent) {
      const updatedCartItems = cartItems.map((item) => {
        if (item.id === product.id) {
          alert(`${item.name} is already added!`);
        }
        return item;
      });
      this.setState({ cartItems: updatedCartItems });
    } else {
      this.setState({ cartItems: [...cartItems, { ...product, quantity: 1 }] });
    }
    this.getTotal();
  };

  removeFromCart = (product) => {
    if (
      window.confirm(`Are you sure to remove ${product.name} from your cart?`)
    ) {
      const { cartItems } = this.state;
      cartItems.map((item, index) => {
        if (item.id === product.id) {
          cartItems.splice(index, 1);
        }
      });
      this.setState({ cartItems: cartItems });
      this.getTotal();
    }
  };

  increaseQuantity(product) {
    // //C1
    // const newCartItems = this.state.cartItems.map((item) => {
    //   if (item.id === product.id) {
    //     return {
    //       ...item,
    //       quantity: ++item.quantity,
    //     };
    //   } else {
    //     return item;
    //   }
    // });
    // this.setState({ cartItems: newCartItems });

    //C2
    const { cartItems } = this.state;
    cartItems.map((item) => {
      if (item.id === product.id) {
        item.quantity += 1;
      }
    });
    this.setState({ cartItems: cartItems });
    this.getTotal();
  }

  decreaseQuantity = (product) => {
    const { cartItems } = this.state;
    cartItems.map((item) => {
      if (item.id === product.id) {
        item.quantity === 1 ? (item.quantity = 1) : (item.quantity -= 1);
      }
    });
    this.setState({ cartItems: cartItems });
    this.getTotal();
  };

  getTotal = () => {
    const { cartItems } = this.state;
    const newTotalPrice = cartItems.reduce((currentTotal, item) => {
      return currentTotal + item.quantity * item.price;
    }, 0);

    this.setState({ total: newTotalPrice });
  };

  render() {
    return (
      <CartContext.Provider
        value={{
          cartItems: this.state.cartItems,
          total: this.state.total,
          addToCart: this.addToCart,
          increaseQuantity: this.increaseQuantity,
          decreaseQuantity: this.decreaseQuantity,
          removeFromCart: this.removeFromCart,
          getTotal: this.getTotal,
        }}
      >
        {this.props.children}
      </CartContext.Provider>
    );
  }
}
