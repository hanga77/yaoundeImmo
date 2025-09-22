
import React from 'react';
import { useParams } from 'react-router-dom';
import CarouselForm from '../../components/admin/CarouselForm';
import { useData } from '../../DataContext';
import { CarouselSlide } from '../../types';

const CarouselFormPage: React.FC = () => {
  const { slideId } = useParams<{ slideId: string }>();
  const { carouselSlides, addCarouselSlide, updateCarouselSlide } = useData();
  
  const isEditing = Boolean(slideId);
  const slideToEdit = isEditing ? carouselSlides.find(s => s.id === slideId) : null;

  const handleSubmit = (formData: Omit<CarouselSlide, 'id'> | CarouselSlide) => {
    if (isEditing && slideId) {
      updateCarouselSlide({ ...formData, id: slideId });
    } else {
      addCarouselSlide(formData as Omit<CarouselSlide, 'id'>);
    }
  };

  return (
    <div>
        <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-brand-dark font-serif">
                {isEditing ? 'Modifier la diapositive' : 'Ajouter une nouvelle diapositive'}
            </h1>
            <p className="text-gray-600 mt-1">
                {isEditing ? 'Mettez à jour les informations ci-dessous.' : 'Remplissez le formulaire pour ajouter une diapositive au carrousel.'}
            </p>
        </div>
        <CarouselForm onSubmit={handleSubmit} initialData={slideToEdit} />
    </div>
  );
};

export default CarouselFormPage;
