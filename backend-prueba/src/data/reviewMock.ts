let reviewMockList = [
  {
    _id: "1",
    nombre: "Juana",
    comentario: "Muy buena casa",
  },
  {
    _id: "2",
    nombre: "Juana",
    comentario: "Muy buena casa",
  },
  {
    _id: "3",
    nombre: "Juana",
    comentario: "Muy buena casa",
  },
];

export const insertReview = (review: any) => {
  const newReviewId = String(reviewMockList.length + 1);

  const newReview = {
    _id: newReviewId, 
    ...review,        
  };

  reviewMockList = [...reviewMockList, newReview];
  
  return newReview;
};