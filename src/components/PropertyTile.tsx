
import React, { useRef } from 'react';
import { useDrag } from 'react-dnd';
import { Property } from '../types/theorem';
import { Card } from '@/components/ui/card';

interface PropertyTileProps {
  property: Property;
}

const PropertyTile: React.FC<PropertyTileProps> = ({ property }) => {
  const ref = useRef<HTMLDivElement>(null);
  
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'PROPERTY',
    item: { id: property.id, type: 'PROPERTY' },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  // Connect the drag ref to the DOM element
  drag(ref);

  return (
    <Card
      ref={ref}
      className={`property-tile cursor-grab ${
        isDragging ? 'opacity-50' : 'opacity-100'
      }`}
      style={{ touchAction: 'none' }}
    >
      <div className="p-3">
        <div className="font-medium text-mathBlue-600">{property.name}</div>
        <div className="text-gray-600 text-sm">{property.description}</div>
      </div>
    </Card>
  );
};

export default PropertyTile;
