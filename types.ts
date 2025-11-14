// FIX: Import React to provide types for React.FC and resolve the 'Cannot find namespace' error.
import React from 'react';

export interface Tool {
  id: string;
  name: string;
  description: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  promptPlaceholder: string;
  requiresImage?: boolean;
}
