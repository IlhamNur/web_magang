'use client'
import TableMahasiswa from '@/components/Table/TableMahasiswa/TableMahasiswa'
import { Record } from '@/components/Table/TableMahasiswa/TableMahasiswa';
import { getAllDosenPembimbing } from '@/utils/kelola-user/dosen-pembimbing';
import { getAllMahasiswa, getToken } from '@/utils/kelola-user/mahasiswa';
import { getAllPembimbingLapangan } from '@/utils/kelola-user/pembimbing-lapangan';
import { getUnitKerja } from '@/utils/unit-kerja';
import { Button, Group, Select, SimpleGrid, Text } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconFileImport } from '@tabler/icons-react';
import { useEffect, useState, useCallback } from 'react';

const KelolaMahasiswa = () => {
    const [data, setData] = useState([]);
    const [dataFiltered, setDataFiltered] = useState([]);
    const [dataDosen, setDataDosen] = useState([]);
    const [dataPemlap, setDataPemlap] = useState([]);
    const [dataSatker, setDataSatker] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            const response = await getAllMahasiswa();
            const response2 = await getAllDosenPembimbing();
            const response3 = await getAllPembimbingLapangan();
            const response4 = await getUnitKerja();

            let modifiedData = response.data.map((item: { mahasiswaId: any; }) => ({
                ...item,
                id: item.mahasiswaId,  // Add the `id` field using `mahasiswaId`
            }));
            modifiedData = modifiedData.sort((a: { id: number; }, b: { id: number; }) => a.id - b.id);
            setData(modifiedData);

            // data dosen for select
            let modifiedDataDosen = response2.data.map((item: { dosenId: any; nama: any; }) => ({
                value: String(item.dosenId),
                label: item.nama
            }));
            setDataDosen(modifiedDataDosen);

            // data pemlap for select
            let modifiedDataPemlap = response3.data.map((item: { pemlapId: any; nama: any; }) => ({
                value: String(item.pemlapId),
                label: item.nama
            }));
            setDataPemlap(modifiedDataPemlap);

            // data satker for select
            let modifiedDataSatker = response4.data.map((item: { satkerId: any; nama: any; }) => ({
                value: String(item.satkerId),
                label: item.nama
            }));
            setDataSatker(modifiedDataSatker);
        } catch (error) {
            console.error("Failed to fetch data", error);
        } finally {
            setLoading(false);
        }
    };

    const filterDataByTahunAjaran = useCallback((tahunAjaran: string) => {
        if (tahunAjaran === "all") {
            setDataFiltered(data);
        } else {
            const filteredData = data.filter((item: any) => item.tahunAjaran === tahunAjaran);
            setDataFiltered(filteredData);
        }
    }, [data]);

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        filterDataByTahunAjaran("2024/2025");
    }, [data, filterDataByTahunAjaran]);

    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        const token = await getToken();
        if (file) {
            const myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${token}`);

            const formdata = new FormData();
            formdata.append("file", file);

            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: formdata,
            };

            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/mahasiswa/excel`, requestOptions);

                if (!response.ok) {
                    console.log(await response.text());
                    throw new Error("Failed to upload file");
                }

                notifications.show({
                    title: "Berhasil",
                    message: "File berhasil diunggah",
                });
                fetchData();
            } catch (error) {
                console.error("Failed to upload file", error);
                notifications.show({
                    title: "Gagal",
                    message: "File gagal diunggah",
                    color: "red"
                });
            }
        }
    };

    return (
        <>
            <Text c="dimmed" mb="md">Kelola Mahasiswa</Text>
            <Group mb="md">
                <Button leftSection={<IconFileImport size={14} />}>
                    <input type="file" accept=".xlsx" onChange={handleFileUpload} style={{ display: 'none' }} id="fileUpload" />
                    <label htmlFor="fileUpload" style={{ cursor: 'pointer' }}>Impor</label>
                </Button>
            </Group>

            <SimpleGrid cols={{ md: 2, xl: 4 }} mb="md">
                < Select
                    allowDeselect={false}
                    label="Tahun Ajaran"
                    data={[
                        { value: "2021/2022", label: "2021/2022" },
                        { value: "2022/2023", label: "2022/2023" },
                        { value: "2023/2024", label: "2023/2024" },
                        { value: "2024/2025", label: "2024/2025" },
                        { value: "all", label: "Semua" },
                    ]} placeholder="Pilih Tahun Ajaran"
                    onChange={(value) => filterDataByTahunAjaran(value as string)}
                    defaultValue={"2024/2025"}
                />
            </SimpleGrid >
            <TableMahasiswa records={dataFiltered} loading={loading} fetchData={fetchData} dataDosen={dataDosen} dataPemlap={dataPemlap} dataSatker={dataSatker} />
        </>
    )
}

export default KelolaMahasiswa;
