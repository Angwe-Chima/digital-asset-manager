import React from 'react';
import './Card.css';

const Card = ({
  children,
  className = '',
  hover = false,
  onClick,
  padding = 'medium',
}) => {
  const cardClasses = `
    card
    card-padding-${padding}
    ${hover ? 'card-hover' : ''}
    ${onClick ? 'card-clickable' : ''}
    ${className}
  `.trim();

  return (
    <div className={cardClasses} onClick={onClick}>
      {children}
    </div>
  );
};

export default Card;