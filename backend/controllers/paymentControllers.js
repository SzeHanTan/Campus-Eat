import fs from 'fs';
import path from 'path';

// Controller to handle the payment screenshot upload
const handlePaymentScreenshot = async (req, res) => {
  const { file } = req;

  if (!file) {
    return res.status(400).json({ message: 'No payment screenshot uploaded.' });
  }

  // Store the screenshot file path
  const imagePath = path.join(__dirname, 'uploads', file.filename);

  try {
    // Optionally, add logic here to verify the payment using the screenshot

    res.json({
      message: 'Payment screenshot uploaded successfully.',
      imagePath: `/images/${file.filename}`,
    });
  } catch (error) {
    console.error('Error uploading payment screenshot:', error);
    res.status(500).json({ message: 'Error processing the payment screenshot.' });
  }
};

export { handlePaymentScreenshot };

