import SearchIcon from '@/assets/svgs/SearchIcon';
import { cn } from '@/lib/utils';
import Input from '@/shared/UI/Input';
import React from 'react'
interface BoxSearchProps {
    onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
    searachValue: string;
    className?: string,
    placeholder?: string
}
const SearchBox = ({ onSearch, searachValue, className, placeholder }: BoxSearchProps) => {
    return (<div className={cn('w-1/2 py-3 rounded-sm relative', className)}>
        <SearchIcon className='absolute top-1/3 left-2' width={20} height={20} />
        <Input value={searachValue} onChange={onSearch} placeholder={placeholder} className='w-full py-3 ps-8 rounded-sm' />
    </div>)
}
export default SearchBox