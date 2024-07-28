import React, { useEffect, useState, useCallback } from 'react';
import CustomerList from './CustomerList';

const CustomerManagement: React.FC = () => {
    const [customers, setCustomers] = useState<any[]>([]);
    const [filteredCustomers, setFilteredCustomers] = useState<any[]>([]);
    
    useEffect(() => {
        fetch('https://dummyjson.com/users')
            .then(response => response.json())
            .then(data => {
                setCustomers(data.users);
                console.log('Fetched customers:', data.users);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);


    return (
        <div className="customer-management">
           
            <CustomerList customers={filteredCustomers} />
        </div>
    );
};

export default CustomerManagement;
