import * as React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
    Command,
    CommandGroup,
    CommandInput,
    CommandItem,
} from '@/components/ui/command';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Controller, UseControllerProps, useFormContext } from 'react-hook-form';
import { Check, ChevronsUpDown, Plus } from 'lucide-react';

export type ComboboxOptions = {
    value: string;
    label: string;
};

type Mode = 'single' | 'multiple';

interface ComboboxProps {
    mode?: Mode;
    options: ComboboxOptions[] | [];
    selected: string | string[];
    className?: string;
    label?: string;
    onChange?: (event: string | string[]) => void;
    onCreate?: (value: string) => void;
}

export const CreatableSelect = ({ options, selected, className, label, mode = 'single', onChange, onCreate }: ComboboxProps) => {
    const [open, setOpen] = React.useState(false);
    const [query, setQuery] = React.useState<string>('');
    const [isCreating, setIsCreating] = React.useState(false);
    const [newItemValue, setNewItemValue] = React.useState<string>('');

    const handleCreate = () => {
        if (onCreate && newItemValue.trim()) {
            onCreate(newItemValue);
            setNewItemValue('');
            setIsCreating(false);
        }
    };

    return (
        <div className={cn('block', className)}>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        type='button'
                        variant='outline'
                        role='combobox'
                        aria-expanded={open}
                        className='w-full justify-between'
                    >
                        {selected && selected.length > 0 ? (
                            <div className='relative mr-auto flex flex-grow flex-wrap items-center overflow-hidden'>
                                <span>
                                    {mode === 'multiple' && Array.isArray(selected)
                                        ? selected
                                            .map(
                                                (selectedValue: string) =>
                                                    options.find((item) => item.value === selectedValue)?.label
                                            )
                                            .join(', ')
                                        : mode === 'single' && options.find((item) => item.value === selected)?.label}
                                </span>
                            </div>
                        ) : (
                            `Select ${label ?? 'Item'}`
                        )}
                        <ChevronsUpDown size={16} className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className='w-72 max-w-sm p-0'>
                    <Command>
                        <CommandInput
                            placeholder={`Search ${label ?? 'Item'}`}
                            value={query}
                            onValueChange={(value: string) => setQuery(value)}
                        />
                        <ScrollArea onWheel={(e) => {
                            e.stopPropagation();
                        }}>
                            <div className='max-h-60'>
                                <CommandGroup>
                                    {options.map((option) => (
                                        <CommandItem
                                            key={option.label}
                                            value={option.label}
                                            onSelect={() => {
                                                if (onChange) {
                                                    if (mode === 'multiple' && Array.isArray(selected)) {
                                                        onChange(
                                                            selected.includes(option.value)
                                                                ? selected.filter(
                                                                    (item) => item !== option.value
                                                                )
                                                                : [...selected, option.value]
                                                        );
                                                    } else {
                                                        onChange(option.value);
                                                    }
                                                }
                                            }}
                                        >
                                            <Check size={16} 
                                                className={cn(
                                                    'mr-2 h-4 w-4',
                                                    selected.includes(option.value)
                                                        ? 'opacity-100'
                                                        : 'opacity-0'
                                                )}
                                            />
                                            {option.label}
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </div>
                        </ScrollArea>
                        {isCreating ? (
                            <div className="p-2 border-t">
                                <Input
                                    value={newItemValue}
                                    onChange={(e) => setNewItemValue(e.target.value)}
                                    placeholder="Enter new item name"
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') handleCreate();
                                    }}
                                />
                                <Button variant="outline" className="w-full mt-2" onClick={handleCreate}>
                                    Add
                                </Button>
                            </div>
                        ) : (
                            <Button
                                variant="outline"
                                className="mt-2 m-1 "
                                onClick={() => setIsCreating(true)}
                            >
                                {`Add ${label ?? 'Item'}`}
                                    <Plus size={16} className="ml-2 h-4 w-4" />
                            </Button>
                        )}
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    );
};

export interface FormCreatableSelectProps extends Omit<ComboboxProps, 'onChange' | 'selected'> {
    name: string
    label: string,
    rules?: UseControllerProps['rules']
    controllerProps?: Partial<Omit<UseControllerProps, 'name' | 'rules' | 'control'>>
}

export const FormCreatableSelect = ({
    name,
    rules,
    options,
    mode = 'single',
    label,
    onCreate,
    className,
}: FormCreatableSelectProps) => {
    const { control } = useFormContext();
    const [open, setOpen] = React.useState(false);
    const [query, setQuery] = React.useState<string>('');
    const [isCreating, setIsCreating] = React.useState(false);
    const [newItemValue, setNewItemValue] = React.useState<string>('');

    const handleCreate = () => {
        if (onCreate && newItemValue.trim()) {
            onCreate(newItemValue);
            setNewItemValue('');
            setIsCreating(false);
        }
    };

    return (
        <Controller
            name={name}
            control={control}
            rules={rules}
            render={({ field: { onChange, value } }) => (
                <div className={cn('block', className)}>
                    <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                            <Button
                                type="button"
                                variant="outline"
                                role="combobox"
                                aria-expanded={open}
                                className="w-full justify-between"
                            >
                                {value && value.length > 0 ? (
                                    <div className="relative mr-auto flex flex-grow flex-wrap items-center overflow-hidden">
                                        <span>
                                            {mode === 'multiple' && Array.isArray(value)
                                                ? value
                                                    .map(
                                                        (selectedValue: string) =>
                                                            options.find((item) => item.value === selectedValue)?.label
                                                    )
                                                    .join(', ')
                                                : mode === 'single' && options.find((item) => item.value === value)?.label}
                                        </span>
                                    </div>
                                ) : (
                                    `Select ${label ?? 'Item'}`
                                )}
                                <ChevronsUpDown size={16} className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-72 max-w-sm p-0">
                            <Command>
                                <CommandInput
                                    placeholder={`Search ${label ?? 'Item'}`}
                                    value={query}
                                    onValueChange={(value: string) => setQuery(value)}
                                />
                                <ScrollArea onWheel={(e) => e.stopPropagation()}>
                                    <div className="max-h-60">
                                        <CommandGroup>
                                            {options.map((option) => (
                                                <CommandItem
                                                    key={option.label}
                                                    value={option.label}
                                                    onSelect={() => {
                                                        if (mode === 'multiple' && Array.isArray(value)) {
                                                            const newValue = value.includes(option.value)
                                                                ? value.filter((item) => item !== option.value)
                                                                : [...value, option.value];
                                                            onChange(newValue);
                                                        } else {
                                                            onChange(option.value);
                                                        }
                                                    }}
                                                >
                                                    <Check size={16} 
                                                        className={cn(
                                                            'mr-2 h-4 w-4',
                                                            value?.includes(option.value) ? 'opacity-100' : 'opacity-0'
                                                        )}
                                                    />
                                                    {option.label}
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    </div>
                                </ScrollArea>
                                {isCreating ? (
                                    <div className="p-2 border-t">
                                        <Input
                                            value={newItemValue}
                                            onChange={(e) => setNewItemValue(e.target.value)}
                                            placeholder="Enter new item name"
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter') handleCreate();
                                            }}
                                        />
                                        <Button
                                            variant="outline"
                                            className="w-full mt-2"
                                            onClick={handleCreate}
                                        >
                                            Add
                                        </Button>
                                    </div>
                                ) : (
                                    <Button
                                        variant="outline"
                                        className="mt-2 m-1"
                                        onClick={() => setIsCreating(true)}
                                    >
                                        {`Add ${label ?? 'Item'}`}
                                            <Plus size={16} className="ml-2 h-4 w-4" />
                                    </Button>
                                )}
                            </Command>
                        </PopoverContent>
                    </Popover>
                </div>
            )}
        />
    );
};