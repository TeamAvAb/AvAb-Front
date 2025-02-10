import React from 'react';
import MyInfoBox from '../components/./myPage/MyInfoBox';
import { Helmet } from 'react-helmet';
import Page from '../components/./myPage/Page';

export default function MyPage() {
  return (
    <Page selectedPage="info">
      <Helmet>
        <title>AvAb | 마이페이지 - 내 정보 관리</title>
        <meta
          name="description"
          content="마이페이지에서 내 정보를 관리하고, 즐겨찾는 레크레이션을 확인할 수 있습니다."
        />
        <meta property="og:title" content="마이페이지 - 내 정보 관리" />
        <meta
          property="og:description"
          content="마이페이지에서 내 정보를 관리하고, 즐겨찾는 레크레이션을 확인할 수 있습니다."
        />
      </Helmet>
      <MyInfoBox />
    </Page>
  );
}
