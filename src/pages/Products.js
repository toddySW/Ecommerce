import { Component } from "react/cjs/react.production.min";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Container,
  Row,
  Col,
  Card,
  CardGroup,
  CardImg,
  CardBody,
  CardText,
  CardSubtitle,
  CardTitle,
  Button,
} from "reactstrap";
import axios from "axios";

import CartContext from "../context/CartContext";

export class Products extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
    };
  }

  componentDidMount() {
    axios.get("https://jjcm5.sse.codesandbox.io/products").then((res) => {
      this.setState({
        products: res.data,
      });
    });
  }

  render(h) {
    const { products } = this.state;
    return (
      <Container>
        <h1>Products</h1>
        <Row>
          {products.map((item) => {
            return (
              <Col sm="4">
                <CardGroup>
                  <Card>
                    <CardImg
                      alt="Card image cap"
                      src={item.image}
                      top
                      width="100%"
                    />
                    <CardBody>
                      <CardTitle tag="h5">{item.name}</CardTitle>
                      <CardSubtitle className="mb-2 text-muted" tag="h6">
                        {this.name}
                      </CardSubtitle>
                      <CardText>{this.descripion}</CardText>

                      <CartContext.Consumer>
                        {({addToCart}) => {
                          return (
                            <Button onClick={() => addToCart(item)}>Add to cart</Button>
                          );
                        }}
                      </CartContext.Consumer>
                    </CardBody>
                  </Card>
                </CardGroup>
              </Col>
            );
          })}
        </Row>
      </Container>
    );
  }
}
