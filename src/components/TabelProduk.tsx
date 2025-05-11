// src/components/TabelProduk.tsx
import { useEffect, useState } from "react";
import { db } from "../firebase/firebaseconfig";
import { collection, getDocs } from "firebase/firestore";

interface Produk {
  id: string;
  namaProduk: string;
  jenisProduk: string;
  harga: number;
  stok: number;
}

const TabelProduk = () => {
  const [produkList, setProdukList] = useState<Produk[]>([]);

  useEffect(() => {
    const fetchProduk = async () => {
      const querySnapshot = await getDocs(collection(db, "Produk"));
      const produkData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Produk[];
      setProdukList(produkData);
    };

    fetchProduk();
  }, []);

  return (
    <div>
      <h2>Daftar Produk</h2>
      <table>
        <thead>
          <tr>
            <th>Nama Produk</th>
            <th>Jenis Produk</th>
            <th>Harga</th>
            <th>Stok</th>
          </tr>
        </thead>
        <tbody>
          {produkList.map((produk) => (
            <tr key={produk.id}>
              <td>{produk.namaProduk}</td>
              <td>{produk.jenisProduk}</td>
              <td>{produk.harga}</td>
              <td>{produk.stok}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TabelProduk;