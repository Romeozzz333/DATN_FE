import React, { useState, useEffect } from 'react';
import './Content.scss';
import { Link } from 'react-router-dom';
import { Card, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllPriceRangePromotion } from '../../../../redux/action/productDetailAction';
import ListImageProduct from '../../../../image/ImageProduct';
import Slider from "react-slick";
import { Tooltip, OverlayTrigger } from 'react-bootstrap'

const Content = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;
    const dispatch = useDispatch();

    // Lấy sản phẩm từ Redux store
    const products = useSelector((state) => state.productDetail.listPriceRangePromotion);

    useEffect(() => {
        // Gửi hành động lấy tất cả sản phẩm khuyến mãi
        dispatch(fetchAllPriceRangePromotion());
    }, [dispatch]);

    // Lọc sản phẩm duy nhất theo idProduct
    const getUniqueProducts = (products) => {
        const uniqueProducts = [];
        const uniqueIds = new Set();
        for (const product of products) {
            if (!uniqueIds.has(product.idProduct)) {
                uniqueProducts.push(product);
                uniqueIds.add(product.idProduct);
            }
            if (uniqueProducts.length >= 20) break; // Điều chỉnh theo nhu cầu
        }
        return uniqueProducts;
    };
    const formatCurrency = (value) => {
        if (!value) return 0;
        const roundedValue = Math.round(value) || 0;
        return roundedValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    const filteredProducts = products ? getUniqueProducts(products) : [];

    // Logic phân trang
    const indexOfLastProduct = currentPage * itemsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    const handleNextPage = () => {
        if (currentPage < Math.ceil(filteredProducts.length / itemsPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        prevArrow: <button className="slick-arrow slick-prev">{'<'}</button>,
        nextArrow: <button className="slick-arrow slick-next">{'>'}</button>,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };


    return (
        <div className='FeaturedProduct'>
            {/* Phần sản phẩm nổi bật */}
            <div className="row m-2">
                <h2 className="text-start col m-3">Sản phẩm nổi bật</h2>
                <Link to="/allProducts" className="text-end col m-3">
                    <h4>Xem tất cả</h4>
                </Link>
            </div>



            <div className="slider-container">
                <Slider {...settings}>
                    {filteredProducts.map((product) => (
                        <div key={product.idProduct} className="product-slide">
                            <div className="card h-100">
                                <Link
                                    to={`/product-detail?idProduct=${product.idProduct}`}
                                    className="btn btn-light"
                                    aria-label="View details"
                                >
                                    <div className="image-container">
                                        <ListImageProduct id={product.idProduct} />
                                    </div>
                                </Link>
                                <div className="card-body text-center">
                                    <OverlayTrigger
                                        placement="top"
                                        overlay={<Tooltip>{product.nameProduct}</Tooltip>}
                                    >
                                        <p className="product-name truncate-text">{product.nameProduct}</p>
                                    </OverlayTrigger>
                                    <div className="product-pricing">
                                        {product.minPriceAfterDiscount === product.minPrice &&
                                            product.maxPriceAfterDiscount === product.maxPrice ? (
                                            <OverlayTrigger
                                                placement="top"
                                                overlay={
                                                    <Tooltip>
                                                        {formatCurrency(product.minPrice)} VND
                                                    </Tooltip>
                                                }
                                            >
                                                <p className="product-price truncate-text">
                                                    {formatCurrency(product.minPrice)} VND
                                                </p>
                                            </OverlayTrigger>
                                        ) : (
                                            <>
                                                <OverlayTrigger
                                                    placement="top"
                                                    overlay={
                                                        <Tooltip>
                                                            Giá trị hiện tại là :{formatCurrency(product.minPriceAfterDiscount)} VND - {formatCurrency(product.maxPriceAfterDiscount)} VND
                                                        </Tooltip>
                                                    }
                                                >
                                                    <p className="product-sale-price text-danger truncate-text">
                                                        {formatCurrency(product.minPriceAfterDiscount)} VND - {formatCurrency(product.maxPriceAfterDiscount)} VND
                                                    </p>
                                                </OverlayTrigger>
                                                <OverlayTrigger
                                                    placement="top"
                                                    overlay={
                                                        <Tooltip>
                                                            Giá trị hiện tại là :{formatCurrency(product.minPrice)} VND - {formatCurrency(product.maxPrice)} VND
                                                        </Tooltip>
                                                    }
                                                >
                                                    <p className="product-original-price text-decoration-line-through truncate-text">
                                                        {formatCurrency(product.minPrice)} VND - {formatCurrency(product.maxPrice)} VND
                                                    </p>
                                                </OverlayTrigger>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>


            {/* Phần bộ sưu tập */}
            <Row className="justify-content-center m-4">
                <Col md={6} lg={6} className="mb-4">
                    <Card className="text-white text-center border-0 shadow-sm hover-card">
                        <Card.Img src='./imageAbout1.png' alt="Bộ sưu tập Minimal" className="img-fluid rounded" />
                        <Card.ImgOverlay className="d-flex flex-column justify-content-center align-items-center text-overlay">
                            <Card.Title className="display-5 fw-bold  text-shadow mb-3 overlay-content">
                                SẢN PHẨM SẠCH
                            </Card.Title>
                            <Link href="allProducts" className="btn btn-light rounded-pill px-4 py-2 fw-semibold shadow overlay-content">
                                Mua ngay
                            </Link>
                        </Card.ImgOverlay>
                    </Card>
                </Col>
                <Col md={6} lg={6} className="mb-4">
                    <Card className="text-white text-center border-0 shadow-sm hover-card">
                        <Card.Img src='./imageAbout2.png' alt="Bộ sưu tập Sneakers" className="img-fluid rounded" />
                        <Card.ImgOverlay className="d-flex flex-column justify-content-center align-items-center text-overlay">
                            <Card.Title className="display-5 fw-bold  text-shadow mb-3 overlay-content">
                                NÔNG SẢN SẠCH
                            </Card.Title>
                            <Link href="allProducts" className="btn btn-light rounded-pill px-4 py-2 fw-semibold shadow overlay-content">
                                Mua ngay
                            </Link>
                        </Card.ImgOverlay>
                    </Card>
                </Col>
            </Row>


            <div className="row m-2">
                <h2 className="text-start col m-3">Sản phẩm mới</h2>
                <Link to="/allProducts" className="text-end col m-3">
                    <h4>Xem tất cả</h4>
                </Link>
            </div>
            <div className="slider-container">
                <Slider {...settings}>
                    {filteredProducts.map((product) => (
                        <div key={product.idProduct} className="product-slide">
                            <div className="card h-100">
                                <Link
                                    to={`/product-detail?idProduct=${product.idProduct}`}
                                    className="btn btn-light"
                                    aria-label="View details"
                                >
                                    <div className="image-container">
                                        <ListImageProduct id={product.idProduct} />
                                    </div>
                                </Link>
                                <div className="card-body text-center ">
                                    <OverlayTrigger
                                        placement="top"
                                        overlay={<Tooltip>{product.nameProduct}</Tooltip>}
                                    >
                                        <p className="product-name truncate-text">{product.nameProduct}</p>
                                    </OverlayTrigger>
                                    <div className="product-pricing">
                                        {product.minPriceAfterDiscount === product.minPrice &&
                                            product.maxPriceAfterDiscount === product.maxPrice ? (
                                            <OverlayTrigger
                                                placement="top"
                                                overlay={
                                                    <Tooltip>
                                                        {formatCurrency(product.minPrice)} VND
                                                    </Tooltip>
                                                }
                                            >
                                                <p className="product-price truncate-text">
                                                    {formatCurrency(product.minPrice)} VND
                                                </p>
                                            </OverlayTrigger>
                                        ) : (
                                            <>
                                                <OverlayTrigger
                                                    placement="top"
                                                    overlay={
                                                        <Tooltip>
                                                            Giá trị hiện tại là :{formatCurrency(product.minPriceAfterDiscount)} VND - {formatCurrency(product.maxPriceAfterDiscount)} VND
                                                        </Tooltip>
                                                    }
                                                >
                                                    <p className="product-sale-price text-danger truncate-text">
                                                        {formatCurrency(product.minPriceAfterDiscount)} VND - {formatCurrency(product.maxPriceAfterDiscount)} VND
                                                    </p>
                                                </OverlayTrigger>
                                                <OverlayTrigger
                                                    placement="top"
                                                    overlay={
                                                        <Tooltip>
                                                            Giá trị hiện tại là :{formatCurrency(product.minPrice)} VND - {formatCurrency(product.maxPrice)} VND
                                                        </Tooltip>
                                                    }
                                                >
                                                    <p className="product-original-price text-decoration-line-through truncate-text">
                                                        {formatCurrency(product.minPrice)} VND - {formatCurrency(product.maxPrice)} VND
                                                    </p>
                                                </OverlayTrigger>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>

        </div>
    );
}

export default Content;
