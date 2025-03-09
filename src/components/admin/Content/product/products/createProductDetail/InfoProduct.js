import React, { useEffect } from "react";
import { Form, Container, Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllCategory } from "../../../../../../redux/action/categoryAction";
const InfoProduct = ({ product }) => {
  const dispatch = useDispatch();


  const categorys = useSelector((state) => state.category.listCategory);


  useEffect(() => {
    dispatch(fetchAllCategory());
  }, [dispatch]);

  return (
    <Container fluid>
      <Form.Group className="m-3">
        <Form.Label>Tên sản phẩm:</Form.Label>
        <Form.Control
          type="text"
          placeholder="Nhập tên sản phẩm"
          name="name"
          value={product.name}
          disabled
        />
      </Form.Group>

      <Row>
        <Col className="m-3">
          <Form.Group className="mt-3">
            <Form.Label>Danh mục</Form.Label>
            <Form.Select name="idCategory" value={product.idCategory} disabled>
              <option value="">Chọn danh mục</option>
              {categorys?.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>

      <input
        type="file"
        id="uploadFileInput"
        style={{ display: "none" }}
        disabled
      />
      <Row
        className="preview-image justify-content-center text-center p-3"
        style={{
          cursor: "pointer",
          borderStyle: "dashed",
          borderWidth: "2px",
          borderColor: "LightGray",
          minHeight: "100px",
        }}
      >
        <Col>
          {product?.imageByte ? (
            <img
              src={`data:image/jpeg;base64,${product.imageByte}`}
              alt="Product"
              style={{ maxWidth: "20%" }}
              onError={(e) => {
                e.target.src = "https://placehold.co/150x150"; // Đổi nguồn ảnh khi lỗi
              }}
            />
          ) : (
            <img
              src="https://placehold.co/150x150"
              alt="Placeholder"
              style={{ maxWidth: "150px", maxHeight: "150px" }}
            />
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default InfoProduct;
