
import React from 'react';
import TheoremProver from '@/components/TheoremProver';
import { theorems } from '@/data/theorems';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const InverseProductTheorem = () => {
  // Get the second theorem (index 1) which is our inverse product theorem
  const inverseTheorem = theorems[1];
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-mathBlue-100">
      <nav className="bg-white shadow-sm py-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl md:text-2xl font-bold text-mathBlue-600">Theorem Tiles</h1>
          <Link to="/">
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>
      </nav>
      
      <main className="container mx-auto py-6">
        <div className="bg-white rounded-xl shadow-sm p-5 mb-6">
          <h2 className="text-lg font-medium mb-2">Proving the Multiplicative Inverse Product</h2>
          <p className="text-gray-600 mb-4">
            This theorem shows that when we multiply a product by the inverses of its factors, 
            the result is 1. This is an important property in abstract algebra and group theory.
          </p>
          <div className="text-sm text-gray-500">
            <p>Current challenge: <span className="font-medium">Prove that a×b×(a^-1)×(b^-1) = 1</span></p>
          </div>
        </div>
        
        <TheoremProver theorem={inverseTheorem} />
      </main>
    </div>
  );
};

export default InverseProductTheorem;
