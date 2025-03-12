import React, { useState, useEffect } from 'react';
import './Content.scss';
import { Link } from 'react-router-dom';
import { Card, Row, Col } from 'react-bootstrap';
import { getAllPriceRangePromotion } from '../../../../Service/ApiProductService';
import ListImageProduct from '../../../../image/ListImageProduct';
import Slider from "react-slick";
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import { toast } from 'react-toastify';

const Content = () => {
    const [products, setProducts] = useState([]);

    const fetchAllPriceRangePromotion = async () => {
        try {
            const response = await getAllPriceRangePromotion();
            if (response && response.status === 200) {
                setProducts(response.data);
            } else {
                toast.error('Lỗi khi tải danh sách sản phẩm');
            }
        } catch (error) {
            toast.error(error.message || 'Lỗi khi tải danh sách sản phẩm');
        }
    };

    useEffect(() => {
        fetchAllPriceRangePromotion();
    }, []);
    const formatCurrency = (value) => {
        if (!value) return '0';
        const roundedValue = Math.round(value) || 0;
        return roundedValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        prevArrow: <button className="slick-arrow slick-prev">{'.'}</button>,
        nextArrow: <button className="slick-arrow slick-next">{'.'}</button>,
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

    // Component hiển thị giá sản phẩm (dùng chung cho cả 2 slider)
    const renderProductPricing = (product) => (
        <div className="product-pricing">
            {product.priceBase === product.priceSale ? (
                <OverlayTrigger
                    placement="top"
                    overlay={
                        <Tooltip>
                            {formatCurrency(product.priceBase)} VND
                        </Tooltip>
                    }
                >
                    <p className="product-price truncate-text">
                        {formatCurrency(product.priceBase)} VND
                    </p>
                </OverlayTrigger>
            ) : (
                <OverlayTrigger
                    placement="top"
                    overlay={
                        <Tooltip>
                            Giá gốc: {formatCurrency(product.priceBase)} VND - Giá khuyến mãi: {formatCurrency(product.priceSale)} VND
                        </Tooltip>
                    }
                >
                    <div>
                        <p className="product-sale-price text-danger truncate-text">
                            {formatCurrency(product.priceSale)} VND
                        </p>
                        <p className="product-original-price text-decoration-line-through truncate-text">
                            {formatCurrency(product.priceBase)} VND
                        </p>
                    </div>
                </OverlayTrigger>
            )}
        </div>
    );

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
                    {products.map((product) => (
                        <div key={product.idProduct} className="product-slide">
                            <div className="card h-100">
                                <Link
                                    to={`/product-detail?idProduct=${product.idProduct}`}
                                    className="btn btn-light"
                                    aria-label="View details"
                                >
                                    <div className="image-container">
                                        <ListImageProduct
                                            id={product?.idProduct}
                                        />
                                    </div>
                                </Link>
                                <div className="card-body text-center">
                                    <OverlayTrigger
                                        placement="top"
                                        overlay={<Tooltip>{product.nameProduct}</Tooltip>}
                                    >
                                        <p className="product-name truncate-text">{product.nameProduct}</p>
                                    </OverlayTrigger>
                                    {renderProductPricing(product)}
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
                        <Card.Img src='./imageAbout1.png' alt="Bộ sưu tập Sản phẩm sạch" className="img-fluid rounded" />
                        <Card.ImgOverlay className="d-flex flex-column justify-content-center align-items-center text-overlay">
                            <Card.Title className="display-5 fw-bold text-shadow mb-3 overlay-content">
                                SẢN PHẨM SẠCH
                            </Card.Title>
                            <Link to="/allProducts" className="btn btn-light rounded-pill px-4 py-2 fw-semibold shadow overlay-content">
                                Mua ngay
                            </Link>
                        </Card.ImgOverlay>
                    </Card>
                </Col>
                <Col md={6} lg={6} className="mb-4">
                    <Card className="text-white text-center border-0 shadow-sm hover-card">
                        <Card.Img src='./imageAbout2.png' alt="Bộ sưu tập Nông sản sạch" className="img-fluid rounded" />
                        <Card.ImgOverlay className="d-flex flex-column justify-content-center align-items-center text-overlay">
                            <Card.Title className="display-5 fw-bold text-shadow mb-3 overlay-content">
                                NÔNG SẢN SẠCH
                            </Card.Title>
                            <Link to="/allProducts" className="btn btn-light rounded-pill px-4 py-2 fw-semibold shadow overlay-content">
                                Mua ngay
                            </Link>
                        </Card.ImgOverlay>
                    </Card>
                </Col>
            </Row>

            {/* Phần sản phẩm mới */}
            <div className="row m-2">
                <h2 className="text-start col m-3">Sản phẩm mới</h2>
                <Link to="/allProducts" className="text-end col m-3">
                    <h4>Xem tất cả</h4>
                </Link>
            </div>
            <div className="slider-container">
                <Slider {...settings}>
                    {products.map((product) => (
                        <div key={product.idProduct} className="product-slide">
                            <div className="card h-100">
                                <Link
                                    to={`/product-detail?idProduct=${product.idProduct}`}
                                    className="btn btn-light"
                                    aria-label="View details"
                                >
                                    <div className="image-container">
                                        <ListImageProduct
                                            id={product?.idProduct}
                                        />
                                    </div>
                                </Link>
                                <div className="card-body text-center">
                                    <OverlayTrigger
                                        placement="top"
                                        overlay={<Tooltip>{product.nameProduct}</Tooltip>}
                                    >
                                        <p className="product-name truncate-text">{product.nameProduct}</p>
                                    </OverlayTrigger>
                                    {renderProductPricing(product)}
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
};

export default Content;