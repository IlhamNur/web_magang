'use client'
import { Alert, Image, Stack, Text } from '@mantine/core'
import React from 'react'
import TableAlokasi, { RecordAlokasi } from '@/components/Table/TableAlokasi/TableAlokasi'
import { getAllPemilihanPenempatan } from '@/utils/pemilihan-tempat';
import { IconInfoCircle, IconSettingsCode } from '@tabler/icons-react';


const Alokasi = () => {
    const [data, setData] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    const fetchData = async () => {
        try {
            const response = await getAllPemilihanPenempatan();

            let modifiedData = response.data.map((item: { pilihanSatkerId: any; }) => ({
                ...item,
                id: item.pilihanSatkerId,  // Add the `id` field using `pilihanSatkerId`
            }));

            setData(modifiedData);
        } catch (error) {
            console.error("Failed to fetch data:", error);
        } finally {
            setLoading(false);
        }
    };

    React.useEffect(() => {
        fetchData();
    }, []);


    return (
        <>
            {/* <Text c="dimmed" mb="md">Konfirmasi Penempatan</Text> */}

            {/* <Alert color="blue" title="Alokasi mahasiswa telah dilakukan, halaman ini masih dalam pengembangan" icon={<IconInfoCircle />} /> */}
            <Stack
                h={300}
                align="center"
                justify="center"
            >
                <IconSettingsCode size={100} color="var(--mantine-color-gray-6)" />
                <Text

                    fs="italic"
                    c="dimmed"
                // fw={700}
                // align="center"

                >Halaman ini masih dalam pengembangan</Text>
            </Stack>
            {/* <TableAlokasi records={data} loading={loading} fetchData={fetchData} /> */}
        </>
    )
}

export default Alokasi