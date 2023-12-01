import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { CardBody, CardTitle, Card, CardSubtitle, CardText } from "reactstrap";

import { Link } from "react-router-dom";


class Item extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: null,
            loading: true,
            error: null,
        };
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData = async () => {
        try {
            const response = await fetch("http://localhost:3003/product", {
                method: "GET",
                mode: "cors",
            });
            if (!response.ok) {
                throw new Error("Yêu cầu không thành công");
            }

            const jsonResponse = await response.json();

            this.setState({
                data: jsonResponse.data,
                loading: false,
            });

            console.log(jsonResponse);
        } catch (error) {
            console.error(error.message);
            this.setState({
                error: error.message,
                loading: false,
            });
        }
    };

    render() {
        const { data, loading, error } = this.state;
        return (
            <>
                <div className="container">
                    {loading && <p>Loading...</p>}
                    {error && <p>Error: {error}</p>}
                    {!loading && !error && (
                        <div className="container-product">
                            {data ? (
                                data.map((item) => (
                                    <Card
                                        style={{
                                            width: "18rem",
                                        }}
                                        key={item.MASP}
                                    >
                                        <img
                                            alt={item.TENSANPHAM}
                                            src={`http://localhost:3003/public/images/${item.scription}`}
                                        />
                                        <CardBody>
                                            <CardSubtitle className="mb-2 text-muted" tag="h6">
                                                Tên hãng : {item.TENHANG}
                                            </CardSubtitle>
                                            <CardTitle tag="h5">{item.TENSANPHAM}</CardTitle>

                                            <CardText>Giá: {item.GIA} Đ</CardText>
                                            <div className="star-container">

                                            </div>
                                            <Link
                                                to={`/thongtinchitietsp/${item.MASP}`}
                                                className="btn btn-primary"
                                            >
                                                Buy
                                            </Link>
                                        </CardBody>
                                    </Card>
                                ))
                            ) : (
                                <div>No data available</div>
                            )}
                        </div>
                    )}
                </div>
            </>
        );
    }
}

export default Item;