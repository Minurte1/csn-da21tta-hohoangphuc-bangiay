import React from 'react';
import { ShoeListSeal } from '../components/childComponent/childListSeal';

const shoesData = [
    { id: 1, name: 'Puma', seal: '30', image: require('../assets/images-shoes/listShoe1.jpg'), href: '/cart', price: 99.99 },
    { id: 2, name: 'MLB', seal: '10', image: require('../assets/images-shoes/listShoe2.jpg'), href: '/cart', price: 50.99 },
    { id: 3, name: 'MLB Bê', seal: '60', image: require('../assets/images-shoes/listShoe3.jpg'), href: '/cart', price: 59.99 },
    { id: 4, name: 'SkyDi', seal: '40', image: require('../assets/images-shoes/listShoe4.jpg'), href: '/cart', price: 29.99 },
    { id: 5, name: 'NERDY', seal: '80', image: require('../assets/images-shoes/listShoe5.jpg'), href: '/cart', price: 30.99 },
    { id: 6, name: 'Nardi', seal: '30', image: require('../assets/images-shoes/listShoe6.jpg'), href: '/cart', price: 59.99 },
    { id: 7, name: 'Lacoste Hydez ', seal: '30', image: require('../assets/images-shoes/listShoe7.jpg'), href: '/cart', price: 59.99 },
    { id: 8, name: 'Nike Air ', seal: '10', image: require('../assets/images-shoes/listShoe8.jpg'), href: '/cart', price: 59.99 },
    { id: 9, name: 'Nike Air ', seal: '5', image: require('../assets/images-shoes/listShoe8.jpg'), href: '/cart', price: 59.99 },
    { id: 10, name: 'Nike Air ', seal: '30', image: require('../assets/images-shoes/listShoe8.jpg'), href: '/cart', price: 59.99 },


    // Add more shoes as needed
];

function ListShoeSeal() {
    return (
        <div className="App">
            <ShoeListSeal shoes={shoesData} />
        </div>
    );
}

export default ListShoeSeal;
