import SearchModal from '@/components/forms/SearchModal';
import Footer from '@/components/layouts/Footer';
import Header from '@/components/layouts/Header';
import SEO from '@/components/layouts/SEO';
import { ReactNode } from 'react';

interface Props {
  title: string;
  slug?: string;
  children: ReactNode;
}

function Layout({ title, slug = '', children }: Props) {
  return (
    <>
      <SEO
        title={title}
        slug={slug}
      />
      <SearchModal />
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}

export default Layout;
