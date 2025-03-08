'use client'

import { putAdminSatker, putAssignMahasiswaToPembimbing, putUnassignMahasiswaToPembimbing } from '@/utils/kelola-user/admin-satker';
import { deletePembimbingLapangan, putPembimbingLapangan, putPembimbingLapanganWithPassword } from '@/utils/kelola-user/pembimbing-lapangan';
import { ActionIcon, Box, Button, Grid, GridCol, Group, Input, MultiSelect, Pill, Stack, Text, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDebouncedValue } from '@mantine/hooks';
import { closeModal, openModal } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import { IconSearch, IconSelectAll, IconZoomReplace } from '@tabler/icons-react';
import { IconX } from '@tabler/icons-react';
import { IconEye, IconEdit, IconTrash, IconExchange } from '@tabler/icons-react';
import { DataTable } from 'mantine-datatable'
import React, { useEffect, useState } from 'react'

export interface RecordPemlap {
    id: number
    nama: string
    nip: string
    satker: {
        nama: string
    },
    user: {
        email: string
    }
}

const PAGE_SIZES = [10, 15, 20];

const TablePembimbingLapanganAdminSatker = ({ records, loading, fetchData, dataMahasiswa, dataMahasiswaFull }: { records: RecordPemlap[], loading: boolean, fetchData: () => void; dataMahasiswa: { value: string; label: string; }[], dataMahasiswaFull: [] }) => {
    const [recordsMain, setRecordsMain] = useState(records);

    const [query, setQuery] = useState('');
    const [query2, setQuery2] = useState('');
    const [debouncedQuery] = useDebouncedValue(query, 200)
    const [debouncedQuery2] = useDebouncedValue(query2, 200)


    useEffect(() => {
        setRecordsMain(records.filter(({ nama, nip }) => {
            if (debouncedQuery !== '' && !`${nama}`.toLowerCase().includes(debouncedQuery.toLowerCase())) {
                return false;
            }

            if (debouncedQuery2 !== '' && !`${nip}`.toLowerCase().includes(debouncedQuery2.toLowerCase())) {
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
                {
                    accessor: 'index', title: 'No', textAlign: 'right', render(record, index) {
                        return index + 1
                    }, width: '40px'

                },
                {
                    accessor: 'nama', title: 'Nama', textAlign: 'left',
                    filter: (
                        <TextInput
                            label="Nama"
                            placeholder="Cari nama..."
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
                    accessor: 'nip', title: 'NIP', textAlign: 'left',
                    filter: (
                        <TextInput
                            label="NIP"
                            placeholder="Cari NIP..."
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
                { accessor: 'user.email', title: 'Email', textAlign: 'left' },
                { accessor: 'satker.nama', title: 'Satuan Kerja', textAlign: 'left' },
                {
                    accessor: 'mahasiswa', title: 'Mahasiswa', textAlign: 'left',
                    render: (record) => {
                        // Filter data mahasiswa by pemlapId
                        const dataMahasiswaFiltered = dataMahasiswaFull.filter((item: any) => item.pemlapId === record.id);

                        return (
                            <>
                                <Stack gap={'xs'}>
                                    {dataMahasiswaFiltered.map((item: any, index: number) => (
                                        <Pill size='xs' key={index}>{item.nama}</Pill>
                                    ))}
                                </Stack>
                            </>
                        );
                    }
                },
                {
                    accessor: 'aksi', title: 'Aksi',
                    textAlign: 'center',
                    width: '0%',
                    render: (record) => (
                        <Group gap={4} justify="right" wrap="nowrap">
                            <ActionIcon
                                size="sm"
                                variant="subtle"
                                color="green"
                                onClick={() => {
                                    showModal({ record, action: 'view', fetchData, dataMahasiswa, dataMahasiswaFull })
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
                                    showModal({ record, action: 'edit', fetchData, dataMahasiswa, dataMahasiswaFull })
                                }}
                                title='Ubah'
                            >
                                <IconEdit size={16} />
                            </ActionIcon>
                            <ActionIcon
                                size="sm"
                                variant="subtle"
                                color="red"
                                onClick={() => {
                                    showModal({ record, action: 'delete', fetchData, dataMahasiswa, dataMahasiswaFull })
                                }}
                                title='Hapus'
                            >
                                <IconTrash size={16} />
                            </ActionIcon>
                            {/* <ActionIcon
                                size="sm"
                                variant="subtle"
                                color="orange"
                                onClick={() => {
                                    showModal({ record, action: 'change' })
                                }}
                                title='Ganti'
                            >
                                <IconExchange size={16} />
                            </ActionIcon> */}
                        </Group>
                    ),
                }
            ]}
            records={recordsPaged}

        // totalRecords={records.length}
        // recordsPerPage={pageSize}
        // page={page}
        // onPageChange={setPage}
        // recordsPerPageOptions={PAGE_SIZES}
        // onRecordsPerPageChange={setPageSize}
        />
    )
}

const showModal = ({ record, action, fetchData, dataMahasiswa, dataMahasiswaFull }: { record: RecordPemlap; action: 'view' | 'edit' | 'delete' | 'change'; fetchData: () => void; dataMahasiswa: { value: string; label: string; }[], dataMahasiswaFull: [] }) => {

    // filter data mahasiswa by pemlapId
    const dataMahasiswaFiltered = dataMahasiswaFull.filter((item: any) => item.pemlapId === record.id).map((item: any) => {
        return {
            value: String(item.mahasiswaId),
            label: item.nama
        }
    });



    if (action === 'view') {
        openModal({
            modalId: action,
            title: 'Lihat Data Pembimbing Lapangan',
            children: (
                <Stack>
                    <TextInput label="NIP" value={record.nip} readOnly />
                    <TextInput label="Nama" value={record.nama} readOnly />
                    <TextInput label="Email" value={record.user.email} readOnly />
                    <TextInput label="Satuan Kerja" value={record.satker.nama} readOnly />

                    {/* <Grid gutter="md">
                        <GridCol span={2}>NIM</GridCol>
                        <GridCol span={10}>{record.nim}</GridCol>
                        <GridCol span={2}>Name</GridCol>
                        <GridCol span={10}>{record.nama}</GridCol>
                        <GridCol span={2}>Kelas</GridCol>
                        <GridCol span={10}>{record.kelas}</GridCol>
                        <GridCol span={4}>Pembimbing Lapangan</GridCol>
                        <GridCol span={6}>{record.pembimbing_lapangan}</GridCol>
                        <GridCol span={4}>Pembimbing Lapangan</GridCol>
                        <GridCol span={6}>{record.dosen_pembimbing}</GridCol>
                        <GridCol span={2}>Tempat Magang</GridCol>
                        <GridCol span={10}>{record.tempat_magang}</GridCol>
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
                    nip: record.nip,
                    nama: record.nama,
                    satker: record.satker.nama,
                    id: record.id,
                    email: record.user.email || '',
                    password: '',
                    mahasiswaBimbingan: dataMahasiswaFiltered.map((item: { value: string; }) => item.value),
                    mahasiswaBimbinganFull: dataMahasiswaFiltered.map((item: { value: string; }) => item.value),
                    // satker: record.satker
                },
                validate: {
                    email: (value) => {
                        if (value === '') {
                            return 'Email tidak boleh kosong';
                        }
                        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                        // Test the value against the regex pattern
                        if (!emailRegex.test(value)) {
                            return 'Alamat email tidak valid';
                        }
                    },
                    password: (value) => {
                        if (value.length < 6 && value !== '') {
                            return 'Password minimal 6 karakter';
                        }
                    }
                }
            });

            const [loadingButton, setLoadingButton] = useState(false);

            // Rest of the code...

            return (
                <form onSubmit={form.onSubmit(async (values) => {
                    try {
                        setLoadingButton(true);
                        // console.log(values);
                        if (values.password === '') {
                            await putPembimbingLapangan(values);
                        } else {
                            await putPembimbingLapanganWithPassword(values);
                        }

                        await putAssignMahasiswaToPembimbing(values);
                        await putUnassignMahasiswaToPembimbing(values)

                        notifications.show({
                            title: 'Berhasil',
                            message: 'Data pembimbing lapangan berhasil diubah',
                            color: 'blue',
                        });

                        fetchData();
                        closeModal(action);
                    } catch (error) {
                        console.log(error);
                        notifications.show({
                            title: 'Gagal',
                            message: `Error: ${error}`,
                            color: 'red',
                        });
                    } finally {
                        setLoadingButton(false);
                    }
                })}>
                    <Stack>
                        <TextInput label="Satuan Kerja" {...form.getInputProps('satker')} variant='filled' readOnly />
                        <TextInput label="NIP" {...form.getInputProps('nip')} />
                        <TextInput label="Nama" {...form.getInputProps('nama')} />
                        <TextInput label="Email" {...form.getInputProps('email')} />
                        <TextInput label="Password"
                            description='Minimal 6 karakter'
                            {...form.getInputProps('password')} />
                        <MultiSelect
                            label='Mahasiswa Bimbingan'
                            placeholder='Pilih mahaasiswa'
                            // select all icon
                            leftSection={
                                <ActionIcon
                                    title='Pilih semua mahasiswa'
                                    variant="subtle"
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => {
                                        form.setFieldValue('mahasiswaBimbingan', dataMahasiswa.map((item: { value: string; }) => item.value))
                                    }}
                                >
                                    <IconSelectAll size={14} />
                                </ActionIcon>}
                            data={dataMahasiswa}
                            // select all button
                            searchable
                            clearable
                            {...form.getInputProps('mahasiswaBimbingan')}
                        />
                        {/* <TextInput label="Password" {...form.getInputProps('password')} /> */}

                        <Button
                            loading={loadingButton}
                            type='submit' color='orange' variant='light'>Ubah</Button>
                    </Stack>
                </form>
            );
        };

        openModal({
            modalId: action,
            title: 'Edit Data Pembimbing Lapangan',
            closeOnClickOutside: false,
            children: (
                <FormComponent />
            ),
        });
    } else if (action === 'delete') {
        openModal({
            modalId: action,
            title: 'Hapus Data Pembimbing Lapangan',
            children: (
                <Stack>
                    <Text>Apakah anda yakin ingin menghapus data pembimbing lapangan ini?</Text>

                    <Grid gutter="md">
                        <GridCol span={2}>NIP</GridCol>
                        <GridCol span={10}>{record.nip}</GridCol>
                        <GridCol span={2}>Nama</GridCol>
                        <GridCol span={10}>{record.nama}</GridCol>
                    </Grid>
                    <Group justify="right">
                        <Button color='gray' variant='light' onClick={() => closeModal(action)}>Batal</Button>
                        <Button color='red' variant='light' onClick={async () => {
                            try {
                                const response = await deletePembimbingLapangan(record.id);
                                // console.log(response);

                                notifications.show({ title: 'Berhasil', message: 'Data pembimbing lapangan berhasil dihapus', color: 'teal' });
                                closeModal(action);
                                fetchData();
                            } catch (error) {
                                console.error('Failed to update data', error);
                                notifications.show({ title: 'Gagal', message: 'Data pembimbing lapangan gagal dihapus', color: 'red' });
                            }
                            closeModal(action)
                        }}>Hapus</Button>
                    </Group>
                </Stack>
            ),
        });
    } else if (action === 'change') {
        const FormComponent = () => {
            const form = useForm({
                initialValues: {
                    nip: "",
                    nama: "",
                    email: "",
                    satker: "",
                },
            });

            // Rest of the code...

            return (
                <form onSubmit={form.onSubmit((values) => { console.log(values) })}>
                    <Stack>
                        <TextInput label="NIP" {...form.getInputProps('nip')} placeholder='Masukkan NIP' withAsterisk required />
                        <TextInput label="Nama" {...form.getInputProps('nama')} placeholder='Masukkan Nama' withAsterisk required />
                        <TextInput label="Email" {...form.getInputProps('email')} placeholder='Masukkan Email' withAsterisk required />
                        <TextInput label="Satuan Kerja" {...form.getInputProps('satker')} placeholder='Masukkan Satuan Kerja' withAsterisk required />

                        <Button type='submit' color='orange' variant='light'>Ganti</Button>
                    </Stack>
                </form>
            );
        };

        openModal({
            modalId: action,
            title: 'Ganti Pembimbing Lapangan',
            children: (
                <FormComponent />
            ),
        });
    }
};


export default TablePembimbingLapanganAdminSatker