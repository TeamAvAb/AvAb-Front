import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import WarningIcon from '../../assets/mypage/WarnLogo.svg';
import NicknameChangeModal from '../modal/NicknameChangeModal';
import WithdrawModal from '../modal/WithdrawModal';
import { privateAPI } from '../../apis/user';
import LoadingSpinner from '../common/LoadingSpinner';
import Button from '../common/button/Button';

export default function MyInfoBox() {
  const [nickname, setNickname] = useState('');
  const [previousNickname, setPreviousNickname] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const [saveMyInfoModalOpen, setSaveMyInfoModalOpen] = useState(false);
  const [withdrawModalOpen, setWithdrawModalOpen] = useState(false);

  useEffect(() => {
    const call = async () => {
      setLoading(true);
      try {
        const response = await privateAPI.get(`/api/users/me`);
        setPreviousNickname(response.data.result.username);
        setEmail(response.data.result.email);
        setLoading(false);
      } catch (error) {
        console.log('내 정보 로드 요청 에러 : ', error);
      }
    };
    call();
  }, []);

  const openWithDrawModal = () => {
    setWithdrawModalOpen(true);
  };

  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
  };

  const handleSaveClick = async () => {
    if (nickname === '') {
      alert('변경할 닉네임을 입력해주세요.');
      return;
    }

    const response = await privateAPI.patch(`/api/users/me`, {
      username: nickname,
    });
    if (response.status === 200) {
      console.log(response.data);
      setNickname('');
      setPreviousNickname(nickname);
      setSaveMyInfoModalOpen(true);
    } else {
      console.log(response.data);
    }
  };

  return loading ? (
    <LoadingSpinner />
  ) : (
    <section>
      <MyInfo>
        <MyInfoSection>
          <MyTitle>카카오 계정</MyTitle>
          <MyInput value={email} readOnly disabled />
        </MyInfoSection>
        <MyInfoSection>
          <MyTitle>닉네임</MyTitle>
          <MyInput
            value={nickname}
            onChange={handleNicknameChange}
            placeholder={previousNickname}
            maxLength={10}
          />
          <WarnSpace>
            <WarnImg src={WarningIcon} />
            <Warn>닉네임은 공백포함 10자까지 작성 가능합니다.</Warn>
          </WarnSpace>
        </MyInfoSection>

        {withdrawModalOpen && <WithdrawModal handleModal={setWithdrawModalOpen} />}
        {saveMyInfoModalOpen && <NicknameChangeModal handleModal={setSaveMyInfoModalOpen} />}
      </MyInfo>
      <ButtonSection>
        <Button onClick={openWithDrawModal} backgroundColor="grayscale01" color="main05">
          회원 탈퇴
        </Button>
        <Button onClick={handleSaveClick} backgroundColor="main01" color="main05">
          저장하기
        </Button>
      </ButtonSection>
    </section>
  );
}

const MyInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3.5rem;
`;

const MyInfoSection = styled.section`
  display: flex;
  flex-direction: column;
`;

const MyTitle = styled.h3`
  ${({ theme }) => theme.text.h4};
  margin-bottom: 1.2rem;
`;

const MyInput = styled.input`
  width: 40rem;
  height: 4.5rem;
  border-radius: 1.2rem;
  border: solid ${({ theme }) => theme.color.grayscale05} 1px;
  ${({ theme }) => theme.text.paragraph};
  padding-left: 1.5rem;

  &:disabled {
    background-color: transparent;
  }

  &::placeholder {
    color: #cacdd2;
  }
`;

const WarnSpace = styled.div`
  display: flex;
  margin-top: 0.8rem;
`;

const WarnImg = styled.img`
  width: 1rem;
  margin-right: 0.5rem;
`;

const Warn = styled.div`
  color: ${({ theme }) => theme.color.grayscale04};
  ${({ theme }) => theme.text.small};
`;

const ButtonSection = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1.2rem;
`;
