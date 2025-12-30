import React from 'react';
import { Link } from 'react-router-dom';

interface CategoryCardProps {
  name: string;
  image: string;
  slug: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ name, image, slug }) => {
  return (
    <Link to={`/categories/${slug}`} className="category-card" data-category={name}>
      <img src={image} alt={name} className="category-img" />
      <h3 className="category-title">{name}</h3>
    </Link>
  );
};

export default CategoryCard;