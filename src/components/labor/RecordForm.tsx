
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, CalendarPlus } from 'lucide-react';
import { format } from 'date-fns';

// Sample data - in a real app this would come from your database
const SAMPLE_LABORERS = [
  { id: '1', name: 'Amit Kumar', wageRate: 350 },
  { id: '2', name: 'Priya Singh', wageRate: 330 },
  { id: '3', name: 'Rajesh Verma', wageRate: 380 },
  { id: '4', name: 'Sunita Devi', wageRate: 320 },
];

interface RecordFormProps {
  onCancel: () => void;
  record?: {
    id: string;
    laborerId: string;
    date: Date;
    season: string;
    month: string;
    hours: number;
    task: string;
    wage: number;
    totalPaid: number;
    notes?: string;
  };
}

const RecordForm = ({ onCancel, record }: RecordFormProps) => {
  const { toast } = useToast();
  const today = new Date();
  
  const [formData, setFormData] = useState({
    laborerId: record?.laborerId || '',
    date: record?.date ? format(record.date, 'yyyy-MM-dd') : format(today, 'yyyy-MM-dd'),
    season: record?.season || determineCurrentSeason(),
    month: record?.month || format(today, 'MMMM'),
    hours: record?.hours?.toString() || '8',
    task: record?.task || '',
    wage: record?.wage?.toString() || '',
    totalPaid: record?.totalPaid?.toString() || '',
    notes: record?.notes || '',
  });
  
  function determineCurrentSeason() {
    const month = today.getMonth() + 1; // 1-12
    if (month >= 6 && month <= 10) return 'Kharif';
    if (month >= 11 || month <= 3) return 'Rabi';
    return 'Zaid';
  }
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Automatically calculate total paid amount if hours or wage changes
    if (name === 'hours' || name === 'wage') {
      const hours = name === 'hours' ? parseFloat(value) : parseFloat(formData.hours);
      const wage = name === 'wage' ? parseFloat(value) : parseFloat(formData.wage);
      
      if (!isNaN(hours) && !isNaN(wage)) {
        setFormData(prev => ({ ...prev, totalPaid: (hours * wage).toString() }));
      }
    }
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Set default wage when selecting a laborer
    if (name === 'laborerId') {
      const laborer = SAMPLE_LABORERS.find(l => l.id === value);
      if (laborer) {
        setFormData(prev => ({ 
          ...prev, 
          wage: laborer.wageRate.toString(),
          totalPaid: (parseFloat(prev.hours) * laborer.wageRate).toString()
        }));
      }
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.laborerId || !formData.date || !formData.task || !formData.hours || !formData.wage) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    
    // In a real application, you would save this data to your database
    console.log("Saving labor record:", formData);
    
    toast({
      title: record ? "Record Updated" : "Record Added",
      description: `Labor record for ${formData.date} has been ${record ? 'updated' : 'added'} successfully.`,
    });
    
    onCancel(); // Return to list view
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Button variant="ghost" onClick={onCancel} className="mr-2">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back
        </Button>
        <h3 className="text-lg font-medium">{record ? 'Edit Labor Record' : 'Add New Labor Record'}</h3>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="laborerId">Select Laborer <span className="text-red-500">*</span></Label>
            <Select 
              value={formData.laborerId} 
              onValueChange={(value) => handleSelectChange('laborerId', value)}
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
          
          <div className="space-y-2">
            <Label htmlFor="date">Date <span className="text-red-500">*</span></Label>
            <Input
              id="date"
              name="date"
              type="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="season">Season <span className="text-red-500">*</span></Label>
            <Select 
              value={formData.season} 
              onValueChange={(value) => handleSelectChange('season', value)}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select season" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Kharif">Kharif (June-October)</SelectItem>
                <SelectItem value="Rabi">Rabi (November-March)</SelectItem>
                <SelectItem value="Zaid">Zaid (April-May)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="month">Month <span className="text-red-500">*</span></Label>
            <Select 
              value={formData.month} 
              onValueChange={(value) => handleSelectChange('month', value)}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select month" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="January">January</SelectItem>
                <SelectItem value="February">February</SelectItem>
                <SelectItem value="March">March</SelectItem>
                <SelectItem value="April">April</SelectItem>
                <SelectItem value="May">May</SelectItem>
                <SelectItem value="June">June</SelectItem>
                <SelectItem value="July">July</SelectItem>
                <SelectItem value="August">August</SelectItem>
                <SelectItem value="September">September</SelectItem>
                <SelectItem value="October">October</SelectItem>
                <SelectItem value="November">November</SelectItem>
                <SelectItem value="December">December</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="task">Task Performed <span className="text-red-500">*</span></Label>
            <Input
              id="task"
              name="task"
              value={formData.task}
              onChange={handleChange}
              placeholder="e.g., Harvesting Rice"
              required
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="hours">Hours Worked <span className="text-red-500">*</span></Label>
            <Input
              id="hours"
              name="hours"
              type="number"
              step="0.5"
              min="0"
              value={formData.hours}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="wage">Hourly Wage (₹) <span className="text-red-500">*</span></Label>
            <Input
              id="wage"
              name="wage"
              type="number"
              min="0"
              value={formData.wage}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="totalPaid">Total Amount Paid (₹) <span className="text-red-500">*</span></Label>
            <Input
              id="totalPaid"
              name="totalPaid"
              type="number"
              min="0"
              value={formData.totalPaid}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="notes">Additional Notes</Label>
          <Textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Any additional information about the work or payment"
            rows={3}
          />
        </div>
        
        <div className="flex justify-end gap-2 pt-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">
            <CalendarPlus className="mr-2 h-4 w-4" />
            {record ? 'Update Record' : 'Add Record'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default RecordForm;
