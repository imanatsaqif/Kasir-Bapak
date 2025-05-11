// src/components/PilihProduk.tsx
import { useEffect, useState } from "react";
import { db } from "../firebase/firebaseconfig";
import { collection, onSnapshot } from "firebase/firestore";

interface Produk {
  id: string;
  namaProduk: string;
  harga: number;
  stok: number;
}

interface PilihProdukProps {
  onProdukDipilih: (produk: Produk, jumlah: number) => void;
}

const PilihProduk = ({ onProdukDipilih }: PilihProdukProps) => {
  const [produkList, setProdukList] = useState<Produk[]>([]);
  const [jumlah, setJumlah] = useState(1);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "Produk"), (querySnapshot) => {
      const produkData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Produk[];
      setProdukList(produkData);
    });

    return unsubscribe; // Membersihkan listener saat komponen unmount
  }, []);

  const handleTambahProduk = (produk: Produk) => {
    if (jumlah > 0 && jumlah <= produk.stok) {
      onProdukDipilih(produk, jumlah);
      setJumlah(1); // Reset jumlah setelah produk ditambahkan
    } else {
      alert("Jumlah tidak valid atau stok tidak mencukupi!");
    }
  };

  return (
    <div>
      <h2>Pilih Produk</h2>
      <ul>
        {produkList.map((produk) => (
          <li key={produk.id}>
            <span>
              {produk.namaProduk} - Rp{produk.harga} (Stok: {produk.stok})
            </span>
            <input
              type="number"
              value={jumlah}
              onChange={(e) => setJumlah(Number(e.target.value))}
              min="1"
              max={produk.stok}
            />
            <button onClick={() => handleTambahProduk(produk)}>Tambah</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PilihProduk;