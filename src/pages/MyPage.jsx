import React from 'react';
import MyInfoBox from '../components/./myPage/MyInfoBox';
import SideNavLayout from '../layout/SideNavLayout';
import PageMetadata from '@/components/helmet/PageMetadata.js';
import SITE_URL from '@/constants/url.js';

export default function MyPage() {
  return (
    <>
      <PageMetadata
        title="마이페이지 | AvAb 아브아브"
        description="마이페이지 - 내 정보"
        keywords=""
        url={SITE_URL.MY_INFO}
      />
      <SideNavLayout selectedPage="info" parentTab="my-page">
        <MyInfoBox />
      </SideNavLayout>
    </>
  );
}
