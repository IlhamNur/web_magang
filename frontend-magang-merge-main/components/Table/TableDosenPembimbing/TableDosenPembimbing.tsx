'use client'

import { putAssignMahasiswaToDosen, putDosenPembimbing, putDosenPembimbingWihoutPassword, putUnassignMahasiswaToDosen } from '@/utils/kelola-user/dosen-pembimbing';
import { ActionIcon, Box, Button, Grid, GridCol, Group, Input, MultiSelect, Pill, Stack, Text, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDebouncedValue } from '@mantine/hooks';
import { closeModal, openModal } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import { IconSearch, IconSelectAll, IconX } from '@tabler/icons-react';
import { IconEye, IconEdit, IconTrash } from '@tabler/icons-react';
import { passwordRenderer } from 'handsontable/renderers';
import { DataTable } from 'mantine-datatable'
import React, { useEffect, useState } from 'react'

export interface RecordDosbing {
    id: number
    nama: string
    nip: string
    email: string
    dosenId: number
    prodi: string
    user: {
        userId: number
        email: string
    }

}

const PAGE_SIZES = [10, 15, 20];

const TableDosenPembimbing = ({ records, loading, fetchData, dataMahasiswa, dataMahasiswaFull }: { records: RecordDosbing[], loading: boolean, fetchData: () => void, dataMahasiswa: { value: string; label: string; }[], dataMahasiswaFull: [] }) => {
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
            withTableBorder
            withColumnBorders
            pinLastColumn
            columns={[
                { accessor: 'id', title: 'No', textAlign: 'right', hidden: true },
                { accessor: 'no', title: 'No', textAlign: 'right', width: 40, render: (record, index) => (page - 1) * pageSize + (index + 1) },
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
                {
                    accessor: 'mahasiswa', title: 'Mahasiswa', textAlign: 'left',
                    render: (record) => {
                        // Filter data mahasiswa by pemlapId
                        const dataMahasiswaFiltered = dataMahasiswaFull.filter((item: any) => item.dosenId === record.id);

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
                            {/* <ActionIcon
                                size="sm"
                                variant="subtle"
                                color="red"
                                onClick={() => {
                                    showModal({ record, action: 'delete', fetchData })
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

const showModal = ({ record, action, fetchData, dataMahasiswa, dataMahasiswaFull }: { record: RecordDosbing; action: 'view' | 'edit' | 'delete'; fetchData: () => void; dataMahasiswa: { value: string; label: string; }[], dataMahasiswaFull: [] }) => {
    // filter data mahasiswa by pemlapId
    const dataMahasiswaFiltered = dataMahasiswaFull.filter((item: any) => item.dosenId === record.id).map((item: any) => {
        return {
            value: String(item.mahasiswaId),
            label: item.nama
        }
    });

    if (action === 'view') {
        openModal({
            modalId: action,
            title: 'Lihat Data Dosen Pembimbing',
            children: (
                <Stack>
                    <TextInput label="NIP" value={record.nip} readOnly />
                    <TextInput label="Nama" value={record.nama} readOnly />
                    <TextInput label="Email" value={record.user.email} readOnly />

                    {/* <Grid gutter="md">
                        <GridCol span={2}>NIM</GridCol>
                        <GridCol span={10}>{record.nim}</GridCol>
                        <GridCol span={2}>Name</GridCol>
                        <GridCol span={10}>{record.nama}</GridCol>
                        <GridCol span={2}>Kelas</GridCol>
                        <GridCol span={10}>{record.kelas}</GridCol>
                        <GridCol span={4}>Pembimbing Lapangan</GridCol>
                        <GridCol span={6}>{record.pembimbing_lapangan}</GridCol>
                        <GridCol span={4}>Dosen Pembimbing</GridCol>
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
                    id: record.id,
                    nip: record.nip,
                    nama: record.nama,
                    prodi: record.prodi,
                    email: record.user.email,
                    password: '',
                    mahasiswaBimbingan: dataMahasiswaFiltered.map((item: { value: string; }) => item.value),
                    mahasiswaBimbinganFull: dataMahasiswaFiltered.map((item: { value: string; }) => item.value),
                },
                validate: {
                    email: (value) => {
                        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                        if (!emailRegex.test(value)) {
                            return 'Alamat email tidak valid';
                        }
                    },
                    password: (value) => {
                        if (value.length < 8 && value.length > 0) {
                            return 'Password minimal 8 karakter';
                        }
                    },
                }
            });

            const [loadingButton, setLoadingButton] = useState(false);
            // Rest of the code...

            return (
                <form onSubmit={form.onSubmit(async (values) => {
                    try {
                        setLoadingButton(true);

                        if (values.password === '') {
                            const response = await putDosenPembimbingWihoutPassword(values);
                        } else {
                            const response = await putDosenPembimbing(values);
                        }
                        // console.log(response);

                        await putAssignMahasiswaToDosen(values)
                        await putUnassignMahasiswaToDosen(values)

                        notifications.show({ title: 'Berhasil', message: 'Data dosen pembimbing berhasil diubah', color: 'teal' });
                        closeModal(action);
                        fetchData();
                    } catch (error) {
                        console.error('Failed to update data', error);
                        notifications.show({ title: 'Gagal', message: 'Data dosen pembimbing gagal diubah', color: 'red' });
                    } finally {
                        setLoadingButton(false);
                    }

                })}>
                    <Stack>
                        <TextInput label="NIP" {...form.getInputProps('nip')} />
                        <TextInput label="Nama" {...form.getInputProps('nama')} />
                        <TextInput label="Prodi" {...form.getInputProps('prodi')} />
                        <TextInput label="Email" {...form.getInputProps('email')} />
                        <TextInput label="Password" {...form.getInputProps('password')} />
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

                        <Button
                            loading={loadingButton}
                            type='submit' color='orange' variant='light'>Ubah</Button>
                    </Stack>
                </form>
            );
        };

        openModal({
            modalId: action,
            title: 'Edit Data Dosen Pembimbing',
            closeOnClickOutside: false,
            children: (
                <FormComponent />
            ),
        });
    } else if (action === 'delete') {
        openModal({
            modalId: action,
            title: 'Hapus Data Dosen Pembimbing',
            children: (
                <Stack>
                    <Text>Apakah anda yakin ingin menghapus data dosen pembimbing ini?</Text>
                    <Grid gutter="md">
                        <GridCol span={2}>NIP</GridCol>
                        <GridCol span={10}>{record.nip}</GridCol>
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


export default TableDosenPembimbing