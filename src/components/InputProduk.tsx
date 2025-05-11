// src/components/InputProduk.tsx
import { useState } from "react";
import { db } from "../firebase/firebaseconfig";
import { collection, addDoc } from "firebase/firestore";

const InputProduk = () => {
  const [namaProduk, setNamaProduk] = useState("");
  const [jenisProduk, setJenisProduk] = useState("");
  const [harga, setHarga] = useState(0);
  const [stok, setStok] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "Produk"), {
        namaProduk,
        jenisProduk,
        harga,
        stok,
        createdAt: new Date().toISOString(),
      });
      alert("Produk berhasil ditambahkan!");
      setNamaProduk("");
      setJenisProduk("");
      setHarga(0);
      setStok(0);
    } catch (error) {
      console.error("Error adding product: ", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Tambah Produk</h2>
      <div>
        <label>Nama Produk:</label>
        <input
          type="text"
          value={namaProduk}
          onChange={(e) => setNamaProduk(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Jenis Produk:</label>
        <input
          type="text"
          value={jenisProduk}
          onChange={(e) => setJenisProduk(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Harga:</label>
        <input
          type="number"
          value={harga}
          onChange={(e) => setHarga(Number(e.target.value))}
          required
        />
      </div>
      <div>
        <label>Stok:</label>
        <input
          type="number"
          value={stok}
          onChange={(e) => setStok(Number(e.target.value))}
          required
        />
      </div>
      <button type="submit">Tambah Produk</button>
    </form>
  );
};

export default InputProduk;