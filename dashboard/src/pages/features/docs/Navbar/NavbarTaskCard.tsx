import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { UniqueIdentifier } from '@dnd-kit/core';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Trash2, GripVertical, ChevronRight, ChevronLeft, ChevronUp, ChevronDown } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

export interface NavbarTask {
    id: string;
    columnId: string;
    label: string;
    url: string;
    open_in_new_tab?: boolean;
}

export function NavbarTaskCard({ task, onDelete, handleUpdateTask }: { task: NavbarTask, onDelete: (id: UniqueIdentifier) => void, handleUpdateTask: (id: UniqueIdentifier, task: NavbarTask) => void }) {
    const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
        id: task.id,
        data: { type: "Task", task },
    });

    const style = {
        transition,
        transform: transform ? CSS.Translate.toString(transform) : undefined, // Apply transform only if it exists
        opacity: isDragging ? 0.5 : 1, // Ensure only the dragged task has reduced opacity
        zIndex: isDragging ? 10 : "auto", // Bring the dragged task to the front
    };

    const [isRevealed, setIsRevealed] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const handleChange = (key: string, value: any) => {
        const updatedTask = {
            ...task,
            [key]: value,
        };
        handleUpdateTask(task.id, updatedTask);
    }

    return (
        <div className="relative overflow-hidden" ref={setNodeRef} style={style}>
            {/* Delete Button (Hidden until revealed) */}
            {isRevealed && (
                <Button
                    variant="destructive"
                    size="sm"
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-10 rounded-l-none rounded-r-lg"
                    onClick={() => onDelete(task.id)}
                >
                    <Trash2 className="h-4 w-4" />
                </Button>
            )}

            {/* Task Card */}
            <Card
                className={`relative transition-transform duration-300 ${isRevealed ? "translate-x-[-30px] rounded-r-none" : ""
                    } ${isDragging ? "ring-2 ring-blue-500" : ""}`} // Highlight the dragged task
            >
                <CardHeader className="py-1 px-2 flex flex-row items-center justify-between border-b-1">
                    <div className='flex flex-row gap-2 items-center'>
                        <Button
                            variant="link"
                            size="icon"
                            className="text-primary/80 h-6 w-6 m-0 mr-1"
                            onClick={() => setIsEditing(!isEditing)}
                        >
                            {isEditing ? (
                                <ChevronUp className="h-4 w-4" />
                            ) : (
                                <ChevronDown className="h-4 w-4" />
                            )}
                        </Button>
                        <span className="text-sm text-primary/80 pl-2">{task.label}</span>
                    </div>
                    <div className="flex items-center !my-0 gap-2">
                        {/* Drag Handle */}
                        <div className="flex items-center gap-0">
                            <Button
                                variant="ghost"
                                size="icon"
                                {...attributes}
                                {...listeners}
                                className="text-primary/80 cursor-grab h-6 w-6 m-0"
                            >
                                <GripVertical className="h-4 w-4" />
                            </Button>
                            {/* Left Arrow Button (Reveals Delete Button) */}
                            <Button
                                variant="link"
                                size="icon"
                                className="text-primary/80 h-6 w-6 m-0 mr-1"
                                onClick={() => setIsRevealed(!isRevealed)}
                            >
                                {isRevealed ? (
                                    <ChevronRight className="h-4 w-4" />
                                ) : (
                                    <ChevronLeft className="h-4 w-4" />
                                )}
                            </Button>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className={`flex flex-col gap-2 m-2 p-4 rounded-lg h-full overflow-y-auto bg-zinc-100 dark:bg-white/[0.04] ${isEditing ? "block" : "hidden"}`}>
                    <div className='flex flex-col gap-2'>
                        <div className='flex flex-col gap-1'>
                            <Label htmlFor={"label"} className='text-xs'>
                                Label
                            </Label>
                            <Input
                                id="label"
                                placeholder='Label'
                                className='h-8'
                                value={task?.label}
                                onChange={(e) => handleChange('label', e.target.value)}
                            />
                        </div>

                        <div className='flex flex-col gap-2'>
                            <Label htmlFor={"url"} className='text-xs'>
                                URL
                            </Label>
                            <Input
                                id="url"
                                placeholder='URL'
                                className='h-8'
                                value={task?.url}
                                onChange={(e) => handleChange('url', e.target.value)}
                            />
                        </div>
                        <div className='flex flex-row justify-between items-center'>
                            <div className='flex flex-row gap-2'>
                                <Checkbox checked={task?.open_in_new_tab ? true : false} onCheckedChange={(checked) => handleChange('open_in_new_tab', checked)} className='h-4 w-4' id="open_in_new_tab" />
                                <Label htmlFor={"open_in_new_tab"} className='text-xs'>
                                    Open in new tab
                                </Label>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}