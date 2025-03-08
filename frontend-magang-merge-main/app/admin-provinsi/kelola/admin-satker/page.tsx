'use client'
import React, { useEffect, useRef, useState } from 'react'
import { Button, Group, Modal, Select, Stack, Text, TextInput } from '@mantine/core'
import { IconFileImport, IconPlus } from '@tabler/icons-react'
import { useDisclosure } from '@mantine/hooks'
import { notifications } from '@mantine/notifications'
import { modals } from '@mantine/modals'
import { getAdminSatker, postAdminSatker } from '@/utils/kelola-user/admin-satker'
import { getUnitKerja } from '@/utils/unit-kerja'
import { useForm } from '@mantine/form'
import TableAdminSatker from '@/components/Table/TableAdminSatker/TableAdminSatker'

const KelolaAdminSatker = () => {
    const [data, setData] = useState([]);
    const [dataSatker, setDataSatker] = useState([]);
    const [loading, setLoading] = useState(true);
    const [opened, { open, close }] = useDisclosure(false);
    const submitButtonRef = useRef(null);
    const [loadingButton, setLoadingButton] = useState(false);

    const fetchData = async () => {
        try {
            const response = await getAdminSatker();
            const response2 = await getUnitKerja();

            let modifiedData = response.data.map((item: { adminSatkerId: any; }) => ({
                ...item,
                id: item.adminSatkerId,  // Add the `id` field using `adminSatkerId`
            }));
            modifiedData = modifiedData.sort((a: { id: number; }, b: { id: number; }) => a.id - b.id);
            // console.log(modifiedData);
            setData(modifiedData);

            // set dataSatker
            let modifiedDataSatker = response2.data.map((item: { satkerId: any; nama: any; }) => ({
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

    useEffect(() => {
        fetchData();
    }, []);

    const form = useForm({
        initialValues: {
            nip: '',
            nama: '',
            satkerId: '',
            email: '',
            password: '',
        },
        validate: {
            nip: (value) =>
                value !== '' ? null : 'NIP tidak boleh kosong',
            nama: (value) =>
                value !== '' ? null : 'Nama tidak boleh kosong',
            satkerId: (value) =>
                value !== '' ? null : 'satkerId tidak boleh kosong',
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
                if (value === '') {
                    return 'Password tidak boleh kosong';
                }
                if (value.length < 6) {
                    return 'Password minimal 6 karakter';
                }
            }

        },
    })


    return (
        <>
            <Text c="dimmed" mb="md">Kelola Admin Satker</Text>
            <Group mb={10}>
                <Button leftSection={<IconPlus size={14} />}
                    onClick={open}
                >Tambah</Button>
            </Group>
            <TableAdminSatker records={data} loading={loading} fetchData={fetchData} />


            <Modal
                size="md"
                opened={opened}
                onClose={close}
                closeOnClickOutside={false}
                title={<Text size="xl">Tambah Admin Satker</Text>}
                centered
                overlayProps={{
                    backgroundOpacity: 0.55,
                    blur: 3,
                }}
            >
                <form onSubmit={form.onSubmit(async (values) => {
                    try {
                        setLoadingButton(true);

                        const response = await postAdminSatker(values);

                        notifications.show({
                            title: 'Berhasil',
                            message: 'Admin satker berhasil ditambahkan',
                            color: 'blue',
                        });


                        setLoading(true);
                        await fetchData();
                        close();
                        form.reset();
                    } catch (error) {
                        console.log(error);
                        notifications.show({
                            title: 'Gagal',
                            message: 'Admin satker gagal ditambahkan',
                            color: 'red',
                        });
                    } finally {
                        setLoadingButton(false);
                    }
                })}>
                    <Stack>
                        <TextInput
                            label="NIP"
                            placeholder="Masukkan NIP"

                            {...form.getInputProps('nip')}
                        />
                        <TextInput
                            label="Nama"
                            placeholder="Masukkan Nama"

                            {...form.getInputProps('nama')}
                        />
                        <Select
                            label="Satuan Kerja"
                            placeholder="Pilih Satuan Kerja"

                            data={dataSatker}
                            {...form.getInputProps('satkerId')}
                        />
                        <TextInput
                            label="Email"
                            placeholder="Masukkan Email"

                            {...form.getInputProps('email')}
                        />
                        <TextInput
                            label="Password"
                            placeholder="Masukkan Password"

                            // type="password"
                            {...form.getInputProps('password')}
                        />

                        <Group justify="right">
                            <Button
                                loading={loadingButton}
                                type="submit"
                                ref={submitButtonRef}
                                style={{ display: 'none' }} // Hide the button
                                color="blue"
                                variant="light">Simpan</Button>
                            <Button onClick={() => {
                                modals.openConfirmModal({
                                    title: 'Batal Penambahan Admin Satker',
                                    centered: true,
                                    children: (
                                        <Text size="sm">
                                            Apakah anda yakin ingin membatalkan penambahan Admin Satker ini?
                                        </Text>
                                    ),
                                    labels: { confirm: 'Ya', cancel: 'Tidak' },
                                    cancelProps: { variant: 'light', color: 'gray' },
                                    confirmProps: { variant: 'light', color: 'red' },
                                    onCancel: () => console.log('Cancel'),
                                    onConfirm: () => {
                                        form.reset();
                                        close();
                                    }
                                });
                            }}
                                color="red" variant="light">Batal</Button>
                            <Button
                                loading={loadingButton}
                                type="button"
                                onClick={() => {
                                    modals.openConfirmModal({
                                        // title: 'Simpan Kegiatan',
                                        centered: true,
                                        children: (
                                            <Text size="sm">
                                                Apakah anda yakin ingin menyimpan Admin Satker ini?
                                            </Text>
                                        ),
                                        labels: { confirm: 'Ya', cancel: 'Tidak' },
                                        cancelProps: { variant: 'light', color: 'gray' },
                                        confirmProps: { variant: 'light', color: 'blue' },
                                        onCancel: () => console.log('Cancel'),
                                        onConfirm: () => {
                                            if (submitButtonRef.current) {
                                                (submitButtonRef.current as any).click();
                                            }
                                            // close()
                                        }
                                    });
                                }}
                                color="blue"
                                variant="light">Simpan</Button>
                        </Group>

                    </Stack>

                </form>
            </Modal >
        </>
    )
}

export default KelolaAdminSatker