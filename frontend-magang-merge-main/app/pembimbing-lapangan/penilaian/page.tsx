'use client'

import React, { useEffect, useRef, useState } from 'react'
import Handsontable from 'handsontable/base';
import { HotTable } from '@handsontable/react';
import { registerAllModules } from 'handsontable/registry';
import 'handsontable/dist/handsontable.full.min.css';
import { Divider, Text, List, Accordion, Group, Button, Tabs, Stack } from '@mantine/core';
import { DataTable } from 'mantine-datatable';
import { notifications } from '@mantine/notifications';
import { IconFileText, IconReportAnalytics } from '@tabler/icons-react';
import { getPenilaianKinerjaByPembimbingLapangan, getPenilaianLaporanByPembimbingLapangan, postPenilaianKinerjaByPembimbingLapangan, postPenilaianLaporanByPembimbingLapangan, putPenilaianKinerjaByPembimbingLapangan, putPenilaianLaporanByPembimbingLapangan } from '@/utils/penilaian';
import { getAllMahasiswa } from '@/utils/kelola-user/mahasiswa';

// register Handsontable's modules
registerAllModules();

// (Handsontable => {
//     function customValidator(query: number, callback: any) {
//         // value beetwen 0 and 100
//         if (query < 0 || query > 100) {
//             callback(false);
//             return;
//         }
//     }

//     // Register an alias
//     Handsontable.validators.registerValidator('my.custom', customValidator);

// })(Handsontable);


const kriteria_kinerja = [
    {
        "id": 1,
        "kriteria": "Inisiatif",
        "kurang_memuaskan": "Tidak pernah menyampaikan ide/gagasan dalam melaksanakan pekerjaan magang",
        "memuaskan": "Beberapa kali menyampaikan ide/gagasan dalam melaksanakan pekerjaan magang",
        "sangat_memuaskan": "Sering menyampaikan ide/gagasan dalam melaksanakan pekerjaan magang",
    },
    {
        "id": 2,
        "kriteria": "Disiplin",
        "kurang_memuaskan": "Datang dan pulang tidak tepat waktu serta tidak menyelesaikan pekerjaan sesuai dengan target yang ditentukan",
        "memuaskan": "Hampir selalu datang dan pulang tepat waktu serta menyelesaikan pekerjaan sesuai dengan target yang ditentukan",
        "sangat_memuaskan": "Selalu datang dan pulang tepat waktu serta menyelesaikan pekerjaan sesuai dengan target yang ditentukan",
    },
    {
        "id": 3,
        "kriteria": "Ketekunan",
        "kurang_memuaskan": "Jarang melaksanakan pekerjaan dengan kualitas yang baik",
        "memuaskan": "Hampir selalu melaksanakan pekerjaan dengan kualitas yang baik",
        "sangat_memuaskan": "Selalu melaksanakan pekerjaan dengan kualitas yang baik",
    },
    {
        "id": 4,
        "kriteria": "Berpikir kritis, kreatif, dan analitis",
        "kurang_memuaskan": "Kurang menunjukkan kemampuan berpikir kritis, kreatif dan analitis yang cukup baik",
        "memuaskan": "Kadang-kadang menunjukkan kemampuan berpikir kritis, kreatif dan analitis yang baik",
        "sangat_memuaskan": "Selalu menunjukkan kemampuan berpikir kritis, kreatif dan analitis yang sangat baik",
    },
    {
        "id": 5,
        "kriteria": "Kemampuan Beradaptasi",
        "kurang_memuaskan": "Kurang mampu beradaptasi dengan lingkungan kerja magang dengan baik",
        "memuaskan": "Mampu beradaptasi dengan lingkungan kerja magang dengan cukup baik",
        "sangat_memuaskan": "Mampu beradaptasi dengan lingkungan kerja magang dengan sangat baik",
    },
    {
        "id": 6,
        "kriteria": "Kemampuan Komunikasi (lisan maupun tulisan)",
        "kurang_memuaskan": "Kurang mampu melakukan komunikasi lisan dan/atau tulisan dengan baik",
        "memuaskan": "Mampu melakukan komunikasi lisan dan/atau tulisan dengan baik",
        "sangat_memuaskan": "Mampu melakukan komunikasi lisan dan/atau tulisan dengan sangat baik",
    },
    {
        "id": 7,
        "kriteria": "Penampilan",
        "kurang_memuaskan": "Kurang memenuhi standar pekerjaan profesional di tempat kerja",
        "memuaskan": "Cukup memenuhi standar pekerjaan profesional di tempat kerja",
        "sangat_memuaskan": "Memenuhi standar pekerjaan profesional di tempat kerja",
    },
    {
        "id": 8,
        "kriteria": "Kemampuan Teknis",
        "kurang_memuaskan": "Kurang menguasai kemampuan dasar teknis untuk melaksanakan pekerjaan magang",
        "memuaskan": "Cukup menguasai kemampuan dasar teknis untuk melaksanakan pekerjaan magang",
        "sangat_memuaskan": "Sangat menguasai kemampuan dasar teknis untuk melaksanakan pekerjaan magang",
    },
    {
        "id": 9,
        "kriteria": "Kerjasama",
        "kurang_memuaskan": "Kurang mampu bekerjasama dalam tim",
        "memuaskan": "Dapat bekerjasama dalam tim dengan baik",
        "sangat_memuaskan": "Dapat bekerjasama dalam tim dengan sangat baik",
    },
    {
        "id": 10,
        "kriteria": "Hasil Pekerjaan (Kontribusi)",
        "kurang_memuaskan": "Hasil pekerjaan kurang memuaskan dan tidak memberikan kontribusi terhadap pekerjaan tim",
        "memuaskan": "Hasil pekerjaan cukup memuaskan dan cukup memberikan kontribusi terhadap pekerjaan tim",
        "sangat_memuaskan": "Hasil pekerjaan memuaskan dan memberikan kontribusi terhadap pekerjaan tim",
    }
]

const kriteria_laporan = [
    {
        "id": 1,
        "kriteria": "Gambaran umum instansi tempat magang (15%)",
        "kurang_memuaskan": "Tidak ada kejelasan jenis instansi tempat magang",
        "memuaskan": "Ada kejelasan jenis instansi tempat magang",
        "sangat_memuaskan": "Sangat jelas memberikan gambaran instansi tempat magang",
        "Skor": "50 - 100"
    },
    {
        "id": 2,
        "kriteria": "Tugas mahasiswa yang dilaksanakan di tempat magang (15%)",
        "kurang_memuaskan": "Tugas mahasiswa tidak dijelaskan dengan baik",
        "memuaskan": "Tugas mahasiswa dijelaskan dengan baik namun masih ada yang kurang jelas",
        "sangat_memuaskan": "Tugas mahasiswa dijelaskan dengan jelas dan baik",
        "Skor": "50 - 100"
    },
    {
        "id": 3,
        "kriteria": "Pendahuluan/Latar belakang magang ditulis secara jelas (10%)",
        "kurang_memuaskan": "Latar belakang magang kurang menjelaskan tujuan magang dan alasan mengapa suatu topik dipilih untuk dibahas",
        "memuaskan": "Latar belakang magang menjelaskan tujuan magang dan alasan mengapa suatu topik dipilih untuk dibahas dengan cukup baik",
        "sangat_memuaskan": "Latar belakang magang menjelaskan tujuan magang dan alasan mengapa suatu topik dipilih untuk dibahas dengan sangat baik",
        "Skor": "50 - 100"
    },
    {
        "id": 4,
        "kriteria": "Keterkaitan antara kegiatan magang dengan mata kuliah yang telah diambil (15%)",
        "kurang_memuaskan": "Keterkaitan kegiatan magang dengan mata kuliah tidak dijelaskan",
        "memuaskan": "Keterkaitan kegiatan magang dengan mata kuliah dijelaskan dengan cukup jelas",
        "sangat_memuaskan": "Keterkaitan kegiatan magang dengan mata kuliah dijelaskan dengan sangat jelas",
        "Skor": "50 - 100"
    },
    {
        "id": 5,
        "kriteria": "Refleksi diri mencerminkan proses pembelajaran selama magang secara pribadi, meliputi aspek technical skill dan social-emotional skill (25%)",
        "kurang_memuaskan": "Refleksi diri mahasiswa dijelaskan tidak meliputi kedua aspek tersebut (tidak lengkap)",
        "memuaskan": "Refleksi diri mahasiswa dijelaskan lengkap (2 aspek) belum lengkap",
        "sangat_memuaskan": "Refleksi diri mahasiswa dijelaskan lengkap (2 aspek) dengan lengkap dan baik",
        "Skor": "50 - 100"
    },
    {
        "id": 6,
        "kriteria": "Kesimpulan dan saran disusun sesuai dengan pembahasan (10%)",
        "kurang_memuaskan": "Kesimpulan dan saran tidak sesuai dengan pembahasan",
        "memuaskan": "Kesimpulan dan saran cukup sesuai dengan pembahasan",
        "sangat_memuaskan": "Kesimpulan dan saran sesuai dengan pembahasan",
        "Skor": "50 - 100"
    },
    {
        "id": 7,
        "kriteria": "Saran untuk institusi yang terkait dengan pembahasan Bab 3 (10%)",
        "kurang_memuaskan": "Saran tidak sesuai dengan pembahasan",
        "memuaskan": "Saran cukup sesuai dengan pembahasan",
        "sangat_memuaskan": "Saran sesuai dengan pembahasan",
        "Skor": "50 - 100"
    },
    {
        "id": 8,
        "kriteria": "Mengikuti panduan laporan yang berlaku di Politeknik Statistika STIS (5%)",
        "kurang_memuaskan": "Laporan tidak mengikuti panduan yang berlaku",
        "memuaskan": "Laporan cukup sesuai dengan panduan",
        "sangat_memuaskan": "Laporan sesuai dengan panduan",
        "Skor": "50 - 100"
    },
    {
        "id": 9,
        "kriteria": "Logika penyajian yang runtut (5%)",
        "kurang_memuaskan": "Susunan bab, paragraf dan kalimat tidak sesuai dengan kaidah yang berlaku",
        "memuaskan": "Susunan bab, paragraf dan kalimat cukup sesuai dengan kaidah yang berlaku",
        "sangat_memuaskan": "Susunan bab, paragraf dan kalimat sesuai dengan kaidah yang berlaku",
        "Skor": "50 - 100"
    },
    {
        "id": 10,
        "kriteria": "Bahasa yang baku serta ilmiah (5%)",
        "kurang_memuaskan": "Menggunakan bahasa yang kurang tepat, tidak sesuai dengan aturan yang benar",
        "memuaskan": "Menggunakan bahasa yang cukup tepat, cukup sesuai dengan aturan yang benar",
        "sangat_memuaskan": "Menggunakan bahasa yang tepat, sesuai dengan aturan yang benar",
        "Skor": "50 - 100"
    }
]

const Penilaian = () => {
    const hotTableRef = useRef<any>(null);
    const hotTableRef2 = useRef<any>(null);
    const [data, setData] = useState<any[]>([]);
    const [data2, setData2] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const nilaiValidator = (value: number, callback: any) => {
        // value beetwen 0 and 100 and numeric
        if (value < 50 || value > 100 || isNaN(value)) {
            callback(false);
            return;
        }
        callback(true);
    }

    const handleSave = async () => {
        if (hotTableRef.current) {
            const hotTableInstance = hotTableRef.current.hotInstance;
            const data = hotTableInstance.getData();
            // Assuming the last element in the array is penilaianKinerjaId
            const transformedData = data.map(([mahasiswaId, nim, nama, ...nilai]: [number, string, string, ...number[]]) => {
                const penilaianKinerjaId = nilai[10]; // or any other index where penilaianKinerjaId is stored
                const createPenilaianKinerjaDto = {
                    initiatif: nilai[0],
                    disiplin: nilai[1],
                    ketekunan: nilai[2],
                    kemampuanBerfikir: nilai[3],
                    kemampuanBeradaptasi: nilai[4],
                    komunikasi: nilai[5],
                    penampilan: nilai[6],
                    teknikal: nilai[7],
                    kerjasama: nilai[8],
                    hasil: nilai[9]
                };

                // Check for null values in the data
                const isRowComplete = !Object.values(createPenilaianKinerjaDto).some(value => value === null);

                if (!isRowComplete) {
                    return null; // Filter out incomplete rows
                }

                const updatePenilaianKinerjaDto = {
                    ...createPenilaianKinerjaDto
                };

                return penilaianKinerjaId
                    ? { penilaianKinerjaId, updatePenilaianKinerjaDto }
                    : { mahasiswaId, createPenilaianKinerjaDto };
            }).filter((item: any) => item !== null); // Filter out null values

            console.log(transformedData);

            if (transformedData.length === 0) {
                notifications.show({
                    title: 'Data tidak lengkap',
                    message: 'Tidak ada data penilaian yang lengkap',
                    color: 'red',
                });
                return;
            }

            const newEntries = transformedData.filter((item: any) => item.createPenilaianKinerjaDto);
            const existingEntries = transformedData.filter((item: any) => item.updatePenilaianKinerjaDto);
            console.log(newEntries);
            console.log(existingEntries);


            // Perform save operations based on the presence of penilaianKinerjaId
            try {
                // Call API for new entries
                if (newEntries.length > 0) {
                    await postPenilaianKinerjaByPembimbingLapangan(newEntries);
                }

                // Call API for existing entries
                if (existingEntries.length > 0) {
                    await putPenilaianKinerjaByPembimbingLapangan(existingEntries);
                }

                notifications.show({
                    title: 'Data berhasil disimpan',
                    message: 'Data penilaian berhasil disimpan',
                    color: 'blue',
                });
            } catch (error) {
                notifications.show({
                    title: 'Data gagal disimpan',
                    message: 'Data penilaian gagal disimpan',
                    color: 'red',
                });
            }
        } else {
            notifications.show({
                title: 'Data tabel tidak ditemukan',
                message: 'Data penilaian gagal disimpan',
                color: 'red',
            });
        }
    };

    const handleSave2 = async () => {
        if (hotTableRef2.current) {
            const hotTableInstance = hotTableRef2.current.hotInstance;
            const data = hotTableInstance.getData();

            // Assuming the last element in the array is penilaianLaporanPemlapId
            const transformedData = data.map(([mahasiswaId, nim, nama, ...nilai]: [number, string, string, ...number[]]) => {
                const penilaianLaporanPemlapId = nilai[10]; // or any other index where penilaianLaporanPemlapId is stored
                const createPenilaianLaporanPemlapDto = {
                    var1: nilai[0],
                    var2: nilai[1],
                    var3: nilai[2],
                    var4: nilai[3],
                    var5: nilai[4],
                    var6: nilai[5],
                    var7: nilai[6],
                    var8: nilai[7],
                    var9: nilai[8],
                    var10: nilai[9]
                };

                // Check for null values in the data
                const isRowComplete = !Object.values(createPenilaianLaporanPemlapDto).some(value => value === null);

                if (!isRowComplete) {
                    return null; // Filter out incomplete rows
                }

                const updatePenilaianLaporanPemlapDto = {
                    ...createPenilaianLaporanPemlapDto
                };

                return penilaianLaporanPemlapId
                    ? { penilaianLaporanPemlapId, updatePenilaianLaporanPemlapDto }
                    : { mahasiswaId, createPenilaianLaporanPemlapDto };
            }).filter((item: any) => item !== null); // Filter out null values

            console.log(transformedData);

            if (transformedData.length === 0) {
                notifications.show({
                    title: 'Data tidak lengkap',
                    message: 'Tidak ada data penilaian yang lengkap',
                    color: 'red',
                });
                return;
            }

            const newEntries = transformedData.filter((item: any) => item.createPenilaianLaporanPemlapDto);
            const existingEntries = transformedData.filter((item: any) => item.updatePenilaianLaporanPemlapDto);
            console.log(newEntries);
            console.log(existingEntries);

            // Perform save operations based on the presence of penilaianLaporanPemlapId
            try {
                // Call API for new entries
                if (newEntries.length > 0) {
                    await postPenilaianLaporanByPembimbingLapangan(newEntries);
                }

                // Call API for existing entries
                if (existingEntries.length > 0) {
                    await putPenilaianLaporanByPembimbingLapangan(existingEntries);
                }

                notifications.show({
                    title: 'Data berhasil disimpan',
                    message: 'Data penilaian berhasil disimpan',
                    color: 'blue',
                });
            } catch (error) {
                notifications.show({
                    title: 'Data gagal disimpan',
                    message: 'Data penilaian gagal disimpan',
                    color: 'red',
                });
            }
        } else {
            notifications.show({
                title: 'Data tabel tidak ditemukan',
                message: 'Data penilaian gagal disimpan',
                color: 'red',
            });
        }
    };

    const fetchData = async () => {
        try {
            const response = await getAllMahasiswa()
            const dataPenilaianKinerja = await getPenilaianKinerjaByPembimbingLapangan();
            const dataPenilaianLaporan = await getPenilaianLaporanByPembimbingLapangan();

            let modifiedData = response.data.map((item: { mahasiswaId: any; nim: any; nama: any; }) => ({
                id: item.mahasiswaId,
                nim: item.nim,
                nama: item.nama,
            }));

            modifiedData = modifiedData.sort((a: { id: number; }, b: { id: number; }) => a.id - b.id);

            if (dataPenilaianKinerja) {
                modifiedData = modifiedData.map((item: { id: any; nim: any; nama: any; }) => {
                    const penilaian = dataPenilaianKinerja.data.find((value: { penilaian: any; }) => value.penilaian.mahasiswaId === item.id);
                    if (penilaian) {
                        return {
                            ...item,
                            nilai: {
                                1: penilaian.initiatif,
                                2: penilaian.disiplin,
                                3: penilaian.ketekunan,
                                4: penilaian.kemampuanBerfikir,
                                5: penilaian.kemampuanBeradaptasi,
                                6: penilaian.komunikasi,
                                7: penilaian.penampilan,
                                8: penilaian.teknikal,
                                9: penilaian.kerjasama,
                                10: penilaian.hasil
                            },
                            penilaianKinerjaId: penilaian.penilaianKinerjaId
                        }
                    }
                    return item;
                });
            }

            console.log(modifiedData);
            setData(modifiedData);

            let modifiedData2 = response.data.map((item: { mahasiswaId: any; nim: any; nama: any; }) => ({
                id: item.mahasiswaId,
                nim: item.nim,
                nama: item.nama,
            }));

            modifiedData2 = modifiedData2.sort((a: { id: number; }, b: { id: number; }) => a.id - b.id);

            if (dataPenilaianLaporan) {
                modifiedData2 = modifiedData2.map((item: { id: any; nim: any; nama: any; }) => {
                    const penilaian = dataPenilaianLaporan.data.find((value: { penilaian: any; }) => value.penilaian.mahasiswaId === item.id);
                    if (penilaian) {
                        return {
                            ...item,
                            nilai: {
                                1: penilaian.var1,
                                2: penilaian.var2,
                                3: penilaian.var3,
                                4: penilaian.var4,
                                5: penilaian.var5,
                                6: penilaian.var6,
                                7: penilaian.var7,
                                8: penilaian.var8,
                                9: penilaian.var9,
                                10: penilaian.var10
                            },
                            penilaianLaporanPemlapId: penilaian.penilaianLaporanPemlapId
                        }
                    }
                    return item;
                });
            }

            console.log(modifiedData2);
            setData2(modifiedData2);
        } catch (error) {
            console.error("Failed to fetch data", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <Text c={"dimmed"} mb={"md"} >Penilaian</Text>


            <Tabs variant='outline' defaultValue="kinerja">
                <Tabs.List>
                    <Tabs.Tab value="kinerja" leftSection={<IconReportAnalytics width={15} />}>
                        Kinerja
                    </Tabs.Tab>
                    <Tabs.Tab value="laporan" leftSection={<IconFileText width={15} />}>
                        Laporan
                    </Tabs.Tab>

                </Tabs.List>

                <Tabs.Panel value="kinerja">
                    {/* <Divider
                        my={"md"}
                        label={<Text size='sm' c={'black'} fw={700} >Daftar Penilaian</Text>}
                        labelPosition='left'
                        orientation='horizontal'
                        size='sm'
                    /> */}

                    <Stack my="md" gap="sm">
                        <HotTable
                            ref={hotTableRef}
                            data={data}
                            dataSchema={{
                                id: null,
                                nim: null,
                                nama: null,
                                nilai: {
                                    1: null,
                                    2: null,
                                    3: null,
                                    4: null,
                                    5: null,
                                    6: null,
                                    7: null,
                                    8: null,
                                    9: null,
                                    10: null
                                },
                                penilaianKinerjaId: null
                            }}
                            colHeaders={['id', 'NIM', 'Nama', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'penilaianKinerjaId']}
                            height="auto"
                            stretchH="all"
                            width="100%"
                            columns={[
                                { data: 'id', type: 'numeric', readOnly: true },
                                { data: 'nim', type: 'text', readOnly: true },
                                { data: 'nama', type: 'text', readOnly: true },
                                { data: 'nilai.1', type: 'numeric', validator: nilaiValidator },
                                { data: 'nilai.2', type: 'numeric', validator: nilaiValidator },
                                { data: 'nilai.3', type: 'numeric', validator: nilaiValidator },
                                { data: 'nilai.4', type: 'numeric', validator: nilaiValidator },
                                { data: 'nilai.5', type: 'numeric', validator: nilaiValidator },
                                { data: 'nilai.6', type: 'numeric', validator: nilaiValidator },
                                { data: 'nilai.7', type: 'numeric', validator: nilaiValidator },
                                { data: 'nilai.8', type: 'numeric', validator: nilaiValidator },
                                { data: 'nilai.9', type: 'numeric', validator: nilaiValidator },
                                { data: 'nilai.10', type: 'numeric', validator: nilaiValidator },
                                { data: 'penilaianKinerjaId', type: 'numeric', readOnly: true }
                            ]}
                            fixedColumnsStart={2}
                            // minSpareRows={1}
                            rowHeaders={true}
                            autoWrapRow={true}
                            autoWrapCol={true}
                            licenseKey="non-commercial-and-evaluation"
                            hiddenColumns={{ columns: [0, 13] }}
                        />

                        <Group justify='flex-end'>
                            <Button
                                variant='light'
                                color='blue'
                                onClick={handleSave}
                            >
                                Simpan
                            </Button>
                        </Group>
                    </Stack>

                    <Accordion variant="contained" defaultValue="tabel">
                        <Accordion.Item key={1} value="tabel">
                            <Accordion.Control>
                                <Text size='sm' fw={700} >Kriteria Penilaian</Text>
                            </Accordion.Control>
                            <Accordion.Panel>
                                <DataTable
                                    // pinLastColumn
                                    withColumnBorders
                                    withTableBorder
                                    groups={[
                                        {
                                            id: 'id',
                                            title: '',
                                            style: { borderBottomColor: 'transparent' },
                                            columns: [
                                                {
                                                    accessor: 'id',
                                                    title: (
                                                        <Text fw={700}>
                                                            No
                                                        </Text>
                                                    ),
                                                    hidden: true,
                                                    textAlign: 'right'
                                                },
                                            ]
                                        },

                                        {
                                            id: 'no',
                                            title: '',
                                            style: { borderBottomColor: 'transparent' },
                                            columns: [
                                                {
                                                    accessor: 'index',
                                                    title: (
                                                        <Text fw={700} size='sm'>
                                                            No
                                                        </Text>
                                                    ),
                                                    textAlign: 'right',
                                                    width: 40,
                                                    render: (record) => kriteria_kinerja.indexOf(record) + 1,
                                                },
                                            ]
                                        },

                                        {
                                            id: 'kriteria',
                                            title: '',
                                            style: { borderBottomColor: 'transparent' },
                                            columns: [
                                                {
                                                    accessor: 'kriteria',
                                                    title: (
                                                        <Text fw={700} size='sm'>
                                                            Kriteria
                                                        </Text>
                                                    ),
                                                    titleStyle: () => ({ textAlign: "center" }),
                                                    cellsStyle: () => ({
                                                        textAlign: "justify",
                                                    })
                                                },
                                            ]
                                        },

                                        {
                                            id: 'kurang_memuaskan',
                                            title: 'Kurang Memuaskan',
                                            textAlign: 'center',
                                            columns: [
                                                {
                                                    accessor: 'kurang_memuaskan',
                                                    title: (
                                                        <Text fw={700} size='sm'>
                                                            Range nilai 50 - 69
                                                        </Text>
                                                    ),
                                                    titleStyle: () => ({ textAlign: "center" }),
                                                    cellsStyle: () => ({
                                                        textAlign: "justify",
                                                    })
                                                },
                                            ]
                                        },

                                        {
                                            id: 'memuaskan',
                                            title: 'Memuaskan',
                                            textAlign: 'center',
                                            columns: [
                                                {
                                                    accessor: 'memuaskan',
                                                    title: (
                                                        <Text fw={700} size='sm'>
                                                            Range nilai 70 - 85
                                                        </Text>
                                                    ),
                                                    titleStyle: () => ({ textAlign: "center" }),
                                                    cellsStyle: () => ({
                                                        textAlign: "justify",
                                                    })
                                                },
                                            ]
                                        },

                                        {
                                            id: 'sangat_memuaskan',
                                            title: 'Sangat Memuaskan',
                                            textAlign: 'center',
                                            columns: [
                                                {
                                                    accessor: 'sangat_memuaskan',
                                                    title: (
                                                        <Text fw={700} size='sm'>
                                                            Range nilai 86 - 100
                                                        </Text>
                                                    ),
                                                    titleStyle: () => ({ textAlign: "center" }),
                                                    cellsStyle: () => ({
                                                        textAlign: "justify",
                                                    })
                                                },
                                            ]
                                        },
                                    ]}
                                    records={kriteria_kinerja}
                                />
                            </Accordion.Panel>
                        </Accordion.Item>
                    </Accordion>

                </Tabs.Panel>

                <Tabs.Panel value="laporan">

                    <Stack my="md" gap="sm">
                        <HotTable
                            ref={hotTableRef2}
                            data={data2}
                            dataSchema={{
                                id: null,
                                nim: null,
                                nama: null,
                                nilai: {
                                    1: null,
                                    2: null,
                                    3: null,
                                    4: null,
                                    5: null,
                                    6: null,
                                    7: null,
                                    8: null,
                                    9: null,
                                    10: null
                                },
                                penilaianLaporanPemlapId: null
                            }}
                            colHeaders={['id', 'NIM', 'Nama', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'penilaianLaporanPemlapId']}
                            height="auto"
                            stretchH="all"
                            width="100%"
                            columns={[
                                { data: 'id', type: 'numeric', readOnly: true },
                                { data: 'nim', type: 'text', readOnly: true },
                                { data: 'nama', type: 'text', readOnly: true },
                                { data: 'nilai.1', type: 'numeric', validator: nilaiValidator },
                                { data: 'nilai.2', type: 'numeric', validator: nilaiValidator },
                                { data: 'nilai.3', type: 'numeric', validator: nilaiValidator },
                                { data: 'nilai.4', type: 'numeric', validator: nilaiValidator },
                                { data: 'nilai.5', type: 'numeric', validator: nilaiValidator },
                                { data: 'nilai.6', type: 'numeric', validator: nilaiValidator },
                                { data: 'nilai.7', type: 'numeric', validator: nilaiValidator },
                                { data: 'nilai.8', type: 'numeric', validator: nilaiValidator },
                                { data: 'nilai.9', type: 'numeric', validator: nilaiValidator },
                                { data: 'nilai.10', type: 'numeric', validator: nilaiValidator },
                                { data: 'penilaianLaporanPemlapId', type: 'numeric', readOnly: true }
                            ]}
                            fixedColumnsStart={2}
                            // minSpareRows={1}
                            rowHeaders={true}
                            autoWrapRow={true}
                            autoWrapCol={true}
                            licenseKey="non-commercial-and-evaluation"
                            hiddenColumns={{ columns: [0, 13] }}
                        />

                        <Group justify='flex-end'>
                            <Button
                                variant='light'
                                color='blue'
                                onClick={handleSave2}
                            >
                                Simpan
                            </Button>
                        </Group>
                    </Stack>

                    <Accordion variant="contained" defaultValue="tabel">
                        <Accordion.Item key={2} value="tabel">
                            <Accordion.Control>
                                <Text size='sm' fw={700} >Kriteria Penilaian</Text>
                            </Accordion.Control>
                            <Accordion.Panel>
                                <DataTable
                                    // pinLastColumn
                                    withColumnBorders
                                    withTableBorder
                                    groups={[
                                        {
                                            id: 'id',
                                            title: '',
                                            style: { borderBottomColor: 'transparent' },
                                            columns: [
                                                {
                                                    accessor: 'id',
                                                    title: (
                                                        <Text fw={700}>
                                                            No
                                                        </Text>
                                                    ),
                                                    hidden: true,
                                                    textAlign: 'right'
                                                },
                                            ]
                                        },

                                        {
                                            id: 'no',
                                            title: '',
                                            style: { borderBottomColor: 'transparent' },
                                            columns: [
                                                {
                                                    accessor: 'index',
                                                    title: (
                                                        <Text fw={700} size='sm'>
                                                            No
                                                        </Text>
                                                    ),
                                                    textAlign: 'right',
                                                    width: 40,
                                                    render: (record) => kriteria_laporan.indexOf(record) + 1,
                                                },
                                            ]
                                        },

                                        {
                                            id: 'kriteria',
                                            title: '',
                                            style: { borderBottomColor: 'transparent' },
                                            columns: [
                                                {
                                                    accessor: 'kriteria',
                                                    title: (
                                                        <Text fw={700} size='sm'>
                                                            Kriteria
                                                        </Text>
                                                    ),
                                                    titleStyle: () => ({ textAlign: "center" }),
                                                    cellsStyle: () => ({
                                                        textAlign: "justify",
                                                    })
                                                },
                                            ]
                                        },

                                        {
                                            id: 'kurang_memuaskan',
                                            title: 'Kurang Memuaskan',
                                            textAlign: 'center',
                                            columns: [
                                                {
                                                    accessor: 'kurang_memuaskan',
                                                    title: (
                                                        <Text fw={700} size='sm'>
                                                            Range nilai 50 - 69
                                                        </Text>
                                                    ),
                                                    titleStyle: () => ({ textAlign: "center" }),
                                                    cellsStyle: () => ({
                                                        textAlign: "justify",
                                                    })
                                                },
                                            ]
                                        },

                                        {
                                            id: 'memuaskan',
                                            title: 'Memuaskan',
                                            textAlign: 'center',
                                            columns: [
                                                {
                                                    accessor: 'memuaskan',
                                                    title: (
                                                        <Text fw={700} size='sm'>
                                                            Range nilai 70 - 85
                                                        </Text>
                                                    ),
                                                    titleStyle: () => ({ textAlign: "center" }),
                                                    cellsStyle: () => ({
                                                        textAlign: "justify",
                                                    })
                                                },
                                            ]
                                        },

                                        {
                                            id: 'sangat_memuaskan',
                                            title: 'Sangat Memuaskan',
                                            textAlign: 'center',
                                            columns: [
                                                {
                                                    accessor: 'sangat_memuaskan',
                                                    title: (
                                                        <Text fw={700} size='sm'>
                                                            Range nilai 86 - 100
                                                        </Text>
                                                    ),
                                                    titleStyle: () => ({ textAlign: "center" }),
                                                    cellsStyle: () => ({
                                                        textAlign: "justify",
                                                    })
                                                },
                                            ]
                                        },
                                    ]}
                                    records={kriteria_laporan}
                                />
                            </Accordion.Panel>
                        </Accordion.Item>
                    </Accordion>

                </Tabs.Panel>
            </Tabs>
        </>
    )
}

export default Penilaian