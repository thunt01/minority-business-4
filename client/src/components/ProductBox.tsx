import React from 'react';
import "./ProductRow.css"

const ProductBox = (props) => {

  return (
    <div className="col-md-3 text-center">
        <a href={`/product/${props.props.ProductID}`} className="box">
            <img src={props.props.ImageName ? "https://culture-cart-s3-images.s3.amazonaws.com/" + props.props.ImageName : "https://culture-cart-s3-images.s3.amazonaws.com/blankimage.jpeg"} alt={"No Image"} height="150" />
            <h6 className='mb-0'>{props.props.Name}</h6>
            <p>{"$" + props.props.Price}</p>
        </a>
    </div>
  );
}

export default ProductBox;