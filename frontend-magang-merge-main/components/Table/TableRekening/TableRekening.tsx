import { DataTable } from 'mantine-datatable'
import React from 'react'

const TableRekening = () => {
    return (
        <DataTable
            withColumnBorders
            withTableBorder
            columns={[
                { accessor: 'id', title: 'No', textAlign: 'right' },
                { accessor: 'nama', title: 'Nama', textAlign: 'left' },
                { accessor: 'nim', title: 'NIM', textAlign: 'left' },
                { accessor: 'bank', title: 'Bank', textAlign: 'left' },
                { accessor: 'rekening', title: 'Rekening', textAlign: 'left' },
                { accessor: 'atas_nama', title: 'Atas Nama', textAlign: 'left' },
            ]}
            records={[
                {
                    id: 1, nama: 'Mohamad Fajar',
                    nim: '222011000',
                    bank: 'BRI',
                    rekening: '123 456 789',
                    atas_nama: 'Mohamad Fajar',
                },
                {
                    id: 2, nama: 'Siti Fatimah',
                    nim: '222011001',
                    bank: 'BNI',
                    rekening: '123 456 789',
                    atas_nama: 'Siti Fatimah',
                },
                {
                    id: 3, nama: 'Joko Susilo',
                    nim: '222011002',
                    bank: 'BCA',
                    rekening: '123 456 789',
                    atas_nama: 'Joko Susilo',
                },


            ]}
        />
    )
}

export default TableRekening