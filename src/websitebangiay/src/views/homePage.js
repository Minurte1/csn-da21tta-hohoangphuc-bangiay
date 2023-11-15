import React from "react";
import MyNavbar from "../components/NavbarhomePage";
import CarouselHomepage from "../components/CarousehomePagel";
import ListShoe from "../components/listShoe";
import ImfoHomepage from "../components/imfomationHomepage"
class HomePage extends React.Component {



    render() {
        return (
            <>

                <MyNavbar></MyNavbar>
                <CarouselHomepage />
                < ImfoHomepage></ImfoHomepage>
                < ListShoe></ListShoe>

            </>
        )
    }




}
export default HomePage;