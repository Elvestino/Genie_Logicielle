// pages/api/upload.js
import nextConnect from 'next-connect';
import multer from 'multer';
import xlsx from 'xlsx';

// Set up multer for file uploads
const upload = multer({ dest: 'uploads/' });

const handler = nextConnect();

handler.use(upload.single('file')).post((req, res) => {
  const { file, body } = req;

  if (!file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  // Read and parse the Excel file
  const workbook = xlsx.readFile(file.path);
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const data = xlsx.utils.sheet_to_json(sheet);

  // Save the data and metadata (name, format) to your database here

  res.status(200).json({ message: 'File processed successfully', data: data });
});

export default handler;
