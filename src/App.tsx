import "./App.css";
import {
  useAddPhotoMutation,
  useGetPhotosQuery,
  useLazyGetPhotosQuery,
} from "./store/api/photosApi";
import Photo from "./components/Photo/Photo";
import { useState } from "react";

function App() {
  const [count, setCount] = useState("10");
  const [newPhoto, setNewPhoto] = useState("");

  const { data: photos = [], isLoading, isError } = useGetPhotosQuery(count);

  // На случай мутаций
  const [
    addProduct,
    // { isError: isErrorForMutation, isLoading: isLoadingForMutation },
  ] = useAddPhotoMutation();

  // Обработка мутации
  const handleAddPhoto = async () => {
    if (newPhoto) {
      await addProduct({ name: newPhoto }).unwrap();
      setNewPhoto("");
    }
  };

  // На случай ленивой загрузки
  // const [getPhotosLazy, { data: photos = [] }] = useLazyGetPhotosQuery();
  // const getPhotosAction = (count: string) => getPhotosLazy(count);

  if (isLoading) return <h2 className="no-data">Загрузка</h2>;
  if (isError) return <h2 className="no-data">Ошибка загрузки</h2>;

  return (
    <>
      <h2 className="title">Photos from server</h2>
      {/* Ленивая загрузка по клику */}
      {/* <button onClick={() => getPhotosAction("10")}>получить данные</button> */}
      <div className="photos-count">
        <span>Кол-во фотографий на странице: </span>
        <select value={count} onChange={(e) => setCount(e.target.value)}>
          <option value="1">1</option>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="25">25</option>
          <option value="50">50</option>
        </select>
      </div>
      <div className="photos">
        {photos.map((photo, index) => (
          <Photo {...photo} key={index} />
        ))}
      </div>
    </>
  );
}

export default App;
