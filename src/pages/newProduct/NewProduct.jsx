import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { 
  getStorage, 
  ref, 
  uploadBytesResumable, 
  getDownloadURL 
} from "firebase/storage";
import FirebaseApp from '../../firebase';
import "./newProduct.css";
import { addProduct } from '../../redux/apiCalls';


export default function NewProduct() {
  const dispatch = useDispatch();

  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState(null);
  const [categories, setCategories] = useState([]);

  const handleInputChange = (e) => {
    setInputs(prev => {
      return { ...prev, [e.target.name]: e.target.value }
    })
  };

  const handleCategoriesChange = (e) => {
    setCategories(e.target.value.split(','));
  };

  const handleCreateClick = (e) => {
    e.preventDefault();
    const fileName = new Date().getTime() + file.name;
    const storage = getStorage(FirebaseApp);
    const storageRef = ref(storage, fileName);

    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on('state_changed', 
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
          default:
            console.log('Default');
        }
      }, 
      (error) => {
        // Handle unsuccessful uploads
      }, 
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const product = {...inputs, img: downloadURL, categories};
          addProduct(product, dispatch);
        });
      }
    );
  };

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Product</h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <label>Image</label>
          <input type="file" id="file"  onChange={e => setFile(e.target.files[0])} />
        </div>
        <div className="addProductItem">
          <label>Title</label>
          <input name='title' type="text" placeholder="Apple Airpods" onChange={handleInputChange} />
        </div>
        <div className="addProductItem">
          <label>Description</label>
          <input name='desc' type="text" placeholder="Description..." onChange={handleInputChange} />
        </div>
        <div className="addProductItem">
          <label>Price</label>
          <input name='price' type="number" placeholder="$" onChange={handleInputChange} />
        </div>
        <div className="addProductItem">
          <label>Categories</label>
          <input type="text" placeholder="jeans, tshirts" onChange={handleCategoriesChange} />
        </div>
        <div className="addProductItem">
          <label>Stock</label>
          <select name='inStock' onChange={handleInputChange}>
            <option value='true'>Yes</option>
            <option value='false'>No</option>
          </select>
        </div>
        <button className="addProductButton" onClick={handleCreateClick}>Create</button>
      </form>
    </div>
  );
}
