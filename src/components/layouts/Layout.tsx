import GlobalStyles from '../styles/GlobalStyles';
import Footer from './Footer';
import Header from './Header';
import SEO from './SEO';

interface Props {
  title: string;
  slug?: string;
  children: React.ReactNode;
}

function Layout({ title, slug = '', children }: Props) {
  return (
    <>
      <SEO title={title} slug={slug} />
      <GlobalStyles />
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}

export default Layout;
