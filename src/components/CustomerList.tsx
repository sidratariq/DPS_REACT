import React from 'react';

interface CustomerListProps {
    customers: any[];
}

const CustomerList: React.FC<CustomerListProps> = ({ customers }) => {
    return (
        <table className="customer-table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>City</th>
                    <th>Birth Date</th>
                </tr>
            </thead>
            <tbody>
                {customers.map(customer => (
                    <tr key={customer.id} className={`customer-row ${customer.isOldest ? 'highlight' : ''}`}>
                        <td>{customer.firstName} {customer.lastName}</td>
                        <td>{customer.address.city}</td>
                        <td>{new Date(customer.birthDate).toLocaleDateString()}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default CustomerList;
