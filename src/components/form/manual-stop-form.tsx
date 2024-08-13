'use client';

import { useRef, useState } from 'react';

export function ManualStopForm(props: { onSubmit: (stopId: string) => void }) {
    const [stopInputValue, setStopInputValue] = useState<string>('');
    const inputRef = useRef<HTMLInputElement>(null);

    const formPlaceholder = 'Enter a stop number';

    const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (stopInputValue) {
            props.onSubmit(stopInputValue);
            setStopInputValue('');
        } else if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    const handleInputChange = (event: React.FormEvent<HTMLInputElement>) => {
        setStopInputValue(event.currentTarget.value);
    };

    return (
        <form onSubmit={handleFormSubmit} className="flex space-x-4">
            <input
                ref={inputRef}
                type="text"
                className="form-input"
                placeholder={formPlaceholder}
                onChange={handleInputChange}
                value={stopInputValue}
            />
            <button
                type="submit"
                className="btn bg-slate-200 hover:bg-slate-300"
            >
                Add stop
            </button>
        </form>
    );
}
