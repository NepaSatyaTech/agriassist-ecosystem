
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { UserPlus, Search, Edit, Trash2, Phone, UserCheck } from 'lucide-react';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

// Sample data - in a real app this would come from your database
const SAMPLE_LABORERS = [
  { id: '1', name: 'Amit Kumar', phone: '9876543210', specialization: 'Harvesting', workingDays: 'Monday to Saturday', wageRate: 350 },
  { id: '2', name: 'Priya Singh', phone: '9876543211', specialization: 'Sowing', workingDays: 'Monday to Friday', wageRate: 330 },
  { id: '3', name: 'Rajesh Verma', phone: '9876543212', specialization: 'Irrigation', workingDays: 'All Days', wageRate: 380 },
  { id: '4', name: 'Sunita Devi', phone: '9876543213', specialization: 'General', workingDays: 'Monday, Wednesday, Friday', wageRate: 320 },
];

interface LaborersListProps {
  onAddNew: () => void;
}

const LaborersList = ({ onAddNew }: LaborersListProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [laborers, setLaborers] = useState(SAMPLE_LABORERS);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [laborerToDelete, setLaborerToDelete] = useState<string | null>(null);
  
  const filteredLaborers = laborers.filter(laborer => 
    laborer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    laborer.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
    laborer.phone.includes(searchTerm)
  );
  
  const handleDelete = (id: string) => {
    setLaborerToDelete(id);
    setDeleteDialogOpen(true);
  };
  
  const confirmDelete = () => {
    if (laborerToDelete) {
      setLaborers(laborers.filter(l => l.id !== laborerToDelete));
      setLaborerToDelete(null);
      setDeleteDialogOpen(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="relative w-full sm:w-auto flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search laborers..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button onClick={onAddNew} className="w-full sm:w-auto">
          <UserPlus className="mr-2 h-4 w-4" /> Add New Laborer
        </Button>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Specialization</TableHead>
              <TableHead>Working Days</TableHead>
              <TableHead>Daily Wage (₹)</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLaborers.length > 0 ? (
              filteredLaborers.map((laborer) => (
                <TableRow key={laborer.id}>
                  <TableCell className="font-medium">{laborer.name}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Phone className="h-3 w-3" /> {laborer.phone}
                    </div>
                  </TableCell>
                  <TableCell>{laborer.specialization}</TableCell>
                  <TableCell>{laborer.workingDays}</TableCell>
                  <TableCell>₹{laborer.wageRate}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(laborer.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No laborers found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this laborer's record. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default LaborersList;
