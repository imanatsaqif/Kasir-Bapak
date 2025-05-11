import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "./firebase/firebaseconfig";
import { collection, onSnapshot, addDoc, doc, updateDoc, increment } from "firebase/firestore";
import CariProduk from "./components/CariProduk";
import ResiVirtual from "./components/ResiVirtual";
import Header from "./components/Header";
import "./App.css";

interface Produk {
  id: string;
  namaProduk: string;
  harga: number;
  stok: number;
  kadaluarsa: string;
}

interface ItemTransaksi extends Omit<Produk, "stok"> {
  jumlah: number;
  subtotal: number;
}

const App = () => {
  const navigate = useNavigate();
  const [produkList, setProdukList] = useState<Produk[]>([]);
  const [items, setItems] = useState<ItemTransaksi[]>([]);
  const [totalHarga, setTotalHarga] = useState(0);

  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged((user) => {
      if (!user) navigate("/");
    });

    const unsubscribeProduk = onSnapshot(collection(db, "Produk"), (snapshot) => {
      setProdukList(
        snapshot.docs.map((doc) => ({ id: doc.id, ...(doc.data() as Omit<Produk, "id">) }))
      );
    });

    return () => {
      unsubscribeAuth();
      unsubscribeProduk();
    };
  }, [navigate]);

  const updateTotalHarga = (updatedItems: ItemTransaksi[]) => {
    setTotalHarga(updatedItems.reduce((total, item) => total + item.subtotal, 0));
  };

  const handleProdukDipilih = (produk: Produk) => {
    const existingItem = items.find((item) => item.id === produk.id);
  
    let updatedItems;
    if (existingItem) {
      updatedItems = items.map((item) =>
        item.id === produk.id ? { ...item, jumlah: item.jumlah + 1, subtotal: (item.jumlah + 1) * item.harga } : item
      );
    } else {
      updatedItems = [...items, { ...produk, jumlah: 1, subtotal: produk.harga }];
    }
  
    setItems(updatedItems);
    updateTotalHarga(updatedItems);
  };

  const handleUpdateJumlah = (id: string, jumlah: number) => {
    const updatedItems = items.map((item) =>
      item.id === id ? { ...item, jumlah, subtotal: item.harga * jumlah } : item
    );

    setItems(updatedItems);
    updateTotalHarga(updatedItems);
  };

  const handleHapusProduk = (id: string) => {
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);
    updateTotalHarga(updatedItems);
  };
  
  const handleResetTransaksi = () => {
    setItems([]);
    setTotalHarga(0);
  };
  
  const handleSimpanTransaksi = async () => {
    if (!items.length) return alert("Tidak ada produk yang dipilih!");

    try {
      await addDoc(collection(db, "Transaksi"), {
        items,
        totalHarga,
        tanggalTransaksi: new Date().toISOString(),
        idKasir: auth.currentUser?.uid,
      });

      for (const item of items) {
        await updateDoc(doc(db, "Produk", item.id), { stok: increment(-item.jumlah) });
      }

      alert("Transaksi berhasil disimpan!");
      setItems([]);
      setTotalHarga(0);
    } catch (error) {
      console.error("Error saving transaction:", error);
    }
  };

  return (
    <div className="cashier-page">
      <Header activePage="kasir" />
      <div className="cashier-main-content">
        <div className="product-search-section">
          <CariProduk produkList={produkList} onProdukDipilih={handleProdukDipilih} />
        </div>
        <div className="transaction-section">
          <ResiVirtual
            items={items}
            totalHarga={totalHarga}
            onUpdateJumlah={handleUpdateJumlah}
            onHapusProduk={handleHapusProduk}
            onSimpanTransaksi={handleSimpanTransaksi}
            handleResetTransaksi={handleResetTransaksi}
          />
        </div>
      </div>
    </div>
  );
};

export default App;