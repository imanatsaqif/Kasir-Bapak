import { useEffect, useState } from "react";
import { db, auth } from "../firebase/firebaseconfig";
import { collection, addDoc, doc, updateDoc, deleteDoc, onSnapshot } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import "./Inventory.css";

interface Produk {
  id: string;
  namaProduk: string;
  jenisProduk: string;
  keterangan: string;
  kadaluarsa: string;
  harga: number;
  stok: number;
}

const Inventory = () => {
  const navigate = useNavigate();
  const [produkList, setProdukList] = useState<Produk[]>([]);
  const [produkListDefault, setProdukListDefault] = useState<Produk[]>([]);
  const [formData, setFormData] = useState<Omit<Produk, "id">>({
    namaProduk: "",
    jenisProduk: "",
    keterangan: "",
    kadaluarsa: "",
    harga: 0,
    stok: 0
  });
  const [sortField, setSortField] = useState<keyof Produk | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [showFormSection, setShowFormSection] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged((user) => {
      if (!user) navigate("/");
    });

    const unsubscribeProduk = onSnapshot(collection(db, "Produk"), (snapshot) => {
      const produkData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      })) as Produk[];

      const sortedDefault = [...produkData].sort((a, b) =>
        a.namaProduk.localeCompare(b.namaProduk)
      );

      setProdukList(sortedDefault);
      setProdukListDefault(sortedDefault);
    });

    return () => {
      unsubscribeAuth();
      unsubscribeProduk();
    };
  }, [navigate]);

  useEffect(() => {
    if (searchQuery.length >= 3) {
      const filtered = produkListDefault.filter(produk => 
        produk.namaProduk.toLowerCase().includes(searchQuery.toLowerCase()) ||
        produk.jenisProduk.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (produk.keterangan && produk.keterangan.toLowerCase().includes(searchQuery.toLowerCase()))
      );
      setProdukList(filtered);
    } else {
      setProdukList([...produkListDefault]);
    }
  }, [searchQuery, produkListDefault]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'harga' || name === 'stok' ? Number(value) : value
    });
  };

  const handleTambahProduk = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateDoc(doc(db, "Produk", editingId), formData);
        alert("Produk berhasil diupdate!");
      } else {
        await addDoc(collection(db, "Produk"), formData);
        alert("Produk berhasil ditambahkan!");
      }
      
      setFormData({ 
        namaProduk: "",
        jenisProduk: "",
        keterangan: "",
        kadaluarsa: "",
        harga: 0,
        stok: 0
      });
      setEditingId(null);
    } catch (error) {
      console.error("Error saving product: ", error);
    }
  };

  const handleUpdateStok = async (id: string, stokBaru: number) => {
    try {
      await updateDoc(doc(db, "Produk", id), { stok: stokBaru });
    } catch (error) {
      console.error("Error updating stock: ", error);
    }
  };

  const handleHapusProduk = async (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus produk ini?")) {
      try {
        await deleteDoc(doc(db, "Produk", id));
      } catch (error) {
        console.error("Error deleting product: ", error);
      }
    }
  };

  const handleEditProduk = (produk: Produk) => {
    setEditingId(produk.id);
    setFormData({
      namaProduk: produk.namaProduk,
      jenisProduk: produk.jenisProduk,
      keterangan: produk.keterangan,
      kadaluarsa: produk.kadaluarsa,
      harga: produk.harga,
      stok: produk.stok
    });
    
    if (!showFormSection) {
      setShowFormSection(true);
      setTimeout(() => {
        document.querySelector('.inventory-form-section')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  const handleSort = (field: keyof Produk) => {
    const direction = sortField === field && sortDirection === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortDirection(direction);

    const sorted = [...produkList].sort((a, b) => {
      const valA = a[field];
      const valB = b[field];
      if (valA < valB) return direction === "asc" ? -1 : 1;
      if (valA > valB) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setProdukList(sorted);
  };

  const handleResetSorting = () => {
    const sortedDefault = [...produkListDefault].sort((a, b) =>
      a.namaProduk.localeCompare(b.namaProduk)
    );
    setProdukList(sortedDefault);
    setSortField(null);
    setSortDirection("asc");
  };

  return (
    <div className="inventory-page">
      <Header activePage="inventory" />

      <div className="inventory-main-content">
        <div className={`inventory-form-section ${showFormSection ? '' : 'hidden'}`}>
          <h1 className="inventory-page-title">Manajemen Inventory</h1>

          <form onSubmit={handleTambahProduk} className="product-form">
            <h2 className="form-title">
              {editingId ? 'Edit Produk' : 'Tambah Produk Baru'}
            </h2>

            <div className="form-input-group">
              <label className="form-label">Nama Produk:</label>
              <input
                type="text"
                name="namaProduk"
                className="form-input"
                value={formData.namaProduk}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-input-group">
              <label className="form-label">Jenis Produk:</label>
              <input
                type="text"
                name="jenisProduk"
                className="form-input"
                value={formData.jenisProduk}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-input-group">
              <label className="form-label">Keterangan:</label>
              <textarea
                name="keterangan"
                className="form-textarea"
                value={formData.keterangan}
                onChange={handleInputChange}
                rows={3}
              />
            </div>

            <div className="form-input-group">
              <label className="form-label">Tanggal Kadaluarsa:</label>
              <input
                type="date"
                name="kadaluarsa"
                className="form-input"
                value={formData.kadaluarsa}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-input-group">
              <label className="form-label">Harga (Rp):</label>
              <input
                type="number"
                name="harga"
                className="form-input"
                value={formData.harga}
                onChange={handleInputChange}
                required
                min="0"
              />
            </div>

            <div className="form-input-group">
              <label className="form-label">Stok:</label>
              <input
                type="number"
                name="stok"
                className="form-input"
                value={formData.stok}
                onChange={handleInputChange}
                required
                min="0"
              />
            </div>

            <button type="submit" className="form-submit-btn">
              {editingId ? 'Update Produk' : 'Tambah Produk'}
            </button>
          </form>
        </div>

        <div className={`inventory-table-section ${!showFormSection ? 'full-width' : ''}`}>
          <div className="table-header-controls">
            <h2 className="table-section-title">Daftar Produk</h2>
            
            <div className="table-controls-group">
              <button 
                onClick={() => setShowFormSection(!showFormSection)}
                className="table-control-btn input-product-btn"
              >
                {showFormSection ? 'Sembunyikan Form' : 'Input Produk'}
              </button>
              
              <div className="search-container">
                <input
                  type="text"
                  placeholder="Cari produk..."
                  className="search-input"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <span className="search-icon">🔍</span>
              </div>
              
              <button 
                onClick={handleResetSorting}
                className="table-control-btn reset-sorting-btn"
              >
                Reset Sorting
              </button>
            </div>
          </div>

          <div className="table-scroll-container">
            <table className="product-data-table">
              <thead>
                <tr>
                  <th
                    className="table-header-cell sortable"
                    onClick={() => handleSort("namaProduk")}
                  >
                    Nama {sortField === "namaProduk" ? (sortDirection === "asc" ? "↑" : "↓") : ""}
                  </th>
                  <th
                    className="table-header-cell sortable"
                    onClick={() => handleSort("jenisProduk")}
                  >
                    Jenis {sortField === "jenisProduk" ? (sortDirection === "asc" ? "↑" : "↓") : ""}
                  </th>
                  <th className="table-header-cell">Keterangan</th>
                  <th
                    className="table-header-cell sortable"
                    onClick={() => handleSort("kadaluarsa")}
                  >
                    Kadaluarsa {sortField === "kadaluarsa" ? (sortDirection === "asc" ? "↑" : "↓") : ""}
                  </th>
                  <th
                    className="table-header-cell sortable"
                    onClick={() => handleSort("harga")}
                  >
                    Harga {sortField === "harga" ? (sortDirection === "asc" ? "↑" : "↓") : ""}
                  </th>
                  <th
                    className="table-header-cell sortable"
                    onClick={() => handleSort("stok")}
                  >
                    Stok {sortField === "stok" ? (sortDirection === "asc" ? "↑" : "↓") : ""}
                  </th>
                  <th className="table-header-cell">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {produkList.map((produk) => (
                  <tr key={produk.id} className="product-data-row">
                    <td className="product-data-cell">{produk.namaProduk}</td>
                    <td className="product-data-cell">{produk.jenisProduk}</td>
                    <td className="product-data-cell product-description">
                      {produk.keterangan || '-'}
                    </td>
                    <td className="product-data-cell">{produk.kadaluarsa}</td>
                    <td className="product-data-cell">Rp{produk.harga.toLocaleString()}</td>
                    <td className="product-data-cell">
                      <input
                        type="number"
                        className="stock-edit-input"
                        value={produk.stok}
                        onChange={(e) => handleUpdateStok(produk.id, Number(e.target.value))}
                        min="0"
                      />
                    </td>
                    <td className="product-data-cell">
                      <button
                        onClick={() => handleEditProduk(produk)}
                        className="product-edit-btn"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleHapusProduk(produk.id)}
                        className="product-delete-btn"
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inventory;