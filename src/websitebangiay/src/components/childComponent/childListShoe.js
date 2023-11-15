import React from 'react';
import PropTypes from 'prop-types';
import '../childComponent/listShoe.css';
function ShoeList({ shoes }) {
    return (
        <div className="shoe-list">
            <hr></hr>
            <h2 className='list-shoe_h2'>Sản Phẩm Giày Mới</h2>
            <ul>
                {shoes.map((shoe) => (
                    <li key={shoe.id}>
                        <a href={shoe.href} className='thea'>
                            <img src={shoe.image} alt={shoe.name} />
                            <h3>{shoe.name}</h3>
                            <p>Price: ${shoe.price}</p>
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}

ShoeList.propTypes = {
    shoes: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            image: PropTypes.string.isRequired,
            price: PropTypes.number.isRequired,
        })
    ).isRequired,
};

export default ShoeList;
