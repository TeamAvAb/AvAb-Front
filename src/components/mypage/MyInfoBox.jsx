import React, {useState} from "react";
import axios from 'axios'
import styled from "styled-components";

import WarnLogo from "../../assets/mypage/WarnLogo.svg"

const JWT_TOKEN =
"eyJhbGciOiJIUzI1NiJ9.eyJpZCI6MiwiaWF0IjoxNzA3Mjk1MzkzLCJleHAiOjE5MDcyOTg5OTN9.yEvU_V98IMhnC09lEL_BdxU7aQTx69BclrAd9zjZL64";

export default function MyInfoBox({datas}) {
    const [nickname, setNickname] = useState("");

    const handleNickname = (event) => {
        setNickname(event.target.value);
    };

    const ChangeName = async () => {
        const response = await axios.patch(
          `https://dev.avab.shop/api/users/me/name`,
          {name: nickname},
          {
            headers: {
              Accept: "*/*",
              Authorization: `Bearer ${JWT_TOKEN}`,
            },
          }
        );
    
        if (response.status === 200) {
          // 요청이 성공하면 상태 업데이트
          console.log(response.data);
        } else {
          // 요청이 실패하면 에러 처리
          console.log(response.data);
        }
    };

    console.log(datas);

    return (
    <MyInfo>
        <MyTitle>카카오 계정</MyTitle>
        <MyInput value={datas.email} readOnly/>
        <MyTitle2>닉네임</MyTitle2>
        <MyInput placeholder={datas.name} maxLength={10} onChange={handleNickname}/>
        <WarnSpace>
            <WarnImg src={WarnLogo}/>
            <Warn>닉네임은 공백포함 10자까지 작성 가능합니다.</Warn>
        </WarnSpace>
        <ButtonSection>
            <OutBut>회원탈퇴</OutBut>
            <SaveBut onClick={ChangeName}>저장하기</SaveBut>
        </ButtonSection>
    </MyInfo>
    )
}

const MyInfo = styled.div`
  width: 687px;
  height: 434px;
`;

const MyTitle = styled.div`
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 20px;
  margin-top: 20px;
`;

const MyTitle2 = styled(MyTitle)`
  margin-top: 60px;
`;

const MyInput = styled.input`
  width: 657px;
  height: 70px;
  border-radius: 20px;
  border: solid #cacdd2 1px;
  color: #cacdd2;
  font-size: 20px;
  padding-left: 25px;
`;

const WarnSpace = styled.div`
  display: flex;
  margin-top: 10px;
`;

const WarnImg = styled.img`
  width: 16px;
  margin-left: 10px;
`;

const Warn = styled.div`
  color: #9fa4a9;
  margin-left: 10px;
`;

const ButtonSection = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  font-size: 20px;
`;

const OutBut = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: black;
  border-radius: 30px;
  color: white;
  width: 150px;
  height: 50px;
  cursor: pointer;
`;

const SaveBut = styled(OutBut)`
  background-color: #19297c;
`;