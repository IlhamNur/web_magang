'use client'

import { deleteUnitKerja, putUnitKerja } from '@/utils/unit-kerja';
import { ActionIcon, Box, Button, Grid, GridCol, Group, Input, NumberInput, Select, Stack, Text, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { closeModal, openModal } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import { IconEye, IconEdit, IconTrash } from '@tabler/icons-react';
import { DataTable } from 'mantine-datatable'
import React, { useEffect, useState } from 'react'

export interface RecordUnitKerja {
    id: number
    nama: string
    alamat: string
    email: string
    kodeKabupatenKota: string
    namaKabupatenKota: string
    kodeProvinsi: string
    namaProvinsi: string
    kodeSatker: number
    kapasitas: {
        kapasitas: number
    }
    latitude: number
    longitude: number
}

const PAGE_SIZES = [10, 15, 20];

const TableUnitKerja = ({ records, loading, fetchData }: { records: RecordUnitKerja[], loading: boolean, fetchData: () => void }) => {
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
                { accessor: 'no', title: 'No', textAlign: 'right', width: 40, render: (record, index) => (page - 1) * pageSize + (index + 1) },
                { accessor: 'nama', title: 'Nama Instansi', textAlign: 'left' },
                { accessor: 'alamat', title: 'Alamat', textAlign: 'left' },
                { accessor: 'email', title: 'Email', textAlign: 'left' },
                { accessor: 'namaKabupatenKota', title: 'Kabupaten/Kota', textAlign: 'left' },
                { accessor: 'namaProvinsi', title: 'Provinsi', textAlign: 'left' },
                { accessor: 'kodeSatker', title: 'Kode Satker', textAlign: 'left' },
                { accessor: 'kapasitas.kapasitas', title: 'Kapasitas', textAlign: 'left' },
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
                            <ActionIcon
                                size="sm"
                                variant="subtle"
                                color="red"
                                onClick={() => {
                                    showModal({ record, action: 'delete', fetchData })
                                }}
                                title='Hapus'
                            >
                                <IconTrash size={16} />
                            </ActionIcon>
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

const showModal = ({ record, action, fetchData }: { record: RecordUnitKerja; action: 'view' | 'edit' | 'delete'; fetchData: () => void }) => {

    if (action === 'view') {
        openModal({
            modalId: action,
            title: 'Lihat tempat magang',
            children: (
                <Stack>
                    <TextInput label="kodeSatker" value={record.kodeSatker} readOnly />
                    <TextInput label="Nama" value={record.nama} readOnly />
                    <TextInput label="Email" value={record.email} readOnly />
                    <TextInput label="Kabupaten/Kota" value={record.namaKabupatenKota} readOnly />
                    <TextInput label="Provinsi" value={record.namaProvinsi} readOnly />
                    <TextInput label="Kode Satker" value={record.kodeSatker} readOnly />
                    <TextInput label="Kapasitas" value={record.kapasitas?.kapasitas.toString()} readOnly />

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
                    kodeSatker: record.kodeSatker,
                    nama: record.nama,
                    email: record.email,
                    kapasitas: record.kapasitas?.kapasitas,
                    kodeKabupatenKota: record.kodeKabupatenKota,
                    kodeProvinsi: record.kodeProvinsi,
                    alamat: record.alamat,
                    latitude: record.latitude,
                    longitude: record.longitude,
                }
            });

            // Rest of the code...

            return (
                <form onSubmit={form.onSubmit(async (values) => {
                    console.log(values);
                    try {
                        const response = await putUnitKerja(values);
                        // console.log(response);

                        fetchData();
                        notifications.show({ title: 'Berhasil', message: 'Data Unit Kerja berhasil diubah', color: 'blue' });
                        closeModal(action);
                    } catch (error) {
                        console.error('Failed to update data', error);
                        notifications.show({ title: 'Gagal', message: 'Data Unit Kerja gagal diubah', color: 'red' });
                    }
                })}>
                    <Stack>
                        <TextInput label="Kode Satker" {...form.getInputProps('kodeSatker')} />
                        <TextInput label="Nama" {...form.getInputProps('nama')} />
                        <TextInput label="Email" {...form.getInputProps('email')} />
                        <TextInput label="Alamat" {...form.getInputProps('alamat')} />
                        <TextInput label="Kabupaten/Kota" {...form.getInputProps('kodeKabupatenKota')} />
                        <NumberInput
                            min={0}
                            label="Kapasitas" {...form.getInputProps('kapasitas')} />
                        <NumberInput
                            label="Latitude" {...form.getInputProps('latitude')}
                        />
                        <NumberInput
                            label="Longitude" {...form.getInputProps('longitude')}
                        />

                        <Button type='submit' color='orange' variant='light'>Ubah</Button>


                    </Stack>
                </form>
            );
        };

        openModal({
            modalId: action,
            title: 'Edit tempat magang',
            children: (
                <FormComponent />
            ),
        });
    } else if (action === 'delete') {
        openModal({
            modalId: action,
            title: 'Hapus tempat magang',
            children: (
                <Stack>
                    <Text>Apakah anda yakin ingin menghapus tempat magang ini?</Text>
                    <Grid gutter="md">
                        <GridCol span={2}>kode</GridCol>
                        <GridCol span={10}>{record.kodeSatker}</GridCol>
                        <GridCol span={2}>Nama</GridCol>
                        <GridCol span={10}>{record.nama}</GridCol>
                    </Grid>
                    <Group justify="right">
                        <Button color='gray' variant='light' onClick={() => closeModal(action)}>Batal</Button>
                        <Button color='red' variant='light' onClick={async () => {
                            try {
                                const response = await deleteUnitKerja(record.id);
                                // console.log(response);

                                notifications.show({ title: 'Berhasil', message: 'Data Unit Kerja berhasil dihapus', color: 'blue' });
                                closeModal(action);
                                fetchData();
                            } catch (error) {
                                console.error('Failed to update data', error);
                                notifications.show({ title: 'Gagal', message: 'Data Unit Kerja gagal dihapus', color: 'red' });
                            }
                            closeModal(action)
                        }}>Hapus</Button>
                    </Group>
                </Stack>
            ),
        });
    }
};


export default TableUnitKerja