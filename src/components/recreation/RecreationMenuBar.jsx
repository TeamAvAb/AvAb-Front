import styled from "styled-components";
import React, { useState, useEffect } from "react";

export default function RecreationMenuBar({ scrollRefs }) {
  const [activeIndex, setActiveIndex] = useState(null);

  const MenuBar = [
    { idx: 0, name: "상세정보" },
    { idx: 1, name: "리뷰 및 평가" },
    { idx: 2, name: "연관 레크레이션" },
    { idx: 3, name: "연관 플로우" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      let activeSectionIndex = -1;

      scrollRefs.current.forEach((ref, index) => {
        if (
          ref.current &&
          ref.current.offsetTop - 570 <= scrollPosition &&
          ref.current.offsetTop + ref.current.offsetHeight - 570 >
            scrollPosition
        ) {
          activeSectionIndex = index;
        }
      });

      setActiveIndex(activeSectionIndex);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollRefs]);

  const handleButtonClick = (index) => {
    const offset = -570;
    const targetPosition = scrollRefs.current[index].current.offsetTop + offset;

    window.scrollTo({
      top: targetPosition,
      behavior: "smooth",
    });
  };

  return (
    <RecreationMenuBarContainer>
      {MenuBar.map(({ idx, name }, index) => (
        <NavBtn
          key={idx}
          onClick={() => handleButtonClick(index)}
          className={activeIndex === index ? "active" : ""}
        >
          {name}
        </NavBtn>
      ))}
    </RecreationMenuBarContainer>
  );
}

const RecreationMenuBarContainer = styled.div`
  display: flex;
  align-items: center;
`;
const NavBtn = styled.button`
  border-bottom: 0.5px solid #cacdd2;
  color: #1b1d1f;
  font-size: 24px;
  font-weight: 400;
  display: flex;
  align-items: center;
  padding: 19px 0px 19px 88px;
  border: none;
  background-color: white;
  &.active {
    font-weight: bold;
  }
`;
