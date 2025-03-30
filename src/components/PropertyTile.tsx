
import React from 'react';
import { useDrag } from 'react-dnd';
import { Property } from '../types/theorem';

interface PropertyTileProps {
  property: Property;
}

const PropertyTile: React.FC<PropertyTileProps> = ({ property }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'PROPERTY',
    item: { id: property.id, type: 'PROPERTY' },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`property-tile ${
        isDragging ? 'opacity-50' : 'opacity-100'
      }`}
      style={{ touchAction: 'none' }}
    >
      <div className="font-medium text-mathBlue-600">{property.name}</div>
      <div className="text-gray-600 text-sm">{property.description}</div>
    </div>
  );
};

export default PropertyTile;
