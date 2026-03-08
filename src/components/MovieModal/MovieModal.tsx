import css from './MovieModal.module.css'
import { Movie } from '../../types/movie';
import { createPortal } from "react-dom";
import { useEffect } from "react";
interface MovieModalProps {
  movie: Movie;
  onClose: () => void
}

const MovieModal = ({ movie, onClose}: MovieModalProps) => {
    useEffect(() => {
  document.body.style.overflow = "hidden";
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") onClose();
  };
  window.addEventListener("keydown", handleKeyDown);
  return () => {
    document.body.style.overflow = "";
    window.removeEventListener("keydown", handleKeyDown);
  };
}, [onClose]);
    return createPortal (
        <div onClick={onClose} className={css.backdrop} role="dialog" aria-modal="true">
  <div className={css.modal} onClick={(e) => e.stopPropagation()}>
    <button onClick={onClose} className={css.closeButton} aria-label="Close modal">
      &times;
    </button>
    <img
      src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
      alt={movie.title}
      className={css.image}
    />
    <div className={css.content}>
      <h2>{movie.title}</h2>
      <p>{movie.overview}</p>
      <p>
        <strong>Release Date:</strong> {movie.release_date}
      </p>
      <p>
        <strong>Rating:</strong> {movie.vote_average}/10
      </p>
    </div>
  </div>
</div>,
        document.body
    )
}

export default MovieModal;