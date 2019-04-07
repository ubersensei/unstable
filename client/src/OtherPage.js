import React from 'react';
import { Link } from 'react-router-dom';

export default () => {
  return (
    <div>
      This proves that navigation router works in the application. This is separate from the nginx navigation configuration!
      <Link to="/">Go back to home page!</Link>
    </div>
  );
};
