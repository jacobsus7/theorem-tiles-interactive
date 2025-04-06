
import React from 'react';
import TheoremProver from '@/components/TheoremProver';
import { theorems } from '@/data/theorems';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const TriangleInequality = () => {
  // Get the third theorem (index 2) which is our triangle inequality theorem
  const triangleTheorem = theorems[2];
  
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
          <h2 className="text-lg font-medium mb-2">Proving the Triangle Inequality</h2>
          <p className="text-gray-600 mb-4">
            The triangle inequality is a fundamental theorem in analysis and geometry. It states that 
            for any two real numbers a and b, the sum of their absolute values is always greater than 
            or equal to the absolute value of their sum.
          </p>
          <div className="text-sm text-gray-500">
            <p>Current challenge: <span className="font-medium">Prove that |a| + |b| ≥ |a + b|</span></p>
          </div>
        </div>
        
        <TheoremProver theorem={triangleTheorem} />
      </main>
    </div>
  );
};

export default TriangleInequality;
