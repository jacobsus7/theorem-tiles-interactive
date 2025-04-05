
import React from 'react';
import { Property } from '../types/theorem';
import { Card } from '@/components/ui/card';

interface PropertyTileProps {
  property: Property;
  onApplyProperty: (propertyId: string) => void;
}

const PropertyTile: React.FC<PropertyTileProps> = ({ property, onApplyProperty }) => {
  const handleClick = () => {
    onApplyProperty(property.id);
  };

  return (
    <Card
      className="property-tile p-3 hover:bg-mathBlue-50 transition-colors cursor-pointer active:scale-95 transform"
      onClick={handleClick}
    >
      <div className="font-medium text-mathBlue-600">{property.name}</div>
      <div className="text-gray-600 text-sm">{property.description}</div>
    </Card>
  );
};

export default PropertyTile;
