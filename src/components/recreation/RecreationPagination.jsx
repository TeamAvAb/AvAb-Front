import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Pagination from "react-js-pagination";
import prevButton from "../../assets/myflow/moveLeft.png";
import nextButton from "../../assets/myflow/moveRight.png";

export default function PaginatedItems() {
  const [page, setPage] = useState(1);
  const handlePageChange = (page) => {
    setPage(page);
  };
  return (
    <>
      <PaginationBox>
        <Pagination
          firstPageText={""}
          lastPageText={""}
          prevPageText={
            <img
              src={prevButton}
              alt="prev"
              style={{
                filter: "drop-shadow(0px 5px 10px rgba(27, 29, 31, 0.15))",
                marginRight: "7px",
              }}
            />
          }
          nextPageText={
            <img
              src={nextButton}
              alt="next"
              style={{
                filter: "drop-shadow(0px 5px 10px rgba(27, 29, 31, 0.15))",
                marginLeft: "7px",
              }}
            />
          }
          activePage={1}
          itemsCountPerPage={5}
          totalItemsCount={300}
          pageRangeDisplayed={8}
          onChange={handlePageChange}
        ></Pagination>
      </PaginationBox>
    </>
  );
}
const PaginationBox = styled.div`
  .pagination {
    display: flex;
    justify-content: center;
  }
  ul {
    list-style: none;
    padding: 0;
  }
  ul.pagination li {
    display: inline-block;
    width: 42px;
    width: 42px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    font-weight: 700;
    margin: 0px 3px;
  }

  ul.pagination li a {
    width: 42px;
    width: 42px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    color: #1b1d1f;
    font-size: 20px;
    font-weight: 700;
  }
  ul.pagination li.active a {
    color: white;
  }
  ul.pagination li.active {
    background-color: #8896df;
    border-radius: 50px;
    width: 42px;
    height: 42px;
  }
`;
const nextPrevButton = styled.img`
  filter: drop-shadow(0px 5px 10px rgba(27, 29, 31, 0.15));
`;
