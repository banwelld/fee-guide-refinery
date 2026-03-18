import { useContext } from 'react';
import { FeeGuideContext } from './FeeGuideContext';

export default function useFeeGuide() {
  const context = useContext(FeeGuideContext);
  if (!context) {
    throw new Error('useFeeGuide must be used within a FeeGuideProvider');
  }
  return context;
}
