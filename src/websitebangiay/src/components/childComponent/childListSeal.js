import React from 'react';
import PropTypes from 'prop-types';
import '../childComponent/listShoeSeal.css';
// ... (imports and propTypes)

function ShoeListSeal({ shoes }) {
    return (
        <div className="shoe-list">
            <hr></hr>
            <h2 className='list-shoe_h2'>Sản Phẩm Giày Đang Giảm Giá Trong Tuần Này</h2>
            <ul>
                {shoes.map((shoe) => (
                    <li key={shoe.id}>
                        <a href={shoe.href} className='thea'>

                            <div> <div className="discount-banner">Giảm giá {shoe.seal}%</div> <img src={shoe.image} alt={shoe.name} /> </div>
                            <h3>{shoe.name}</h3>
                            <p> <span className='shoe-list_seal'>${shoe.price}</span> ${((shoe.price * ((100 - shoe.seal) / 100))).toFixed(2)}</p>

                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}

// ... (propTypes and export)



ShoeListSeal.propTypes = {
    shoes: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            seal: PropTypes.number.isRequired,
            image: PropTypes.string.isRequired,

            price: PropTypes.number.isRequired,
        })
    ).isRequired,
};

export default ShoeListSeal;
