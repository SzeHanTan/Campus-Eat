import React, { useState } from 'react';
import './PaymentPage.css'
import { useNavigate } from 'react-router-dom';
import QRCode from 'react-qr-code';

const PaymentPage = () => {
  const navigate = useNavigate();
  const [paymentImage, setPaymentImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  // Example URL for Touch 'n Go payment
  const paymentUrl = "https://www.touchngo.com.my"; // Replace with actual payment URL

  // Handle file upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPaymentImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle payment confirmation after uploading the screenshot
  const handlePaymentConfirmation = () => {
    setUploading(true);
    setTimeout(() => {
      setUploading(false);
      navigate('/payment-success');
    }, 3000);
  };

  return (
    <div className="payment-page">
      <h2>Payment Page</h2>
      <p>Scan the QR code below to make the payment via Touch 'n Go eWallet.</p>
      <div className="qr-code">
        <QRCode value={paymentUrl} size={200} />
      </div>

      <div className="upload-section">
        <p>Upload the screenshot of your payment once completed:</p>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          disabled={uploading}
        />
        {paymentImage && <img src={paymentImage} alt="Payment Screenshot" />}
      </div>

      <div className="actions">
        <button onClick={handlePaymentConfirmation} disabled={uploading}>
          {uploading ? "Uploading..." : "Confirm Payment"}
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;

