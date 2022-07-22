import GlobalStyles from '../styles/GlobalStyles';
import SEO from './SEO';

interface Props {
  title: string;
  slug: string;
  children: React.ReactNode;
}

function Layout({ title, slug, children }: Props) {
  return (
    <>
      <SEO title={title} slug={slug} />
      <GlobalStyles />
      <main>{children}</main>
    </>
  );
}

export default Layout;
