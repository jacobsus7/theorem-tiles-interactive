
import React from 'react';
import PropertyTile from './PropertyTile';
import { Property } from '../types/theorem';

interface PropertiesListProps {
  properties: Property[];
  onApplyProperty: (propertyId: string) => void;
}

const PropertiesList: React.FC<PropertiesListProps> = ({ properties, onApplyProperty }) => {
  return (
    <div className="mt-6">
      <h2 className="text-lg font-medium mb-3">Available Properties</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {properties.map((property) => (
          <PropertyTile 
            key={property.id} 
            property={property} 
            onApplyProperty={onApplyProperty}
          />
        ))}
      </div>
    </div>
  );
};

export default PropertiesList;
