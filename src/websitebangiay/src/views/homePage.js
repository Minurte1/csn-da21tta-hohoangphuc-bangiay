import React from "react";
import MyNavbar from "../components/NavbarhomePage";
import CarouselHomepage from "../components/CarousehomePagel";
import ListShoe from "../components/listShoe";
class HomePage extends React.Component {



    render() {
        return (
            <>

                <MyNavbar></MyNavbar>
                <CarouselHomepage />
                < ListShoe></ListShoe>
            </>
        )
    }




}
export default HomePage;