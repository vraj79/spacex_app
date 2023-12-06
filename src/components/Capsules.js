import { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { fetchCapsules } from './api';

const Capsules = () => {
    const [capsules, setCapsules] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchCapsules();
                console.log(response);
                setCapsules(response.data);
            } catch (error) {
                console.error('Error fetching capsules:', error);
            }
        };

        fetchData();
    }, []);

    const columnDefs = [
        { headerName: 'Capsule Serial', field: 'capsule_serial' },
        { headerName: 'Capsule ID', field: 'capsule_id' },
        { headerName: 'Status', field: 'status' },
        {
            headerName: 'Original Launch', field: 'original_launch', valueFormatter: (params) => {
                return new Date(params.value).toLocaleDateString('en-US', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                });

            },
        },
        { headerName: 'Landings', field: 'landings' },
        { headerName: 'Type', field: 'type' },
        { headerName: 'Details', field: 'details' },
        { headerName: 'Reuse Count', field: 'reuse_count', },
    ];

    const defaultColDef = {
        sortable: true,
        resizable: true,
        filter: true,
        flex: 1,
        minWidth: 100,
        maxWidth: 500,
        enableRowGroup: true,
        enablePivot: true,
        enableValue: true,
    };

    const paginationPageSize = 5; // Number of rows per page

    return (
        <div className="ag-theme-alpine-auto-dark w-screen h-screen capitalize overflow-hidden">
            <AgGridReact
                rowData={capsules}
                columnDefs={columnDefs}
                defaultColDef={defaultColDef}
                pagination={true}
                paginationPageSize={paginationPageSize}
            />
        </div>
    );
};

export default Capsules