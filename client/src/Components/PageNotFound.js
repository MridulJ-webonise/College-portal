import React from 'react';
import { useHistory } from 'react-router-dom';

function PageNotFound() {
  const history = useHistory();

  return (
    <div>
      <h1>404 ! Page Not Found</h1>
      <h5>
        Move to{' '}
        <span
          onClick={() => {
            history.push('/users');
          }}
          style={{ 'text-decoration': 'underline', cursor: 'pointer' }}>
          Home
        </span>
      </h5>
    </div>
  );
}

export default PageNotFound;
