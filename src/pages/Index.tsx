
import React from 'react';
import TheoremProver from '@/components/TheoremProver';
import { theorems } from '@/data/theorems';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-mathBlue-100">
      <nav className="bg-white shadow-sm py-4">
        <div className="container mx-auto flex justify-center">
          <h1 className="text-xl md:text-2xl font-bold text-mathBlue-600">Theorem Tiles</h1>
        </div>
      </nav>
      
      <main className="container mx-auto py-6">
        <div className="bg-white rounded-xl shadow-sm p-5 mb-6">
          <h2 className="text-lg font-medium mb-2">Welcome to Theorem Tiles</h2>
          <p className="text-gray-600 mb-4">
            Click properties from the list below to apply them to the expression.
            Continue until you've proven the theorem.
          </p>
          
          <div className="grid gap-4 md:grid-cols-3 mt-6">
            <Link to="/" className="bg-mathBlue-50 rounded-lg p-4 hover:bg-mathBlue-100 transition-colors">
              <h3 className="font-medium mb-2">Double Negation</h3>
              <p className="text-sm text-gray-600">Prove that -(-1) = 1</p>
            </Link>
            
            <Link to="/inverse-product" className="bg-mathBlue-50 rounded-lg p-4 hover:bg-mathBlue-100 transition-colors">
              <h3 className="font-medium mb-2">Multiplicative Inverse Product</h3>
              <p className="text-sm text-gray-600">Prove that a×b×(a^-1)×(b^-1) = 1</p>
            </Link>
            
            <Link to="/triangle-inequality" className="bg-mathBlue-50 rounded-lg p-4 hover:bg-mathBlue-100 transition-colors">
              <h3 className="font-medium mb-2">Triangle Inequality</h3>
              <p className="text-sm text-gray-600">Prove that |a| + |b| ≥ |a + b|</p>
            </Link>
          </div>
        </div>
        
        <TheoremProver theorem={theorems[0]} />
      </main>
    </div>
  );
};

export default Index;
