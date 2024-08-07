'use client'

import { FormEvent, useState } from "react";

export function ManualStopForm(props: { onSubmit: (stopId: string) => void }) {

    const [stopInputValue, setStopInputValue] = useState<string>('');

    const formPlaceholder = 'Enter a stop number';

    const handleFormSubmit = (event : React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        props.onSubmit(stopInputValue);
    }

    const handleInputChange = (event: React.FormEvent<HTMLInputElement>) => {
        setStopInputValue(event.currentTarget.value);
    }

    return (
        <form onSubmit={handleFormSubmit}>
            <input
                type="text"
                className="form-input"
                placeholder={formPlaceholder}
                onChange={handleInputChange}
                value={stopInputValue}
            />
            <button type="submit" />
        </form>
    )

}