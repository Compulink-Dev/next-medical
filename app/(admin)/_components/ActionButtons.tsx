import { Button } from '@/components/ui/button';
import { Trash } from 'lucide-react';
import React from 'react';
import { useRouter } from 'next/navigation';
import { deleteClinic } from '@/lib/actions/clinic.actions';

interface ActionButtonsProps {
    clinicId: string;
    children: React.ReactNode
}

function ActionButtons({ clinicId, children }: ActionButtonsProps) {
    const router = useRouter();

    const handleDelete = async () => {
        const confirmed = confirm('Are you sure you want to delete this clinic?');
        if (!confirmed) return;

        try {
            const success = await deleteClinic(clinicId);
            if (success) {
                alert('Clinic deleted successfully');
                router.refresh(); // Refresh the page or table to show updated data
            } else {
                alert('Failed to delete clinic. Please try again.');
            }
        } catch (error) {
            console.error('Error deleting clinic:', error);
        }
    };

    return (
        <div className="flex gap-4 items-center">
            {children}
            <Button
                variant={'outline'}
                className="border-red-700 text-red-700 hover:bg-red-500"
                onClick={handleDelete}
            >
                <Trash size={10} />
                <p className="text-xs">Delete</p>
            </Button>
        </div>
    );
}

export default ActionButtons;
