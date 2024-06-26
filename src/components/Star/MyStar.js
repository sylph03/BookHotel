import React from 'react';
import Rating from 'react-rating';

const MyStar = ({ rating, size, readonly, emptySymbol, fullSymbol, colorEmptySymbol, colorFullSymbol, onChange }) => {
    return (
        <div>
            <Rating
                initialRating={rating}
                emptySymbol={<i className={emptySymbol || "fa-solid fa-star"} style={{ fontSize: size || '14px', color: colorEmptySymbol || '#d4d4d4' }}></i>}
                fullSymbol={<i className={fullSymbol || "fa-solid fa-star"} style={{ fontSize: size || '14px', color: colorFullSymbol || '#d39e00' }}></i>}
                readonly = {readonly}
                onChange={onChange}
            />
        </div>
    );
};

export default MyStar;
