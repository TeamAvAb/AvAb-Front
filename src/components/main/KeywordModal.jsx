import React, { useState } from "react";
import styled from "styled-components";
import rechoiceIcon from "../../assets/main/rechoiceIcon.svg";
export default function KeywordModal({
  content,
  modalControl,
  keywordControl,
  selectedOption,
}) {
  const [result, setResult] = useState(selectedOption);
  const handleSingleSelect = (id) => {
    const isSelected = selectedOption.includes(id);
    if (isSelected) {
      // 단일 선택 해제 시 체크된 아이템을 제외한 배열 (필터)
      setResult(result.filter((el) => el !== id));
    } else {
      // 단일 선택 시 체크된 아이템을 배열에 추가
      setResult((prev) => [...prev, id]);
    }
  };
  const handleReset = () => {
    setResult("");
  };

  const handleSubmit = () => {
    console.log(selectedOption);
    keywordControl(result);
    modalControl(false);
  };
  return (
    <Container>
      <Modal>
        <Keywords>
          {content.map((el) => (
            <Keyword
              key={el.id}
              onClick={() => handleSingleSelect(el.id)}
              selected={result.includes(el.id)}
            >
              {el.title}
            </Keyword>
          ))}
        </Keywords>
        <SetModal>
          <ModalBtn type="close" onClick={() => modalControl(false)}>
            닫기
          </ModalBtn>
          <div style={{ display: "flex", flexDirection: "row", gap: "49px" }}>
            <Reset onClick={handleReset}>
              <img
                src={rechoiceIcon}
                style={{ width: "42px", height: "42px" }}
              />
              초기화
            </Reset>
            <ModalBtn type="done" onClick={handleSubmit}>
              선택 완료
            </ModalBtn>
          </div>
        </SetModal>
      </Modal>
    </Container>
  );
}
const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  background: var(--shadow, rgba(70, 76, 82, 0.5));
  z-index: 10;
`;
const Modal = styled.div`
  position: absolute;
  top: 296px;
  width: 760px;
  border-radius: 20px;
  background: var(--main-ffffff, #fff);
`;
const Keywords = styled.div`
  /* height: 250px; */
  display: flex;
  flex-direction: row;

  padding: 43px 39px 42px;
  gap: 40px 20px;
  flex-wrap: wrap;
  box-shadow: 0px -2px 8px 0px rgba(0, 0, 0, 0.2) inset;
`;
const Keyword = styled.div`
  height: 29px;
  display: flex;
  padding: 5px 29px;
  justify-content: center;
  align-items: center;

  border-radius: 5px;
  background: ${(props) =>
    props.selected
      ? "var(--main-a-0-ddff, #a0ddff)"
      : "var(--gray-scale-e-9-ebed, #E9EBED)"};
`;
const SetModal = styled.div`
  padding: 16px 32px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-top: 0.5px solid var(--gray-scale-464-c-52, #464c52);
`;
const ModalBtn = styled.button`
  height: 54px;
  display: flex;
  padding: 15px 34px;
  justify-content: center;
  align-items: center;
  border-radius: 50px;
  border: ${(props) =>
    props.type === "close"
      ? "1px solid var(--gray-scale-1-b-1-d-1-f, #1b1d1f)"
      : "none"};
  background: ${(props) =>
    props.type === "close" ? "#FFF" : "var(--main-4036-ed, #4036ED)"};
  color: ${(props) =>
    props.type === "close"
      ? "var(--gray-scale-1-b-1-d-1-f, #1b1d1f);"
      : "#FFF"};
  text-align: right;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
`;
const Reset = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  border: none;
  background: var(--main-ffffff, #fff);
  color: #000;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
`;
