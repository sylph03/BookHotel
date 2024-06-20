import React from "react";
import { Link } from 'react-router-dom';
import './MyProducts.css';

const MyProducts = (props) => {
    return (
        <div className="product-item">
            <div className="product-item-image">
                <div className="image-box"></div>
                <div className="ratio-3-2">
                    <a href={`/rooms/${props.room.room_id}`} title={props.room.room_name}>
                        <img src={props.room.image_url} alt={props.room.room_name} />
                    </a>
                </div>
            </div>
            <div className="product-item-content">
                <h4>
                    <a href={`/rooms/${props.room.room_id}`}>{props.room.room_name}</a>
                </h4>
                <p>{props.room.description}</p>
                <div className="product-btn">
                    <div className="product-btn-price">
                        <span>Giá: {props.room.price}</span>
                    </div>
                    <a className="product-btn-link" href={`/rooms/${props.room.room_id}`}>
                        Xem phòng&nbsp;
                        <i className="fa-solid fa-chevron-right"></i>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default MyProducts