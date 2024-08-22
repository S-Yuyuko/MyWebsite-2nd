'use client';

import About from '../components/others/About';
import withAuth from '../components/withAuth';

const AboutPage = () => {
  return (
    <div>
      <About />
    </div>
  );
};

export default withAuth(AboutPage);
