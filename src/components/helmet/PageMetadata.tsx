import { Helmet } from 'react-helmet-async';
import characterImage from '@/assets/character/greetingAvb.png';

type Props = {
  title: string;
  description: string;
  keywords: string;
  image?: string;
  url: string;
  type?: 'website' | 'article';
};

export default function PageMetadata({ title, description, keywords, image, url, type }: Props) {
  return (
    <Helmet>
      <title>{title}</title>

      <meta name="description" content={description} />
      <meta
        name="keywords"
        content={`레크레이션, 검색, 추천, 워크샵, MT, 모임, 아브아브, AvAb, ${keywords}`}
      />

      {type && <meta property="og:type" content={type} />}
      <meta property="og:title" content={title} />
      <meta property="og:site_name" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image || characterImage} />
      <meta property="og:url" content={`https://avab.site${url}`} />

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      <link rel="canonical" href={`https://avab.site${url}`} />
    </Helmet>
  );
}
