import React from 'react';
import "./ProductRow.css"
//import 'bootstrap/dist/css/bootstrap.css';

// we working here
const ProductRow = (props) => {
  return (
    <a href={`/product/${props.props.ProductID}`} className="box">
        <div className="row product">
        <div className="col-md-2 product-image">
            <img src={props.props.ImageName ? "https://culture-cart-s3-images.s3.amazonaws.com/" + props.props.ImageName : "https://culture-cart-s3-images.s3.amazonaws.com/blankimage.jpeg"} alt={"No Image"} height="150" />
        </div>
        <div className="col-md-8 product-detail">
            <h4>{props.props.Name}</h4>
            <p>{props.props.Description}</p>
        </div>
        <div className="col-md-2 product-price">
            {"$" + props.props.Price}
        </div>
        </div>
    </a>
  );
}

export default ProductRow;