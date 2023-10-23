const express = require('express');
const libraryData = require('./data');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Endpoint untuk menambahkan buku baru ke dalam database
app.post('/addBook', (req, res) => {
  const { body } = req;
  libraryData.push(body); // Menambahkan buku baru ke dalam libraryData
  return res.json(libraryData); // Mengembalikan data buku yang diperbarui sebagai respons
});

// Endpoint untuk mendapatkan daftar semua buku dalam database
app.get('/getBooks', (req, res) => {
  return res.json(libraryData); // Mengembalikan seluruh data buku sebagai respons
});

// Endpoint untuk mengedit buku berdasarkan indeks
app.put('/editBook/:index', (req, res) => {
  const { body } = req;
  const index = parseInt(req.params.index);

  if (index >= 0 && index < libraryData.length) {
    libraryData[index] = body; // Mengganti buku yang ada pada indeks tertentu dengan data baru
    return res.json(libraryData); // Mengembalikan data buku yang diperbarui sebagai respons
  } else {
    return res.status(404).json({ error: 'Buku tidak ditemukan' });
  }
});

// Endpoint untuk menghapus buku berdasarkan indeks
app.delete('/deleteBook/:index', (req, res) => {
  const index = parseInt(req.params.index);

  if (index >= 0 && index < libraryData.length) {
    libraryData.splice(index, 1); // Menghapus buku pada indeks tertentu dari libraryData
    return res.json(libraryData); // Mengembalikan data buku yang diperbarui sebagai respons
  } else {
    return res.status(404).json({ error: 'Buku tidak ditemukan' });
  }
});

const port = 4000;
app.listen(port, () => {
  console.log(`server running on ${port}`);
});
