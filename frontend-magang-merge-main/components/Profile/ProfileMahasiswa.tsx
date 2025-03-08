'use client'

import { getProfile } from "@/utils/get-profile";
import { TextInput, Box, Text, Group, Stack, Select, SimpleGrid, Fieldset, Button, LoadingOverlay } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { init } from "next/dist/compiled/webpack/webpack";
import { useEffect, useState } from "react";
import ChangePassword from "./ChangePassword";

interface ProfileData {
    id: number;
    nim: string;
    nama: string;
    email: string;
    no_hp: string;
    kelas: string;
    prodi: string;
    tempat_tanggal_lahir: string;
    alamat: string;
    bank: string;
    no_rekening: string;
    atas_nama: string;
    namaDosen: string;
    namaPemlap: string;
}

const Profile = () => {

    const [data, setData] = useState({} as ProfileData);
    const [loading, setLoading] = useState(true);

    const form = useForm({
        initialValues: {
            nim: '',
            bank: '',
            no_rekening: '',
            atas_nama: '',
        },

        validate: {
            bank: (value) => {
                if (!value) {
                    return 'Bank tidak boleh kosong';
                }
            },
            no_rekening: (value) => {
                if (!value) {
                    return 'No. Rekening tidak boleh kosong';
                }
                if (!/^\d+$/.test(value)) {
                    return 'No. Rekening harus berupa angka';
                }
            },
            atas_nama: (value) => {
                if (!value) {
                    return 'Atas Nama tidak boleh kosong';
                }
            }
        }
    });

    const fetchData = async () => {
        const response = await getProfile();
        // const res = await response.json();
        // console.log(response.data);
        // combine response.data.email to reesponse.data.mahasiswa.email

        let newResponse = {
            ...response.data.mahasiswa,
            email: response.data.email,
            namaDosen: response.data.mahasiswa.dosenPembimbingMagang?.nama,
            namaPemlap: response.data.mahasiswa.pembimbingLapangan?.nama
        }
        // console.log(newResponse);

        // Update your state with the new data
        setData(newResponse);

        setLoading(false)
    }

    const formUpdate = async () => {
        form.setValues({
            nim: data.nim,
            bank: data.bank,
            no_rekening: data.no_rekening,
            atas_nama: data.atas_nama,
        });
    }

    useEffect(() => {
        fetchData();
        formUpdate();
    }, []);



    return (
        <>
            <Text c="dimmed" mb="md">Profil</Text>
            <SimpleGrid cols={{ base: 1, md: 2 }} spacing="lg" pos="relative">
                <LoadingOverlay visible={loading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
                <Stack justify="flex-start">
                    <TextInput label="NIM" placeholder="NIM" readOnly value={data.nim || ''} />
                    <TextInput label="Nama" placeholder="Nama" readOnly value={data.nama || ''} />
                    <TextInput label="Email" placeholder="Email" readOnly value={data.email || ''} />
                    {/* <TextInput label="No. HP" placeholder="-" readOnly value={data.no_hp || ''} /> */}
                    <TextInput label="Kelas" placeholder="Kelas" readOnly value={data.kelas || ''} />
                    <TextInput label="Prodi" placeholder="Prodi" readOnly value={data.prodi || ''} />
                    {/* <TextInput label="Tempat, Tanggal Lahir" placeholder="Tempat, Tanggal Lahir" readOnly value={data.tempat_tanggal_lahir || ''} /> */}
                    <TextInput label="Alamat" placeholder="Alamat" readOnly value={data.alamat || ''} />
                    <TextInput label="Dosen Pembimbing Magang" readOnly value={data.namaDosen || ''} />
                    <TextInput label="Pembimbing Magang" readOnly value={data.namaPemlap || ''} />

                </Stack>
                <ChangePassword />
                {/* <Fieldset legend="Rekening" h={"min-content"}>
                    <form onSubmit={form.onSubmit((values) => {
                        fetch('/api/profil/mahasiswa', {
                            method: 'PUT',
                            body: JSON.stringify(values),
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        }).then((res) => res.json())
                            .then((res) => {
                                console.log(res);
                                setLoading(true);
                                notifications.show({
                                    title: 'Berhasil',
                                    message: 'Data rekening berhasil disimpan',
                                    color: 'blue'
                                });
                                fetchData();
                            }
                            ).catch((res) => {
                                console.log(res)
                                notifications.show({
                                    title: 'Gagal',
                                    message: 'Data rekening gagal disimpan',
                                    color: 'red'
                                });
                            });
                    })}>
                        <Stack justify="flex-start" >
                            <Select
                                label="Bank" placeholder="Bank" data={["BRI", "BCA", "BNI"]}
                                // value={data.bank || ''}
                                {...form.getInputProps("bank")}
                            />
                            <TextInput
                                label="No. Rekening" placeholder="No. Rekening"
                                // value={data.no_rekening || ''}
                                {...form.getInputProps("no_rekening")}
                            />
                            <TextInput label="Atas Nama" placeholder="Atas Nama"
                                // value={data.atas_nama || ''}
                                {...form.getInputProps("atas_nama")}
                            />
                            <Group justify="flex-end">
                                <Button type="submit"
                                    variant="light"
                                >Simpan</Button>
                            </Group>
                        </Stack>
                    </form>
                </Fieldset> */}
            </SimpleGrid >
        </>
    );
}

export default Profile