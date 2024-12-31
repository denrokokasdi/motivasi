import React, { useState, useEffect } from 'react';
import ProductImage from './components/ProductImage';
import './OrderForm.css';
import { supabase } from './supabaseClient';
import img9 from './img1/BARANG-SAMPAI-BARU-BAYAR-01.gif';
import { useNavigate } from 'react-router-dom';
import ColorSelect from './ColorSelect';
import ColorPicker from './ColorPicker';
import { useLocation } from 'react-router-dom';
import SelectedItemsDisplay from './SelectedItemsDisplay';
import logo1 from './img1/hibiscus.png'


function OrderForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const { combinedData } = location.state || {}; // Access combinedData from the state

  const [formData, setFormData] = useState({
    pakej: "SET Combo 7 Helai",
    saiz: "",
    name: 'Rokoden',
    email: 'Rokoden@gmail.com',
    phone: '0183943250',
    poskod: '53100',
    address: '018282828280182828282801828282828',
    state: 'Selangor',
    paymentMethod: 'COD',
    harga: "RM89.00"
  });
  const [loading, setLoading] = useState(false); // Added loading state

  useEffect(() => {
    // Scroll to the top of the page when the component is mounted
    window.scrollTo(0, 0);
    console.log(combinedData)
  }, []);

  const malaysianStates = [
    'Johor', 'Kedah', 'Kelantan', 'Melaka', 'Negeri Sembilan',
    'Pahang', 'Perak', 'Perlis', 'Pulau Pinang', 'Sabah',
    'Sarawak', 'Selangor', 'Terengganu', 'WP Kuala Lumpur',
    'WP Labuan', 'WP Putrajaya'
  ];
  const saiz = [
    'M', 'L'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const generateRandomString = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'; // Lowercase letters and digits
    let randomString = '';
    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      randomString += chars[randomIndex];
    }
    return `AIZIRA-${randomString}`; // Add 'AIZIRA-' in front
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true
    const randomstring = generateRandomString();

    setTimeout(async () => {
      if (
        formData.name &&
        formData.phone &&
        formData.poskod &&
        formData.address &&
        formData.state &&
        formData.paymentMethod === 'COD'
      ) {
        const message = `
          Hai Saya Nak Book Tempahan Slimming Panties
          Order Number = ${randomstring}
          Saiz: ${formData.saiz}
          Nama: ${formData.name}
          Email: ${formData.email}
          Telefon: ${formData.phone}
          Alamat: ${formData.address}
          Poskod: ${formData.poskod}
          Negeri: ${formData.state}
          Pembayaran: ${formData.paymentMethod}
          Total Harga: RM99.00
        `;
        const encodedMessage = encodeURIComponent(message);
        const warna = combinedData
        .filter(item => item.name) // Filter to include only items with a 'name' property
        .map(item => item.name)   // Extract the 'name' property
        .join(", ");              // Join names with commas

        const jsonData = {
          order_number: randomstring, // Replace with actual random string generation logic
          pakej: formData.pakej,
          saiz: combinedData[0].size, 
          warna: warna, // Include the joined names here
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          poskod: formData.poskod,
          state: formData.state,
          payment_method: formData.paymentMethod,
          total_price: 99.0,
        };
        try {
          const { data, error } = await supabase
          .from('database1') // Replace with your table name
          .insert([{ json: jsonData }]); // Assuming the column name is 'json'
  
          if (error) {
            console.error('Error inserting data into Supabase:', error);
            alert('Failed to save order to the database. Please try again.');
            return;
          }
    
          console.log('Data successfully inserted:', data);
          navigate('/PaymentSuccessPagePaymentSuccessPagePaymentSuccessPagePaymentSuccessPage', { state: jsonData });
        } catch (err) {
          console.error('Error:', err);
        }
      } else {
        console.log('Please fill in all fields and select Cash on Delivery');
      }
      setLoading(false); // Set loading to false
    }, 1000); // Wait for 1 second
  };

  // Initialize state with an array for 7 color selections
  const [selectedColors, setSelectedColors] = useState(Array(7).fill(''));

  // Function to handle color change for a specific index
  const handleColorChange = (index, color) => {
    const newSelectedColors = [...selectedColors];
    newSelectedColors[index] = color;
    setSelectedColors(newSelectedColors);
  };

  return (
    <div className="form-container">
      <div className="form-wrapper">
      <img src={logo1} alt="Cash on Delivery" style={{height: '60px'}} />
      <h1 style={{ color: "#C03765", fontSize: "26px", marginTop: '-10px', fontFamily: "'Sofia Sans Extra Condensed', sans-serif" }}>
        Aizira MY
      </h1>
        <h2 style={{ color: "#C03765", fontSize: "26px", marginTop: '0px', fontFamily: "'Sofia Sans Extra Condensed', sans-serif" }}>Checkout Form</h2>
        <h3 style={{ color: "#C03765", fontSize: "26px", marginTop: '-30px', fontFamily: "'Sofia Sans Extra Condensed', sans-serif" }}>Sila Isi Maklumat Anda</h3>

        <form onSubmit={handleSubmit}>
          {/* <ProductImage /> */}
          <SelectedItemsDisplay selectedData={combinedData} />
          <h1 style={{ color: 'black', marginTop: '20px', fontStyle: 'inherit' }}>Set Combo 7 Helai</h1>
          <h1 style={{ color: 'blue', marginTop: '-12px', fontSize: '20px' }}>RM89.00</h1>
          <div className="form-section">
          </div>
          <div className="form-section">
            <h3>Maklumat Anda</h3>
            <div className="form-field">
              <label htmlFor="name">Nama Anda</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                placeholder="Nama Anda"
              />
            </div>
            <div className="form-field">
              <label htmlFor="email">Email Anda (Jika Ada)</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="you@example.com"
              />
            </div>
            <div className="form-field">
              <label htmlFor="phone">No Phone</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
                placeholder="01xxxxxxxx"
              />
            </div>
          </div>
          <div className="form-section">
            <h3>Address Information</h3>
            <div className="form-field">
              <label htmlFor="address">Alamat</label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                required
                rows={3}
                placeholder="Sila Isi Alamat Anda"
              />
            </div>
            <div className="form-field">
              <label htmlFor="poskod">Postal Code</label>
              <input
                type="text"
                id="poskod"
                name="poskod"
                value={formData.poskod}
                onChange={handleInputChange}
                required
                placeholder="50000"
              />
            </div>
            <div className="form-field">
              <label htmlFor="state">Negeri</label>
              <select
                id="state"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                required
              >
                <option value="">Sila Pilih Negeri</option>
                {malaysianStates.map(state => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="form-section">
            <h3>Payment Method</h3>
            <div className="payment-options">
              <div
                className={`payment-option ${formData.paymentMethod === 'COD' ? 'selected' : ''}`}
                onClick={() => setFormData(prev => ({ ...prev, paymentMethod: 'COD' }))} 
              >
                <div className="payment-content">
                  <img src={img9} alt="Cash on Delivery" style={{ width: '200px', height: 'auto' }} />
                  <h4>Cash on Delivery</h4>
                  <p>Barang Sampai Baru Bayar Kepada Posmen</p>
                  <p>COD: Penghantaran Percuma Untuk Masa Promosi Sahaja!</p>
                </div>
              </div>
              {formData.paymentMethod === 'FPX' ? (
                <h1 style={{ color: 'blue', fontSize: '20px' }}>RM89.00</h1>
              ) : (
                <h1 style={{ color: 'blue', fontSize: '20px' }}>RM89.00</h1>
              )}
              
            </div>

          </div>
          <button
            type="submit"
            className="submit-button"
            disabled={loading} // Disable button during loading
          >
            {loading ? 'Processing...' : 'Place Order'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default OrderForm;
