import "./App.scss";
import { useEffect, useState } from "react";
import Toolbar from "./components/navigationBar/Toolbar";
import Products from "./components/allProducts/Products";
import DropDown from "./components/dropDownMenu/DropDown";
import axios from "axios";

// const turkishCoffee = [
//   {
//     id: Math.random(),
//     brand: "Kahve Dünyası 100g (Orta Kavrulmuş)",
//     price: 21.5,
//     imgUrl:
//       "https://img-kahvedunyasi.mncdn.com/kahvedunyasi/product/500x500/13.300.2110.0006.png",
//   },
//   {
//     id: Math.random(),
//     brand: "Kahve Dünyası 100g (Damla Sakızlı)",
//     price: 27.5,
//     imgUrl:
//       "https://img-kahvedunyasi.mncdn.com/kahvedunyasi/product/500x500/13.300.2110.0003.png",
//   },
//   {
//     id: Math.random(),
//     brand: "Kahve Dünyası 250g (Çok Kavrulmuş)",
//     price: 67.00,
//     imgUrl:
//       "https://img-kahvedunyasi.mncdn.com/kahvedunyasi/product/500x500/13.300.2110.0005.png",
//   },
//   {
//     id: Math.random(),
//     brand: "Kahve Dünyası(Damla Sakızlı) 1kg",
//     price: 280.0,
//     imgUrl:
//       "https://img-kahvedunyasi.mncdn.com/kahvedunyasi/product/500x500/54f52_Damla_Sakiz_Aromali_Turk_Kahvesi_1_Kg..png",
//   },
// ];
// const filterCoffee = [
//   {
//     id: Math.random(),
//     brand: "Kahve Dünyası 250g",
//     price: 95.5,
//     imgUrl:
//       "https://img-kahvedunyasi.mncdn.com/kahvedunyasi/product/500x500/13.300.2040.0001.png",
//   },
//   {
//     id: Math.random(),
//     brand: "Kahve Dünyası 1kg (Vanilya)",
//     price: 425.0,
//     imgUrl:
//       "https://img-kahvedunyasi.mncdn.com/kahvedunyasi/product/500x500/13.300.2040.0009.png",
//   },
//   {
//     id: Math.random(),
//     brand: "Kahve Dünyası 1kg (Karamel)",
//     price: 425.0,
//     imgUrl:
//       "https://img-kahvedunyasi.mncdn.com/kahvedunyasi/product/500x500/13.300.2040.0007.png",
//   },
//   {
//     id: Math.random(),
//     brand: "Kahve Dünyası 1kg (Fındık)",
//     price: 425.0,
//     imgUrl:
//       "https://img-kahvedunyasi.mncdn.com/kahvedunyasi/product/500x500/13.300.2040.0006.png",
//   },
//   {
//     id: Math.random(),
//     brand: "Kosta Rika 200g",
//     price: 73.9,
//     imgUrl:
//       "https://img-kahvedunyasi.mncdn.com/kahvedunyasi/product/500x500/de8b4_Kosta_Rika_Yoresel_Kahve_200g.png",
//   },
// ];
// Yukarda arrayleri sildik çünkü db.json dosyasından api dan get request ı attık. Axios olmadan önce yukarıdaki objeleri getiriyorduk 
function App() {
  const [newProduct, setNewProduct] = useState({brand:"",price:"",imgUrl:""})
  const [coffeeTurkish ,setCoffeeTurkish] = useState([])
  const [coffeeFilter ,setCoffeeFilter] = useState([])// axios kullanmak için içindeki ...filter veya ...turkish coffee silme
  const [allProduct, setAllProduct] = useState([
    ...coffeeTurkish,
    ...coffeeFilter,
  ]);
  const [clickTurkishCoffee, setClickTurkishCoffee] = useState(false)
  const [clickFilterCoffee, setClickFilterCoffee] = useState(false)
  const [shoppingBasket, setShoppingBasket] = useState([]);
  const [openBasketList, setOpenBasketList] = useState(false);
  const [productMenu, setProductMenu] = useState(false);
  const [selectCoffeeType, setSelectCoffeeType] = useState(false);
  const [searchBar, setSearchBar] = useState("");
  const [searchResult, setSearchResult] = useState([])


  const filterCoffeeFromJson = "http://localhost:5000/filterCoffee"; //db.Json'da filtre kahvelerinin tutuluduğu yer         
  const turkishCoffeeFromJson = "http://localhost:5000/turkishCoffee"; // db.Json'da türk kahvelerinin tutuluduğu yer         

  const fetchfilterFromJson = async () => { // db.Json dosyasından filtre kahvelerine get isteği atan fonksiyon
    try {
      const fetchFilter = await axios.get(`${filterCoffeeFromJson}`);
      setAllProduct(fetchFilter.data)
    } catch (error) {
      console.log(error)
    }
  }
  const fetchTurkishFromJson = async () => { // db.Json dosyasından türk kahvelerine get isteği atan fonksiyon
    try {
      const fetchTurkish = await axios.get(`${turkishCoffeeFromJson}`);
      setAllProduct(fetchTurkish.data)
    } catch (error) {
      console.log(error)
    }
  }
  const getCoffees = async () => { // anasayfada ve refresh butonuna tıkladığımız anda axios all yöntemiyle bütün kahvelere get isteği atılır.
    try {
      axios.all([
        axios.get(`${turkishCoffeeFromJson}`),
        axios.get(`${filterCoffeeFromJson}`)
      ]).then(axios.spread((fetchTurkish, fetchFilter) => {
        // İşleme burada yapılabilir
        setAllProduct([...fetchTurkish.data, ...fetchFilter.data])
      }));
      
      // const fetchTurkish = await axios.get(`${turkishCoffeeFromJson}`);
      // const fetchFilter = await axios.get(`${filterCoffeeFromJson}`);
      // setAllProduct([...fetchTurkish.data, ...fetchFilter.data])
    } catch (error) {
      console.log(error)
    }
    
  } 
  useEffect(() => { // sayfa bir kere render edildiği anda getCoffees fonksiyonu çalışır
    getCoffees()
  },[])



  const handleSetNewProduct = (value) => {
    setNewProduct((prevState) => ({...prevState, ...value}))
    /* Buradaki value değeri newProduct koponentindeki inputların onChange eventindeki handleSetNewProduct ın içindeki
    obje değerine eşitlenir. Bundan dolayı newProduct setNewProduct ile set edilir ve prevState parametresi ile bütün
    objeler dolaşılır ve sonra virgülün solunda spread edilip bütün değerler tutulur. Virgülün sağ kısmında ise inputdaki
    parametre değeri yeni değerdeki hangi kısın değiştirildi ise onu ezer ve sadece o inputu değiştirir. */
  }
  const handleTurkishCoffee = (e) => { // kahve türünü seçerken türk kahvesi seçeneğine tıklanması durumunda diğerindeki tıklanma ibaresi kalkması
    e.preventDefault();
    if(clickTurkishCoffee) {
      setClickTurkishCoffee(false)
    } else {
      setClickTurkishCoffee(true)
      setClickFilterCoffee(false)
    }
    console.log(clickTurkishCoffee)
  }
  const fuzzySearch = (event) => {
    setSearchBar(event.target.value); /* Burada input daki onchange in güncel olarak içine yazdığımız değer ile 
    searchBar ın value değerini her input değiştiğinde set eder.*/
    const normalizedSearch = event.target.value.trim().toLowerCase();
    setSearchResult(allProduct.filter((coffee) => coffee.brand.trim().toLowerCase().includes(normalizedSearch)))
    /* searchResult bir array statedir bunu belirlediğimiz kritere göre set ediyoruz setSearchResult ile burada biz 
    aradığımız kritere göre kartları getirmesini istedğimizden3 ona göre bir return döndürmek isteriz bunun için filter
    methodunu kullanarak içine de coffee parametresini veririz ve bu bütün allProduct arrayini gezer ve gezdiğinin brand
    property sinin normalizedSearch kriterini içermesi biz true dönüyorsa bu kriter doğrultusunda searchResult arrayimiz
    set edilmiş olur.  */
  }
  const handleFilterCoffee = (e) => {// kahve türünü seçerken filtre kahvesi seçeneğine tıklanması durumunda diğerindeki tıklanma ibaresi kalkması
    e.preventDefault();
    if(clickFilterCoffee) {
      setClickFilterCoffee(false)
    } else {
      setClickFilterCoffee(true)
      setClickTurkishCoffee(false)
    }
    console.log(clickFilterCoffee)
  }
  const addNewProduct = async (e) => { 
    e.preventDefault();
    if(Object.values(newProduct).every((value) => value)){       
      if(clickTurkishCoffee) { /* eğer eklemeden önce kahve türünü hangisi seçersek o kahve türünün olduğu arraye ürün ekleyecektir alttaki 
      koşullarda */
        const turkishResponse = await axios.post(`${turkishCoffeeFromJson}`,{...newProduct})
        setCoffeeTurkish((prevProduct) => [...prevProduct, turkishResponse.data])
      } 
      if(clickFilterCoffee) {
        const filterResponse = await axios.post(`${filterCoffeeFromJson}`,{...newProduct})
        setCoffeeFilter((prevProduct) => [...prevProduct, filterResponse.data])
      }
      // setAllProduct([...coffeeTurkish, ...coffeeFilter]); //bütün post işlemi bittikten sonra şuradaki array parantezlerini kaldırmayı dene.
      // setAllProduct((prevProduct) => [...prevProduct, newProduct])
      setNewProduct({brand:"",price:"",imgUrl:""})
      /* burada newProduct objesinin değerlerinden bir array oluşturuyor sonra bu array every ile dolaşılır eğer hepsi
      aynı değer gelir ise true gelir. Eğer true olursa if koşulunun içine girer. Sonra bütün ürünlerin bulunduğu allProduct
      arrayi prevState methodu ile setAllProduct kullanılarak set edilir ...prevProduct ile arrayin içindeki bütün elemanlar gezilir
      tutulur virgülün sağ kısmındaki newProduct ile yeni obje eklenir. Bu newProduct objesi handleSetNewProduct fonksiyonunda 
      setNewProduct kullanılarak inputdaki yazılan değerler set edilir ve newProduct değeri değişir her input değeri değiştiğinde */
    }
  }
  const deleteCoffee = async (id) => {
    try {
      const deleteCoffee = await axios.delete(`${turkishCoffeeFromJson}/${id}`) /* burada denendi Filter kahve json dosyasında da 
      olsa sonuçta tıklananı siliyor  sonra sildikten sonra axios all ile hepsini bütün ürünleri getiriyor */
      if(deleteCoffee.status === 200) {
        axios.all([
          axios.get(`${turkishCoffeeFromJson}`),
          axios.get(`${filterCoffeeFromJson}`)
        ]).then(axios.spread((fetchTurkish, fetchFilter) => {
          // İşleme burada yapılabilir
          setAllProduct([...fetchTurkish.data, ...fetchFilter.data])
        }));
      }
    } catch(error) {
      console.log(error)
    }
  }
  const menuDropDown = (e) => {
    e.preventDefault(); // All Products Yazısına tıkladığımız zaman dropDown menünün açılma fonksiyonu
    productMenu ? setProductMenu(false) : setProductMenu(true);
  };
  const toggleBasketMenu = () => { 
    openBasketList ? setOpenBasketList(false) : setOpenBasketList(true); // Basket ikonuna tıkladığımızda satın alınanlar listesinin açılması
  };
  const toggleAdminPanel = (e) => {
    e.preventDefault(); // Yeni bir ürün kartı eklemek istediğimiz zaman admin panel ikonun açılıp kapanma fonksiyonu
    selectCoffeeType ? setSelectCoffeeType(false) : setSelectCoffeeType(true);
  };
  const refreshList = (e) => {
    // refresh ikonuna tıkladığımız zaman sayfanın ilk halindeki tüm ürünlerin tekrar hepsinin birlikte gözükme fonksiyonu
    e.preventDefault(); 
    // setAllProduct([...coffeeTurkish, ...coffeeFilter]); //bu satırı commentledik çünkü artık axios ile getirme işlemi uyguladık
    getCoffees()
    setProductMenu(false);
  };
  const addToBasket = (e) => {
    setShoppingBasket([...shoppingBasket, { brand: e.brand, price: e.price }]);
    console.log(shoppingBasket);
    //shopping basket arrayine tıkladığımız kartı yeni bir obje olarak set ediyor 
  };
  const getTurkishCoffee = (e) => {
    e.preventDefault(); //turkish coffee butonuna tıkladığımız zaman sadece türk kahvelerini spread edip set etmiş oluyor allProduct arrayine
    // setAllProduct([...coffeeTurkish]);  //bu satırı commentledik çünkü artık axios ile getirme işlemi uyguladık
    fetchTurkishFromJson()
  };
  const getFilterCoffee = (e) => {
    e.preventDefault(); //filter coffee butonuna tıkladığımız zaman sadece filtre kahvelerini spread edip set etmiş oluyor allProduct arrayine
    // setAllProduct([...coffeeFilter]);  //bu satırı commentledik çünkü artık axios ile getirme işlemi uyguladık
    fetchfilterFromJson()
    
  };
  const removeFromBasket = (coffee) => {
    setShoppingBasket(shoppingBasket.filter((value) => coffee !== value));
    //basket ikonuna tıkladığımız zaman shopping basket arrayine maplanmış objelerden hangisinin çarpı ikonuna tıklarsak onu o shoppingBasket
    //arrayinden silmiş oluyor. Basket componentindeki span elementinin onclick i bir callback alıyor içinde product ismini 
    // verdiğimiz bir parametre alıyor. Biz bu parametreyi shoppingBasket i maplerken arrayi dolaşşın diye verdik aslında bu product tıkladığımz 
    //herbir ürün olmuş oluyor. İşte biz bu span elementine tıkladığımız zaman oradaki product callback i fonksiyondaki coffee parametresine eşleşiyor.
    // biz filter işleminde diyoruz ki bizim yeni shopppingBasket arrayimiz o arrayi dolaşan parametre ile(value) o an listede tıkladığımız 
    //parametreye  eşit olmayan bir array oluştur işte removeFromBasket fonksiyon bu işlevi gerçekleştiriyor.
  };
  return (
    <div className="App">
      <Toolbar
        searchBar={searchBar}
        fuzzySearch={fuzzySearch}
        removeFromBasket={removeFromBasket}
        handleTurkishCoffee={handleTurkishCoffee}
        handleFilterCoffee={handleFilterCoffee}
        openBasketList={openBasketList}
        toggleBasketMenu={toggleBasketMenu}
        shoppingBasket={shoppingBasket}
        refreshList={refreshList}
        productMenu={productMenu}
        addToBasket={addToBasket}
        menuDropDown={menuDropDown}
        getFilterCoffee={getFilterCoffee}
        getTurkishCoffee={getTurkishCoffee}
        toggleAdminPanel={toggleAdminPanel}
        selectCoffeeType={selectCoffeeType}
        clickFilterCoffee={clickFilterCoffee}
        clickTurkishCoffee={clickTurkishCoffee}
        handleSetNewProduct={handleSetNewProduct}
        addNewProduct={addNewProduct}
        newProduct={newProduct}
      />
      {productMenu && (
        <DropDown
          menuDropDown={menuDropDown}
          getFilterCoffee={getFilterCoffee}
          getTurkishCoffee={getTurkishCoffee}
        />
      )}
      <Products deleteCoffee={deleteCoffee} searchResult={searchResult} addToBasket={addToBasket} allProduct={allProduct} />
    </div>
  );
}

export default App;
