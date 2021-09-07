import React from 'react';

import './GoToTopButton.scss';

const GoToTopButton = (): JSX.Element => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  return (
    <button
      type="button"
      aria-label="Scroll to the top of the page"
      className="go-to-top-btn"
      onClick={scrollToTop}
    />
  );
};

export default GoToTopButton;
