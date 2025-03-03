
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { UserCheck, ArrowLeft } from 'lucide-react';

interface LaborerFormProps {
  onCancel: () => void;
  laborer?: {
    id: string;
    name: string;
    phone: string;
    specialization: string;
    workingDays: string;
    wageRate: number;
    address?: string;
    notes?: string;
  };
}

const LaborerForm = ({ onCancel, laborer }: LaborerFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: laborer?.name || '',
    phone: laborer?.phone || '',
    specialization: laborer?.specialization || '',
    workingDays: laborer?.workingDays || '',
    wageRate: laborer?.wageRate?.toString() || '',
    address: laborer?.address || '',
    notes: laborer?.notes || '',
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name || !formData.phone || !formData.wageRate) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    
    // In a real application, you would save this data to your database
    console.log("Saving laborer data:", formData);
    
    toast({
      title: laborer ? "Laborer Updated" : "Laborer Added",
      description: `${formData.name} has been ${laborer ? 'updated' : 'added'} successfully.`,
    });
    
    onCancel(); // Return to list view
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Button variant="ghost" onClick={onCancel} className="mr-2">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back
        </Button>
        <h3 className="text-lg font-medium">{laborer ? 'Edit Laborer' : 'Add New Laborer'}</h3>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name <span className="text-red-500">*</span></Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter laborer's full name"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number <span className="text-red-500">*</span></Label>
            <Input
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter contact number"
              required
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="specialization">Specialization</Label>
            <Select 
              value={formData.specialization} 
              onValueChange={(value) => handleSelectChange('specialization', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select specialization" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="General">General</SelectItem>
                <SelectItem value="Sowing">Sowing</SelectItem>
                <SelectItem value="Harvesting">Harvesting</SelectItem>
                <SelectItem value="Irrigation">Irrigation</SelectItem>
                <SelectItem value="Pesticide">Pesticide Application</SelectItem>
                <SelectItem value="Fertilizer">Fertilizer Application</SelectItem>
                <SelectItem value="Machine Operator">Machine Operator</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="workingDays">Working Days</Label>
            <Input
              id="workingDays"
              name="workingDays"
              value={formData.workingDays}
              onChange={handleChange}
              placeholder="e.g., Monday to Friday"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="wageRate">Daily Wage Rate (₹) <span className="text-red-500">*</span></Label>
            <Input
              id="wageRate"
              name="wageRate"
              type="number"
              value={formData.wageRate}
              onChange={handleChange}
              placeholder="Enter daily wage rate"
              required
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="address">Address</Label>
          <Input
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter residential address"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="notes">Additional Notes</Label>
          <Textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Any additional information about the laborer"
            rows={3}
          />
        </div>
        
        <div className="flex justify-end gap-2 pt-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">
            <UserCheck className="mr-2 h-4 w-4" />
            {laborer ? 'Update Laborer' : 'Add Laborer'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default LaborerForm;
