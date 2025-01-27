import { Button } from '@/components/ui/button'
import { Pen, Trash } from 'lucide-react'
import React from 'react'

function ActionButtons() {
    return (
        <div className="flex gap-4 items-center ">
            <Button
                variant={'outline'}
                className="border-slate-400 hover:bg-slate-500">
                <Pen size={10} />
                <p className="text-xs">Edit</p>
            </Button>
            <Button variant={'outline'} className="border-red-700 text-red-700 hover:bg-red-500">
                <Trash size={10} />
                <p className="text-xs">Delete</p>
            </Button>
        </div>
    )
}

export default ActionButtons