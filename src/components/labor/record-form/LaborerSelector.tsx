
import React from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SAMPLE_LABORERS } from '../utils/formUtils';

interface LaborerSelectorProps {
  laborerId: string;
  onSelectChange: (name: string, value: string) => void;
}

const LaborerSelector = ({ laborerId, onSelectChange }: LaborerSelectorProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="laborerId">Select Laborer <span className="text-red-500">*</span></Label>
      <Select 
        value={laborerId} 
        onValueChange={(value) => onSelectChange('laborerId', value)}
        required
      >
        <SelectTrigger>
          <SelectValue placeholder="Select a laborer" />
        </SelectTrigger>
        <SelectContent>
          {SAMPLE_LABORERS.map(laborer => (
            <SelectItem key={laborer.id} value={laborer.id}>
              {laborer.name} (₹{laborer.wageRate}/day)
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default LaborerSelector;
