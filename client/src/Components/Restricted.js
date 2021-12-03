import React from 'react';
import { useHistory } from 'react-router-dom';

function Restricted() {
  const history = useHistory();
  return (
    <div>
      <h1>Restricted Access !!</h1>
      <h3>
        Move to{' '}
        <span
          onClick={() => {
            history.push('/users');
          }}
          style={{ cursor: 'pointer', textDecoration: 'underline' }}>
          Users
        </span>
      </h3>
    </div>
  );
}

export default Restricted;
