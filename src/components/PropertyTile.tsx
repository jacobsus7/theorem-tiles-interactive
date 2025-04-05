
import React, { useRef } from 'react';
import { useDrag } from 'react-dnd';
import { Property } from '../types/theorem';
import { Card } from '@/components/ui/card';

interface PropertyTileProps {
  property: Property;
  onApplyProperty: (propertyId: string) => void;
}

const PropertyTile: React.FC<PropertyTileProps> = ({ property, onApplyProperty }) => {
  const ref = useRef<HTMLDivElement>(null);
  
  const [{ isDragging }, drag] = useDrag({
    type: 'PROPERTY',
    item: { id: property.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  // Connect the drag ref to the DOM element
  drag(ref);

  // Add click handler as alternative to drag-and-drop
  const handleClick = () => {
    onApplyProperty(property.id);
  };

  return (
    <Card
      ref={ref}
      className={`property-tile cursor-grab p-3 ${
        isDragging ? 'opacity-50' : 'opacity-100'
      } hover:bg-gray-50 transition-colors`}
      style={{ touchAction: 'none' }}
      onClick={handleClick}
    >
      <div className="font-medium text-mathBlue-600">{property.name}</div>
      <div className="text-gray-600 text-sm">{property.description}</div>
    </Card>
  );
};

export default PropertyTile;
