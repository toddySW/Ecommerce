import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Table, Button } from "reactstrap";
import CartContext from "../context/CartContext";

export class Cart extends Component {
  render() {
    return (
      <CartContext.Consumer>
        {({
          cartItems,
          total,
          increaseQuantity,
          decreaseQuantity,
          removeFromCart,
        }) => {
          return (
            <Container>
              <h2>Total: ${total}</h2>
              <Table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Image</th>
                    <th>Quantity</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item, index) => {
                    return (
                      <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>{item.name}</td>
                        <td>
                          <img src={item.image} alt="..."></img>
                        </td>
                        <td>
                          <Button
                            color="primary"
                            onClick={() => {
                              increaseQuantity(item);
                            }}
                          >
                            +
                          </Button>
                          {item.quantity}
                          <Button
                            color="primary"
                            onClick={() => {
                              decreaseQuantity(item);
                            }}
                          >
                            -
                          </Button>
                        </td>
                        <td>${item.price * item.quantity}</td>
                        <td>
                          <Button
                            color="danger"
                            outline
                            onClick={() => removeFromCart(item, index)}
                          >
                            Remove
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </Container>
          );
        }}
      </CartContext.Consumer>
    );
  }
}
