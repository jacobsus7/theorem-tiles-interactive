
import React from 'react';
import { Theorem } from '../types/theorem';

interface TheoremHeaderProps {
  theorem: Theorem;
}

const TheoremHeader: React.FC<TheoremHeaderProps> = ({ theorem }) => {
  return (
    <div className="mb-6 text-center px-4 animate-slide-up">
      <h1 className="text-2xl font-bold text-mathBlue-600 mb-2">{theorem.title}</h1>
      <div className="flex justify-center items-center gap-3 math-expression">
        <div className="px-3 py-1 bg-mathBlue-100 rounded-lg">
          {theorem.initialExpression}
        </div>
        <span>=</span>
        <div className="px-3 py-1 bg-mathBlue-100 rounded-lg">
          {theorem.targetExpression}
        </div>
      </div>
    </div>
  );
};

export default TheoremHeader;
