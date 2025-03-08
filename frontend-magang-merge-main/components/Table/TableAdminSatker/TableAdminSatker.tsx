'use client'

import { putAdminSatker, putAdminSatkerWithoutPassword } from '@/utils/kelola-user/admin-satker';
import { ActionIcon, Box, Button, Grid, GridCol, Group, Input, Stack, Text, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { closeModal, openModal } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import { IconZoomReplace } from '@tabler/icons-react';
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

const TableAdminSatker = ({ records, loading, fetchData }: { records: RecordPemlap[], loading: boolean, fetchData: () => void }) => {
    // pagination
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);

    useEffect(() => {
        setPage(1);
    }, [pageSize]);

    const [page, setPage] = useState(1);
    const [recordsPaged, setRecordsPaged] = useState(records.slice(0, pageSize));

    useEffect(() => {
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        setRecordsPaged(records.slice(from, to));
    }, [page, pageSize, records]);

    return (
        <DataTable
            fetching={loading}
            pinLastColumn
            columns={[
                { accessor: 'id', title: 'No', textAlign: 'right', hidden: true },
                {
                    accessor: 'index', title: 'No', textAlign: 'right', width: 40, render: (record) => records.indexOf(record) + 1

                },
                { accessor: 'nama', title: 'Nama', textAlign: 'left' },
                { accessor: 'nip', title: 'NIP', textAlign: 'left' },
                { accessor: 'user.email', title: 'Email', textAlign: 'left' },
                { accessor: 'satker.nama', title: 'Satuan Kerja', textAlign: 'left' },
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
                                    showModal({ record, action: 'view', fetchData })
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
                                    showModal({ record, action: 'edit', fetchData })
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

            totalRecords={records.length}
            recordsPerPage={pageSize}
            page={page}
            onPageChange={setPage}
            recordsPerPageOptions={PAGE_SIZES}
            onRecordsPerPageChange={setPageSize}
        />
    )
}

const showModal = ({ record, action, fetchData }: { record: RecordPemlap; action: 'view' | 'edit' | 'delete' | 'change'; fetchData: () => void }) => {

    if (action === 'view') {
        openModal({
            modalId: action,
            title: 'Lihat Data Admin Satuan Kerja',
            children: (
                <Stack>
                    <TextInput label="Nama" value={record.nama} readOnly />
                    <TextInput label="NIP" value={record.nip} readOnly />
                    <TextInput label="Email" value={record.user.email} readOnly />
                    <TextInput label="Satuan Kerja" value={record.satker.nama} readOnly />

                    {/* <Grid gutter="md">
                        <GridCol span={2}>NIM</GridCol>
                        <GridCol span={10}>{record.nim}</GridCol>
                        <GridCol span={2}>Name</GridCol>
                        <GridCol span={10}>{record.nama}</GridCol>
                        <GridCol span={2}>Kelas</GridCol>
                        <GridCol span={10}>{record.kelas}</GridCol>
                        <GridCol span={4}>Admin Satuan Kerja</GridCol>
                        <GridCol span={6}>{record.pembimbing_lapangan}</GridCol>
                        <GridCol span={4}>Admin Satuan Kerja</GridCol>
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
                            await putAdminSatkerWithoutPassword(values);
                        } else {
                            await putAdminSatker(values);
                        }

                        notifications.show({
                            title: 'Berhasil',
                            message: 'Data Admin Satuan Kerja berhasil diubah',
                            color: 'blue',
                        });

                        fetchData();
                        closeModal(action);
                    } catch (error) {
                        console.log(error);
                        notifications.show({
                            title: 'Gagal',
                            message: 'Data Admin Satuan Kerja gagal diubah',
                            color: 'red',
                        });
                    } finally {
                        setLoadingButton(false);
                    }
                })}>
                    <Stack>
                        <TextInput label="Nama" {...form.getInputProps('nama')} />
                        <TextInput label="NIP" {...form.getInputProps('nip')} />
                        <TextInput label="Satuan Kerja" {...form.getInputProps('satker')} variant='filled' readOnly />
                        <TextInput label="Email" {...form.getInputProps('email')} />
                        <TextInput label="Password" {...form.getInputProps('password')} />

                        <Button
                            loading={loadingButton}
                            type='submit' color='orange' variant='light'>Ubah</Button>
                    </Stack>
                </form>
            );
        };

        openModal({
            modalId: action,
            title: 'Edit Data Admin Satuan Kerja',
            children: (
                <FormComponent />
            ),
        });
    } else if (action === 'delete') {
        openModal({
            modalId: action,
            title: 'Hapus Data Admin Satuan Kerja',
            children: (
                <Stack>
                    <Text>Apakah anda yakin ingin menghapus data Admin Satuan Kerja ini?</Text>

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
            title: 'Ganti Admin Satuan Kerja',
            children: (
                <FormComponent />
            ),
        });
    }
};


export default TableAdminSatker