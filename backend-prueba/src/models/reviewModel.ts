export interface Review {
  _id: string;
  date: {
    $date: string; // MongoDB almacena las fechas dentro de un objeto $date
  };
  listing_id: string;
  reviewer_id: string;
  reviewer_name: string; // Nombre del revisor
  comments: string;      // Comentarios de la reseña
}
