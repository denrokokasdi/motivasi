import React, { useState, useEffect } from 'react';
import imgg from './img1/confirm.png';
import { useLocation } from 'react-router-dom';

const PaymentSuccessPage = () => {
  const [currentDate, setCurrentDate] = useState('');
  const location = useLocation();
  const jsonData = location.state;

  useEffect(() => {
    const date = new Date().toLocaleString();
    setCurrentDate(date);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    console.log("Debug");
    console.log(jsonData);
  }, [jsonData]);

  const handleWhatsAppRedirect = () => {
    const phoneNumber = '601128459844';
    const message = `Hello Aizira Malaysia, I just submit an order!\n${JSON.stringify(jsonData, null, 2)}`;
    const url = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
    console.log(message);
    window.open(url, '_blank');
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Terima Kasih!</h1>
      <p style={styles.date}>{currentDate}</p>
      <p style={styles.message}>
        Order anda akan diproses dan diposkan secepat mungkin.
      </p>
      <img
        src={imgg}
        alt="Cash on Delivery"
        style={styles.image}
      />
      <p style={styles.countdownText}>
        Staff kami akan whatsapp anda sebentar lagi untuk rujukan
      </p>
      <p style={styles.countdownText}>
        Atau klik butang di bawah
      </p>
      <button onClick={handleWhatsAppRedirect} style={styles.button}>
        Direct ke WhatsApp
      </button>
      {jsonData && (
        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.tableHeader}>Details</th>
                <th style={styles.tableHeader}>Tempahan</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(jsonData).map(([key, value]) => (
                <tr key={key}>
                  <td style={styles.tableCell}>{key.charAt(0).toUpperCase() + key.slice(1)}</td>
                  <td style={{ ...styles.tableCell, ...styles.wrappedCell }}>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    padding: '20px',
    maxWidth: '600px',
    margin: '0 auto',
    marginTop: '50px',
    backgroundColor: '#fff',
    borderRadius: '15px',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
    fontFamily: 'Arial, sans-serif',
  },
  heading: {
    fontSize: '2.5rem',
    fontWeight: '600',
    color: '#e91e63',
    marginBottom: '10px',
  },
  date: {
    fontSize: '1rem',
    color: '#777',
    marginBottom: '20px',
  },
  message: {
    fontSize: '1.2rem',
    color: '#333',
    marginBottom: '30px',
    lineHeight: '1.6',
  },
  image: {
    width: '200px',
    height: 'auto',
    marginTop: '-30px',
    marginBottom: '-10px',
  },
  tableContainer: {
    overflowX: 'auto',
    width: '100%',
    marginBottom: '30px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  tableHeader: {
    backgroundColor: '#fce4ec',
    fontWeight: 'bold',
    textAlign: 'left',
    padding: '10px',
    border: '1px solid #ddd',
  },
  tableCell: {
    padding: '10px',
    border: '1px solid #ddd',
    textAlign: 'left',
    verticalAlign: 'top',
  },
  wrappedCell: {
    maxWidth: '250px',
    wordBreak: 'break-word',
    whiteSpace: 'normal',
  },
  countdownText: {
    marginTop: '20px',
    fontSize: '1.2rem',
    color: '#333',
    marginBottom: '10px',
  },
  button: {
    marginTop: '20px',
    padding: '12px 25px',
    backgroundColor: '#25d366',
    color: 'white',
    fontSize: '1.1rem',
    fontWeight: '600',
    border: 'none',
    borderRadius: '30px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
};

export default PaymentSuccessPage;
