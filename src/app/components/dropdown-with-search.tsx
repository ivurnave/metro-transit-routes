
import {useEffect, useState} from "react";

export interface DropdownWithSearchProps {
    options: DropdownItem[];
    placeholder: string;
    onSelected: (selected: DropdownItem) => void;
}
export interface DropdownItem {
    value: string;
    label: string;
}

export function DropdownWithSearch(props: DropdownWithSearchProps) {

    const [options, setOptions] = useState<DropdownItem[]>(props.options);
    const [inputValue, setInputValue] = useState<string>('');
    const [isOpen, setIsOpen] = useState(false);
    const optionsCopy = props.options;

    useEffect( () => {
        setOptions(props.options);
    }, [props.options] )


    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const filteredOptions = optionsCopy.filter((option) => option.label.toLowerCase().includes(event.target.value.toLowerCase()));
        setOptions(filteredOptions);
        setInputValue(event.currentTarget.value);
    }

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Escape') {
            setIsOpen(false);
        } else {
            setIsOpen(true);
        }
    }

    const handleSelection = (option: DropdownItem) => {
        props.onSelected(option);
        setInputValue(option.label);
        setIsOpen(false);
    }

    const handleOpenDropdown = (_event: React.FocusEvent) => {
        setIsOpen(true);
    }

    const handleCloseDropdown = (event: React.FocusEvent) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setIsOpen(false);  
        }
      }
    

    return (
        <div className="flex flex-col relative w-full" onBlur={handleCloseDropdown}>
            <input type="text" className="form-input" placeholder={props.placeholder}
                onFocus={handleOpenDropdown}
                onKeyDown={handleKeyDown}
                onChange={handleSearch}
                value={inputValue}
                />
            { isOpen
                ? <div className="absolute flex flex-col top-12 w-full bg-white z-20 max-h-96 overflow-auto shadow-lg rounded p-2">
                    {
                        options.map((option) => <button
                            className="btn p-2 shadow-transparent hover:bg-slate-200 focus:bg-slate-200"
                            key={option.value}
                            onClick={() => {handleSelection(option)}} >
                            {option.label}
                        </button>)
                    }
                    {
                        options.length === 0 ? <button className="btn p-2" disabled>No results found</button> : <></>
                    }
                </div> : <></>
            }

        </div>
    );
}