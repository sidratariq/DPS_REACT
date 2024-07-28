import React from 'react';

interface FiltersProps {
    nameFilter: string;
    setNameFilter: React.Dispatch<React.SetStateAction<string>>;
    cityFilter: string;
    setCityFilter: React.Dispatch<React.SetStateAction<string>>;
    highlightOldest: boolean;
    setHighlightOldest: React.Dispatch<React.SetStateAction<boolean>>;
    customers: any[];
}

const Filters: React.FC<FiltersProps> = ({
    nameFilter,
    setNameFilter,
    cityFilter,
    setCityFilter,
    highlightOldest,
    setHighlightOldest,
    customers,
}) => {
    const cities = Array.from(new Set(customers.map(customer => customer.address.city)));

    return (
        <div className="filters-container">
            <input
                className="filter-input"
                type="text"
                placeholder="Filter by name"
                value={nameFilter}
                onChange={(e) => setNameFilter(e.target.value)}
            />
            <select 
                className="filter-select"
                value={cityFilter} 
                onChange={(e) => setCityFilter(e.target.value)}
            >
                <option value="">Select city</option>
                {cities.map(city => (
                    <option key={city} value={city}>
                        {city}
                    </option>
                ))}
            </select>
            <label className="filter-checkbox-label">
                <input
                    className="filter-checkbox"
                    type="checkbox"
                    checked={highlightOldest}
                    onChange={(e) => setHighlightOldest(e.target.checked)}
                />
                Highlight oldest per city
            </label>
        </div>
    );
};

export default Filters;
