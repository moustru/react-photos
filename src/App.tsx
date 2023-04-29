import { useEffect } from "react";
import "./App.css";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { getPhotos } from "./store/slices/photoSlice";
import Photo from "./components/Photo/Photo";

function App() {
  const dispatch = useAppDispatch();

  const photosData = useAppSelector((state) => state.photoSlice.photosData);

  useEffect(() => {
    dispatch(getPhotos());
  }, [dispatch]);

  return photosData.photos.length ? (
    <>
      <h2 className="title">Photos from server</h2>
      <div className="photos">
        {photosData.photos.map((photo, index) => (
          <Photo {...photo} key={index} />
        ))}
      </div>
    </>
  ) : (
    <h2 className="no-data">
      {photosData.status === "loading" && "Загрузка"}
      {photosData.status === "rejected" && "Ошибка загрузки"}
    </h2>
  );
}

export default App;
