export interface Content {
  nav: {
    info: string;
    tokenomics: string;
    whitepaper: string;
    shop: string;
  };
  hero: {
    title: string;
    subtitle: string;
    cta: string;
    buyLink: string;
  };
  tokenAddress: {
    label: string;
    copy: string;
    copied: string;
  };
  info: {
    title: string;
    description: string;
  };
  tokenomics: {
    title: string;
    supply: string;
    tax: string;
    liquidity: string;
    burn: string;
  };
  whitepaper: {
    title: string;
    content: string;
    link: string;
    featured: string;
    readMore: string;
  };
  shop: {
    title: string;
    subtitle: string;
    cta: string;
    items: {
      name: string;
      price: string;
      description: string;
      image: string;
    }[];
  };
  footer: {
    copyright: string;
  };
}

export type Language = 'en' | 'pt';
