import { AlertCircle } from 'lucide-react';
import type React from 'react';

import { Alert, AlertTitle } from '@/components/alert';

export const ErrorMessage: React.FC<{ error: string }> = ({ error }) => (
  <Alert variant="destructive">
    <AlertCircle className="h-4 w-4" />
    <AlertTitle>{error}</AlertTitle>
  </Alert>
);
