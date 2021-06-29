import { useEffect } from 'react';
import '../styles/CheckOutPage.css';

function CheckOutPage() {
  useEffect(() => {
    setTimeout(() => (window.location.href = '/checkin'), 1000);
  });
  return (
    <div id='text-wrapper'>
      <h1 id='ending-text'>Complete!</h1>
    </div>
  );
}

export default CheckOutPage;
