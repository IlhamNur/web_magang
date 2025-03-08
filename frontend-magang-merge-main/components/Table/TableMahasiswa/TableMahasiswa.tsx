'use client'

import { ActionIcon, Box, Button, Grid, GridCol, Group, Input, Select, Stack, Text, TextInput } from '@mantine/core';
import { IconEdit, IconEye, IconSearch, IconTrash, IconX } from '@tabler/icons-react';
import { DataTable } from 'mantine-datatable';
import { openModal, closeModal } from '@mantine/modals';
import React, { use, useEffect, useState } from 'react';
import { useForm } from '@mantine/form';
import { putMahasiswa } from '@/utils/kelola-user/mahasiswa';
import { notifications } from '@mantine/notifications';
import { useDebouncedValue } from '@mantine/hooks';
import { on } from 'events';

export interface Record {
    mahasiswaId: number;
    id: number;
    nama: string;
    nim: string;
    kelas: string;
    prodi: string;
    pemlapId: string;
    dosenId: string;
    satkerId: string;
    alamat: string;
    namaSatker: string;
    namaDosenPembimbingMagang: string;
    namaPembimbingLapangan: string;
}

const PAGE_SIZES = [10, 15, 20];

const TableMahasiswa = ({ records, loading, fetchData, dataDosen, dataPemlap, dataSatker }: { records: Record[], loading: boolean, fetchData: () => void, dataDosen: any, dataPemlap: any, dataSatker: any }) => {
    const [recordsMain, setRecordsMain] = useState(records);

    const [query, setQuery] = useState('');
    const [query2, setQuery2] = useState('');
    const [debouncedQuery] = useDebouncedValue(query, 200)
    const [debouncedQuery2] = useDebouncedValue(query2, 200)


    useEffect(() => {
        setRecordsMain(records.filter(({ nama, nim }) => {
            if (debouncedQuery !== '' && !`${nama}`.toLowerCase().includes(debouncedQuery.toLowerCase())) {
                return false;
            }

            if (debouncedQuery2 !== '' && !`${nim}`.toLowerCase().includes(debouncedQuery2.toLowerCase())) {
                return false;
            }
            return true;
        }));

    }, [debouncedQuery, debouncedQuery2, records]);

    // pagination
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);

    useEffect(() => {
        setPage(1);
    }, [pageSize]);

    const [page, setPage] = useState(1);
    const [recordsPaged, setRecordsPaged] = useState(recordsMain.slice(0, pageSize));

    useEffect(() => {
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        setRecordsPaged(recordsMain.slice(from, to));
    }, [page, pageSize, recordsMain]);

    return (
        <DataTable
            fetching={loading}
            pinLastColumn
            withTableBorder
            withColumnBorders
            columns={[
                { accessor: 'id', title: 'No', textAlign: 'right', hidden: true },
                { accessor: 'no', title: 'No', textAlign: 'right', width: 40, render: (record, index) => (page - 1) * pageSize + (index + 1) },
                {
                    accessor: 'nama', title: 'Nama', textAlign: 'left',
                    filter: (
                        <TextInput
                            label="Nama Mahasiswa"
                            placeholder="Cari nama mahasiswa..."
                            leftSection={< IconSearch size={16} />}
                            rightSection={
                                <ActionIcon size="sm" variant="transparent" c="dimmed" onClick={() => setQuery('')}>
                                    <IconX size={14} />
                                </ActionIcon>
                            }
                            value={query}
                            onChange={(e) => setQuery(e.currentTarget.value)}
                        />
                    ),
                    filtering: query !== '',
                },
                {
                    accessor: 'nim', title: 'NIM', textAlign: 'left',
                    filter: (
                        <TextInput
                            label="NIM"
                            placeholder="Cari NIM..."
                            leftSection={< IconSearch size={16} />}
                            rightSection={
                                <ActionIcon size="sm" variant="transparent" c="dimmed" onClick={() => setQuery2('')}>
                                    <IconX size={14} />
                                </ActionIcon>
                            }
                            value={query2}
                            onChange={(e) => setQuery2(e.currentTarget.value)}
                        />
                    ),
                    filtering: query2 !== '',
                },
                { accessor: 'kelas', title: 'Kelas', textAlign: 'left' },
                { accessor: 'prodi', title: 'Prodi', textAlign: 'left' },
                { accessor: 'namaPembimbingLapangan', title: 'Pembimbing Lapangan', textAlign: 'left' },
                { accessor: 'namaDosenPembimbingMagang', title: 'Dosen Pembimbing', textAlign: 'left' },
                { accessor: 'namaSatker', title: 'Tempat Magang', textAlign: 'left' },
                { accessor: 'alamat', title: 'Alamat', textAlign: 'left' },
                {
                    accessor: 'aksi', title: 'Aksi',
                    width: '0%',
                    textAlign: 'center',
                    render: (record) => (
                        <Group gap={4} justify="right" wrap="nowrap">
                            <ActionIcon
                                size="sm"
                                variant="subtle"
                                color="green"
                                onClick={() => {
                                    showModal({ record, action: 'view', fetchData, dataDosen, dataPemlap, dataSatker })
                                }}
                                title="Lihat"
                            >
                                <IconEye size={16} />
                            </ActionIcon>
                            <ActionIcon
                                size="sm"
                                variant="subtle"
                                color="blue"
                                onClick={() => {
                                    showModal({ record, action: 'edit', fetchData, dataDosen, dataPemlap, dataSatker })
                                }}
                                title='Ubah'
                            >
                                <IconEdit size={16} />
                            </ActionIcon>
                            {/* <ActionIcon
                                size="sm"
                                variant="subtle"
                                color="red"
                                onClick={() => {
                                    showModal({ record, action: 'delete', fetchData, dataDosen, dataPemlap, dataSatker })
                                }}
                                title='Hapus'
                            >
                                <IconTrash size={16} />
                            </ActionIcon> */}
                        </Group>
                    ),
                }
            ]}
            records={recordsPaged}

            totalRecords={recordsMain.length}
            recordsPerPage={pageSize}
            page={page}
            onPageChange={setPage}
            recordsPerPageOptions={PAGE_SIZES}
            onRecordsPerPageChange={setPageSize}
        />
    )
}

const showModal = ({ record, action, fetchData, dataDosen, dataPemlap, dataSatker }: { record: Record; action: 'view' | 'edit' | 'delete'; fetchData: () => void, dataDosen: any, dataPemlap: any, dataSatker: any }) => {

    if (action === 'view') {
        openModal({
            modalId: action,
            title: 'Lihat Data Mahasiswa',
            children: (
                <Stack>
                    <Input.Wrapper label="NIM" id="nim">
                        <Input id="nim" value={record.nim || ''} readOnly />
                    </Input.Wrapper>
                    <Input.Wrapper label="Nama" id="nama">
                        <Input id="nama" value={record.nama || ''} readOnly />
                    </Input.Wrapper>
                    <Input.Wrapper label="Kelas" id="kelas">
                        <Input id="kelas" value={record.kelas || ''} readOnly />
                    </Input.Wrapper>
                    <Input.Wrapper label="Prodi" id="prodi">
                        <Input id="prodi" value={record.prodi || ''} readOnly />
                    </Input.Wrapper>
                    <Input.Wrapper label="Pembimbing Lapangan" id="pemlapId">
                        <Input id="pemlapId" value={record.namaPembimbingLapangan || ''} readOnly />
                    </Input.Wrapper>
                    <Input.Wrapper label="Dosen Pembimbing" id="dosenId">
                        <Input id="dosenId" value={record.namaDosenPembimbingMagang || ''} readOnly />
                    </Input.Wrapper>
                    <Input.Wrapper label="Tempat Magang" id="satkerId">
                        <Input id="satkerId" value={record.namaSatker || ''} readOnly />
                    </Input.Wrapper>
                    <Input.Wrapper label="Alamat" id="alamat">
                        <Input id="alamat" value={record.alamat || ''} readOnly />
                    </Input.Wrapper>
                    {/* <Grid gutter="md">
                        <GridCol span={2}>NIM</GridCol>
                        <GridCol span={10}>{record.nim}</GridCol>
                        <GridCol span={2}>Name</GridCol>
                        <GridCol span={10}>{record.nama}</GridCol>
                        <GridCol span={2}>Kelas</GridCol>
                        <GridCol span={10}>{record.kelas}</GridCol>
                        <GridCol span={4}>Pembimbing Lapangan</GridCol>
                        <GridCol span={6}>{record.pemlapId}</GridCol>
                        <GridCol span={4}>Dosen Pembimbing</GridCol>
                        <GridCol span={6}>{record.dosenId}</GridCol>
                        <GridCol span={2}>Tempat Magang</GridCol>
                        <GridCol span={10}>{record.satkerId}</GridCol>
                        <GridCol span={2}>Alamat</GridCol>
                        <GridCol span={10}>{record.alamat}</GridCol>
                    </Grid> */}
                    <Button onClick={() => closeModal(action)}>Tutup</Button>
                </Stack>
            ),
        });

    } else if (action === 'edit') {
        const FormComponent = () => {
            const form = useForm({
                initialValues: {
                    mahasiswaId: record.mahasiswaId || '',
                    nim: record.nim || '',
                    nama: record.nama || '',
                    kelas: record.kelas || '',
                    prodi: record.prodi || '',
                    pemlapId: String(record.pemlapId) || '',
                    dosenId: String(record.dosenId) || '',
                    satkerId: String(record.satkerId) || '',
                    alamat: record.alamat || '',
                }
            });

            // Rest of the code...

            return (
                <form onSubmit={form.onSubmit(async (values) => {
                    try {
                        const response = await putMahasiswa(values);
                        notifications.show(
                            {
                                title: 'Berhasil',
                                message: 'Data mahasiswa berhasil diubah',
                            }
                        )
                        fetchData();
                        closeModal(action);
                    } catch (error) {
                        console.error('Error updating mahasiswa:', error);
                        throw error;
                    }


                })}>
                    <Stack>
                        <TextInput
                            label="NIM"
                            {...form.getInputProps('nim')}
                        />
                        <TextInput
                            label="Nama"
                            {...form.getInputProps('nama')}
                        />
                        <TextInput
                            label="Kelas"
                            {...form.getInputProps('kelas')}
                        />
                        <TextInput
                            label="Prodi"
                            {...form.getInputProps('prodi')}
                        />
                        <Select
                            label="Pembimbing Lapangan"
                            searchable
                            {...form.getInputProps('pemlapId')}
                            data={dataPemlap}
                            placeholder="Pilih Pembimbing Lapangan"
                        />
                        <Select
                            label="Dosen Pembimbing"
                            searchable
                            {...form.getInputProps('dosenId')}
                            data={dataDosen}
                            placeholder="Pilih Dosen Pembimbing"
                        />
                        <Select
                            label="Tempat Magang"
                            searchable
                            {...form.getInputProps('satkerId')}
                            data={dataSatker}
                            placeholder="Pilih Tempat Magang"
                        />
                        <TextInput
                            label="Alamat"
                            {...form.getInputProps('alamat')}
                        />


                        <Button type='submit' color='orange' variant='light'>Ubah</Button>
                    </Stack>
                </form>
            );
        };

        openModal({
            modalId: action,
            title: 'Edit Data Mahasiswa',
            children: (
                <FormComponent />
            ),
        });
    } else if (action === 'delete') {
        openModal({
            modalId: action,
            title: 'Hapus Data Mahasiswa',
            children: (
                <Stack>
                    <Text>Apakah anda yakin ingin menghapus data mahasiswa ini?</Text>
                    <Grid gutter="md">
                        <GridCol span={2}>NIM</GridCol>
                        <GridCol span={10}>{record.nim}</GridCol>
                        <GridCol span={2}>Nama</GridCol>
                        <GridCol span={10}>{record.nama}</GridCol>
                    </Grid>
                    <Group justify="right">
                        <Button color='gray' variant='light' onClick={() => closeModal(action)}>Batal</Button>
                        <Button color='red' variant='light' onClick={() => closeModal(action)}>Hapus</Button>
                    </Group>
                </Stack>
            ),
        });
    }
};


export default TableMahasiswa