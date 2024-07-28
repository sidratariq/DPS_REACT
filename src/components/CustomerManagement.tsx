import React, { useEffect, useState, useCallback } from 'react';
import CustomerList from './CustomerList';
import { debounce } from './debounce';


const CustomerManagement: React.FC = () => {
    const [customers, setCustomers] = useState<any[]>([]);
    const [filteredCustomers, setFilteredCustomers] = useState<any[]>([]);
    const [nameFilter, setNameFilter] = useState('');
    const [cityFilter, setCityFilter] = useState('');
    const [highlightOldest, setHighlightOldest] = useState(false);
    
    useEffect(() => {
        fetch('https://dummyjson.com/users')
            .then(response => response.json())
            .then(data => {
                setCustomers(data.users);
                console.log('Fetched customers:', data.users);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const applyFilters = useCallback(() => {
        let filtered = customers;
        if (nameFilter) {
            filtered = filtered.filter(customer =>
                customer.firstName.toLowerCase().includes(nameFilter.toLowerCase()) ||
                customer.lastName.toLowerCase().includes(nameFilter.toLowerCase())
            );
        }
        if (cityFilter) {
            filtered = filtered.filter(customer => customer.address.city === cityFilter);
        }
        if (highlightOldest) {
            const oldestByCity = filtered.reduce((acc, customer) => {
                if (!acc[customer.address.city] || new Date(customer.birthDate) < new Date(acc[customer.address.city].birthDate)) {
                    acc[customer.address.city] = customer;
                }
                return acc;
            }, {} as any);
            filtered = filtered.map(customer => ({
                ...customer,
                isOldest: oldestByCity[customer.address.city]?.id === customer.id,
            }));
        } else {
            filtered = filtered.map(customer => ({
                ...customer,
                isOldest: false,
            }));
        }
        setFilteredCustomers(filtered);
    }, [customers, nameFilter, cityFilter, highlightOldest]);

    const debouncedApplyFilters = useCallback(debounce(applyFilters, 1000), [applyFilters]);

    useEffect(() => {
        debouncedApplyFilters();
    }, [nameFilter, cityFilter, highlightOldest, debouncedApplyFilters]);

    return (
        <div className="customer-management">
           
            <CustomerList customers={filteredCustomers} />
        </div>
    );
};

export default CustomerManagement;
