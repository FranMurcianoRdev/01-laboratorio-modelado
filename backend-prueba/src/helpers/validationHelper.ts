export const isValidReview = (review: { name: string; comment: string }): boolean => {
  // Función auxiliar para verificar si una cadena no está vacía ni contiene solo espacios
  const isNotEmpty = (str: string) => str.trim().length > 0;

  // Validar que name y comment no sean cadenas vacías ni cadenas que contengan solo espacios
  return isNotEmpty(review.name) && isNotEmpty(review.comment);
};


