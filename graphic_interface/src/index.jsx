import React from 'react';
import ReactDOM from 'react-dom';
import DataTable from '../components/Content/index.jsx';

const Index = () => {
    return (
        <div className="container">
            <DataTable />
        </div>
    );
};

ReactDOM.render(<Index />, document.getElementById('root'));
