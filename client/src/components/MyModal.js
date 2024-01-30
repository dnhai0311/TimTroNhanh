import React, { memo, useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import "../containers/public/Header/Search.scss";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import icons from "../ultils/icons";

const MyModal = ({
  setIsShowModal,
  content,
  data,
  handleSelect,
  setDistrict,
  setProvince,
  setCategory,
}) => {
  const { FaArrowLeft } = icons;
  const maxValue = content === "Giá" ? "15" : "90";
  const unit = content === "Giá" ? "triệu/tháng" : "m²";

  const [text, setText] = useState("");

  const [sliderRange, setSliderRange] = useState([0, maxValue]);

  const handleSliderChange = (range) => {
    setSliderRange(range);
  };

  const handleClose = () => {
    setIsShowModal(false);
    if (content === "Loại trọ" || content === "Vị tri") return;
    if (content === "Giá" || content === "Diện tích") {
      handleSelect(content, {
        min: sliderRange[0],
        max:
          sliderRange[0] === 0 && sliderRange[1] === maxValue
            ? "9999"
            : sliderRange[1],
        value: text,
      });
    }
  };

  const handleBack = () => {
    setIsShowModal(false);
    if (content === "Loại trọ") {
      setCategory({});
    }
    if (content !== "Vị trí") {
      setDistrict({});
      setProvince({});
      return;
    }
  };

  useEffect(() => {
    if (sliderRange[1] === "9999") {
      setText(`Trên ${sliderRange[0]} ${unit}`);
      return;
    }
    if (sliderRange[0] < sliderRange[1]) {
      if (sliderRange[0] === 0 && sliderRange[1] === maxValue)
        setText(`${sliderRange[0]} - ${sliderRange[1]}+ ${unit}`);
      else setText(`${sliderRange[0]} - ${sliderRange[1]} ${unit}`);
      return;
    }
    if (sliderRange[0] === sliderRange[1]) {
      setText(`Trên ${sliderRange[1]} ${""} ${unit}`);
      return;
    }
    setText(`${sliderRange[0]} - ${sliderRange[1]} ${unit}`);
  }, [sliderRange, unit, maxValue]);

  return (
    <>
      <Modal
        centered
        show={true}
        onHide={() => handleClose()}
        dialogClassName="my-modal"
      >
        <Modal.Header closeButton>
          <FaArrowLeft
            fontSize={"20px"}
            cursor={"pointer"}
            onClick={handleBack}
          />
          <Modal.Title className="w-100 text-center">{content}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body">
          {content !== "Giá" && content !== "Diện tích" && (
            <div>
              <div
                className="modal-item d-flex align-items-center w-100"
                onClick={() => {
                  handleSelect(content, { id: 0, value: "Toàn bộ" });
                  handleClose();
                }}
              >
                <input
                  type="radio"
                  name={content}
                  id="0"
                  value="Toàn bộ"
                  className="px-2 modal-input"
                />
                <label htmlFor="0" className="px-2">
                  Toàn bộ
                </label>
              </div>
              {data?.map((item) => {
                return (
                  <div
                    className="modal-item d-flex align-items-center w-100"
                    key={item.id}
                    onClick={() => {
                      handleSelect(content, item);
                      handleClose();
                    }}
                  >
                    <input
                      type="radio"
                      name={content}
                      id={item.id}
                      value={item.id}
                      className="px-2 modal-input"
                    />
                    <label htmlFor={item.id} className="px-2">
                      {item.value}
                    </label>
                  </div>
                );
              })}
            </div>
          )}
          {(content === "Giá" || content === "Diện tích") && (
            <>
              <div>
                <h3 className="pb-3 w-100 text-center fw-bold">{text}</h3>
                <Slider
                  range
                  value={sliderRange}
                  onChange={handleSliderChange}
                  min={0}
                  max={maxValue}
                  step={0.1}
                />
              </div>
              <div className="pt-3 d-flex flex-wrap">
                {data?.map((item) => {
                  return (
                    <div key={item.id}>
                      <div
                        className="px-3 py-1 bg-primary m-1 border rounded text-light btnFilter"
                        onClick={() => {
                          setSliderRange([item.min, item.max]);
                        }}
                      >
                        {item.value}
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => handleClose()} className="m-auto px-5">
            Xong
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default memo(MyModal);
