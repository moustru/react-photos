import "./Photo.css";
import type { PhotoObject } from "@/types/PhotoObject";

export default function Photo(photoProps: PhotoObject) {
  return (
    <div className="photo">
      <img src={photoProps.thumbnailUrl} alt="Photo" />
      <p>{photoProps.title}</p>
    </div>
  );
}
