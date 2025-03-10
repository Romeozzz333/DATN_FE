import React, { useState } from 'react';
import { Form, Container, Row, Col, Button } from 'react-bootstrap';

const ModelCreateUnit = ({ productUnits, setProductUnits }) => {

    // Hàm thêm mới một product unit
    const handleAddUnit = () => {
        setProductUnits([...productUnits, {
            unitName: '',
            conversionFactor: '',
            type: false
        }]);
    };

    // Hàm xử lý thay đổi giá trị input
    const handleChange = (index, e) => {
        const { name, value } = e.target;
        const newUnits = [...productUnits];
        newUnits[index] = {
            ...newUnits[index],
            [name]: value
        };
        setProductUnits(newUnits);
    };

    // Hàm xử lý thay đổi checkbox
    const handleTypeChange = (index, checked) => {
        const newUnits = [...productUnits];
        newUnits[index] = {
            ...newUnits[index],
            type: checked
        };
        setProductUnits(newUnits);
    };

    // Hàm xóa unit (nếu cần)
    const handleRemoveUnit = (index) => {
        if (productUnits.length > 1) { // Đảm bảo ít nhất còn 1 unit
            const newUnits = productUnits.filter((_, i) => i !== index);
            setProductUnits(newUnits);
        }
    };

    return (
        <Container>
            <Button
                variant="success"
                onClick={handleAddUnit}
                className="mb-3"
            >
                Thêm các đơn vị quy đổi
            </Button>

            {productUnits.map((unit, index) => (
                <Row key={index} className="mb-3">
                    <Col>
                        <Form.Group>
                            <Form.Label>Tên đơn vị:</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Nhập tên đơn vị ..."
                                name="unitName"
                                value={unit.unitName}
                                onChange={(e) => handleChange(index, e)}
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Label>Giá trị quy đổi:</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Giá trị quy đổi ..."
                                name="conversionFactor"
                                value={unit.conversionFactor}
                                onChange={(e) => handleChange(index, e)}
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Label>Hiển thị:</Form.Label>
                        <div className='text-center'>
                            <div className="form-check form-switch">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    role="switch"
                                    id={`flexSwitchCheckChecked-${index}`}
                                    checked={unit.type}
                                    onChange={(e) => handleTypeChange(index, e.target.checked)}
                                />
                            </div>
                        </div>
                    </Col>
                    <Col xs="auto">
                        <Button
                            variant="danger"
                            onClick={() => handleRemoveUnit(index)}
                            disabled={productUnits.length === 1}
                            className="mt-4"
                        >
                            Xóa
                        </Button>
                    </Col>
                </Row>
            ))}
        </Container>
    );
};

export default ModelCreateUnit;