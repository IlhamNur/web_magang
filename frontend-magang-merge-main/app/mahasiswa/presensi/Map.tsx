'use client'

import { ActionIcon, Alert, Box, Button, Card, Divider, FileButton, FileInput, Group, Loader, LoadingOverlay, Paper, rem, SimpleGrid, Stack, Text, TextInput } from '@mantine/core';
// components/Map.js (or any other component/page)
import React, { useEffect, useRef, useState } from 'react';
import { PresensiProps } from './page';
import { IconAlertCircle, IconCalendar, IconFile, IconList, IconMapPin, IconUpload } from '@tabler/icons-react';
import { notifications } from '@mantine/notifications';
import { useForm } from '@mantine/form';
import { modals, openModal } from '@mantine/modals';
import { getPerizinan, getPresensiManual, postDatang, postPresensi, putPulang } from '@/utils/presensi';
import { getToken } from '@/utils/get-profile';
import TablePresensiManual from '@/components/Table/TablePresensi/TablePresensiManual';
import { DateInput } from '@mantine/dates';

export interface MapProps {
    latitude: number | null;
    longitude: number | null;
}

function haversine(lat1: any, lon1: any, lat2: any, lon2: any) {
    const R = 6371.0; // Radius bumi dalam kilometer
    const toRadians = (degree: any) => degree * (Math.PI / 180);

    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);

    const lat1Rad = toRadians(lat1);
    const lat2Rad = toRadians(lat2);

    const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    return distance;
}

const Map = ({ currentLocation, targetLocation, fetchData, records, loading }: { currentLocation: MapProps, targetLocation: PresensiProps, fetchData: () => void, records: any, loading: boolean }) => {
    const mapUrl = `https://www.google.com/maps?q=${currentLocation.latitude},${currentLocation.longitude}&output=embed`;
    const mapTargetUrl = `https://www.google.com/maps?q=${targetLocation.latitude},${targetLocation.longitude}`;
    // local time string interval 1 second
    const [localTime, setLocalTime] = useState<string | null>(null);
    // local day and date 
    const date = new Date();
    const dateString = date.toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

    useEffect(() => {
        const interval = setInterval(() => {
            setLocalTime(new Date().toLocaleTimeString());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const [distance, setDistance] = useState<number | null>(null);

    // perizinan form
    const submitButtonRef = useRef<HTMLButtonElement>(null);

    const [isFormSubmitted, setIsFormSubmitted] = useState(false); // cek if form is submitted

    const [dataPresensiManual, setDataPresensiManual] = useState<any[]>([]);
    const [dataPresensiManualToday, setDataPresensiManualToday] = useState<any[]>([]);
    const [loadingButtonKirim, setLoadingButtonKirim] = useState(false);
    const [loadingButtonTandai, setLoadingButtonTandai] = useState(false);

    const fetchDataPresensiManual = async () => {
        try {
            const response = await getPresensiManual();
            let modifiedDataPresensiManual = response.data.map((item: { presensiManualId: any; }) => ({
                ...item,
                id: item.presensiManualId,  // Add the `id` field using `presensiManualId`
            }));

            // sort by date
            modifiedDataPresensiManual.sort((a: { tanggal: string; }, b: { tanggal: string; }) => new Date(b.tanggal).getTime() - new Date(a.tanggal).getTime());

            const filteredData = response.data.filter((item: { tanggal: string; }) => new Date(item.tanggal).toLocaleDateString() === new Date().toLocaleDateString());

            setDataPresensiManual(modifiedDataPresensiManual);
            setDataPresensiManualToday(filteredData);
        } catch (error) {
            console.error("Failed to fetch data", error);
        }
    }

    useEffect(() => {
        fetchDataPresensiManual();
    }, []);

    useEffect(() => {
        // Update form submission status based on the updated state.
        if (dataPresensiManualToday.length === 0) {
            setIsFormSubmitted(false);
        } else {
            setIsFormSubmitted(true);
        }
    }, [dataPresensiManualToday]); // Dependency array, re-run this effect when `dataPresensiManualToday` changes.

    const form = useForm({
        initialValues: {
            tanggal: '',
            keterangan: '',
            id: '',
            filePresensi: null,
        },
        validate: {
            tanggal: (value) => {
                if (!value) {
                    return 'tanggal tidak boleh kosong';
                }
            },
            keterangan: (value) => {
                if (!value) {
                    return 'keterangan tidak boleh kosong';
                }
            },
            // filePresensi: (filePresensi: File) => {
            //     if (!filePresensi) {
            //         return 'file tidak boleh kosong';
            //     }

            //     if (filePresensi.size > 20 * 1024 * 1024) {
            //         return 'File tidak boleh lebih dari 20MB';
            //     }
            // },
        }
    });

    // useEffect(() => {
    //     if (dataPresensiManualToday.length > 0) {
    //         form.setValues({
    //             keterangan: dataPresensiManualToday[0].keterangan,
    //             id: dataPresensiManualToday[0].id,
    //         });
    //     }
    // }, [dataPresensiManualToday, form]);

    const [file, setFile] = useState<File | null>(null);

    // useEffect(() => {
    //     if (currentLocation.latitude && currentLocation.longitude) {
    //         setDistance(
    //             Math.sqrt(
    //                 Math.pow(currentLocation.latitude - targetLocation?.latitude!, 2) +
    //                 Math.pow(currentLocation.longitude - targetLocation?.longitude!, 2)
    //             )
    //         );
    //     }
    // }, [currentLocation, targetLocation]);

    useEffect(() => {
        if (currentLocation.latitude && currentLocation.longitude && targetLocation?.latitude && targetLocation?.longitude) {
            const dist = haversine(currentLocation.latitude, currentLocation.longitude, targetLocation.latitude, targetLocation.longitude);
            setDistance(dist);
        }
    }, [currentLocation, targetLocation]);

    const withinRadius = distance !== null && distance <= 0.05;

    const formatDistance = (distance: number) => {
        if (distance < 1) {
            return `${(distance * 1000).toFixed(2)} meter`;
        }
        return `${distance.toFixed(2)} km`;
    };

    const handleFileUpload = async (value: any, file: any) => {
        const token = await getToken();
        // const mahasiswaId = await getMahasiswaId();

        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);

        const formdata = new FormData();
        formdata.append("json", JSON.stringify({
            keterangan: value.keterangan,
            tanggal: value.tanggal.setHours(9)
        }));

        formdata.append("file", file);

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: formdata,
        };

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/presensi-manual`, requestOptions);
            if (!response.ok) {
                throw new Error(await response.text());
            }
        } catch (error) {
            throw new Error(`${error}`);

        }
    }

    // const handleUpdateFileUpload = async (value: any, file: any) => {
    //     const token = await getToken();
    //     const presensiManualId = value.id;

    //     const myHeaders = new Headers();
    //     myHeaders.append("Authorization", `Bearer ${token}`);

    //     const formdata = new FormData();
    //     formdata.append("json", JSON.stringify({
    //         keterangan: value.keterangan,

    //     }));

    //     formdata.append("file", file);

    //     const requestOptions = {
    //         method: "PUT",
    //         headers: myHeaders,
    //         body: formdata,
    //     };

    //     try {
    //         const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/presensi-manual/${presensiManualId}`, requestOptions);
    //         if (!response.ok) {
    //             console.log(await response.json());
    //             throw new Error('Failed to fetch data');
    //         }
    //     } catch (error) {
    //         throw new Error('Failed to fetch data');
    //     }
    // }

    return (
        <>
            <SimpleGrid cols={{ base: 1, md: 2 }} spacing="md" mt="lg">
                <Stack gap="md" h={"100%"}>
                    <Card shadow="xs" padding="md" radius="sm" withBorder>
                        <LoadingOverlay visible={loading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
                        <Stack gap="xs">
                            <Group justify='space-between' wrap='nowrap'>
                                <Text size='lg' fw={500}>Lokasi Magang: {targetLocation?.nama}</Text>
                                <ActionIcon
                                    variant='light'
                                    size="lg"
                                    onClick={() => {
                                        window.open(mapTargetUrl, '_blank');
                                    }}
                                    title='Lokasi magang'
                                >
                                    <IconMapPin style={{ width: '70%', height: '70%' }} stroke={1.5} />
                                </ActionIcon>
                            </Group>
                            <Text size='md'>{dateString}</Text>
                            <Text size='xl' fw={700}
                            >{localTime ? localTime : <Loader color="grey" type="dots" />}</Text>

                            {/* {disable button if current location is not in radius of 50m target location} */}
                            <Group justify={withinRadius ? 'right' : 'space-between'}
                                wrap="nowrap">
                                {distance !== null ? (
                                    <Alert variant='light' color='red' title='Anda di luar lokasi magang' hidden={withinRadius} icon={<IconAlertCircle />} >
                                        <Text size='xs' c="dimmed">Jarak Anda dengan lokasi magang adalah {distance && formatDistance(distance)}</Text>
                                    </Alert>) : (
                                    <Alert variant='light' color='red' title='Aktifkan Lokasi' hidden={withinRadius} icon={<IconAlertCircle />}>
                                        <Text size='xs' c="dimmed">Pastikan Anda mengaktifkan akses lokasi di browser Anda</Text>
                                    </Alert>
                                )}
                                <Button
                                    loading={loadingButtonTandai}
                                    variant="light"
                                    disabled={!withinRadius}
                                    // check if already datang in that day
                                    // || records.some((record: { tanggal: string; }) => new Date(record.tanggal).toLocaleDateString() === new Date().toLocaleDateString())

                                    // || (new Date().getHours() >= 8 && new Date().getHours() <= 15)
                                    // || (new Date().getHours() >= 18 && new Date().getHours() <= 6)
                                    // }
                                    onClick={async () => {
                                        try {
                                            setLoadingButtonTandai(true);

                                            // const pad = (num: any) => num.toString().padStart(2, '0');

                                            // const offset = -waktu.getTimezoneOffset();
                                            // const sign = offset >= 0 ? '+' : '-';
                                            // const hoursOffset = pad(Math.floor(Math.abs(offset) / 60));
                                            // const minutesOffset = pad(Math.abs(offset) % 60);

                                            // const isoStringWithTimeZone = `${waktu.getFullYear()}-${pad(waktu.getMonth() + 1)}-${pad(waktu.getDate())}T${pad(waktu.getHours())}:${pad(waktu.getMinutes())}:${pad(waktu.getSeconds())}`;

                                            // const tanggal = waktu.toLocaleDateString();
                                            // const tanggal = new Date().toLocaleDateString();
                                            const values = {
                                                waktu: new Date().toLocaleString('en-US'),
                                                tanggal: new Date().toLocaleString('en-US'),
                                            };

                                            // console.log(values)

                                            const response = await postPresensi(values);

                                            // if (!response.ok) {
                                            //     throw new Error("Failed to post presensi");
                                            //     console.log(await response.text());
                                            // }

                                            fetchData();
                                            notifications.show({
                                                title: 'Berhasil',
                                                message: 'Anda berhasil menandai kedatangan',
                                                color: 'green',
                                            });

                                        } catch (error) {
                                            notifications.show({
                                                title: 'Gagal',
                                                message: 'Anda tidak bisa menandai kedatangan saat ini',
                                                color: 'red',
                                            });
                                        } finally {
                                            setLoadingButtonTandai(false);
                                        }
                                    }}
                                >
                                    Tandai
                                </Button>
                            </Group>
                        </Stack>
                    </Card>

                    {/* perizinan card */}
                    <Card shadow="xs" padding="md" radius="sm" withBorder>
                        <form onSubmit={form.onSubmit(async (values) => {
                            try {
                                setLoadingButtonKirim(true);
                                console.log(values);
                                // if (isFormSubmitted) {
                                // await handleUpdateFileUpload(values, file);
                                // } else {
                                await handleFileUpload(values, file);
                                // }

                                notifications.show({
                                    title: 'Berhasil',
                                    message: 'Anda berhasil mengirim presensi manual',
                                    color: 'green',
                                });
                                fetchData();
                                fetchDataPresensiManual();
                                modals.closeAll();
                            } catch (error) {
                                notifications.show({
                                    title: 'Gagal',
                                    message: `Anda gagal mengirim presensi manual`,
                                    color: 'red',
                                });
                            } finally {
                                setLoadingButtonKirim(false);
                            }
                        })}>
                            <LoadingOverlay visible={loading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
                            <Stack gap="xs">
                                <Text size='md' fw={500}>Presensi Manual</Text>
                                {/* <Text size='sm'>Dilakukan ketika terdapat kendala dalam presensi, kirimkan keterangan dan bukti</Text> */}

                                {/* <Group grow>
                                    <TextInput
                                        placeholder="Keterangan"
                                        required
                                        {...form.getInputProps('keterangan')}
                                    />
                                    <Group grow>
                                        <FileButton

                                            onChange={(files) => {
                                                setFile(files);
                                                // form.setFieldValue('file', files);
                                            }}
                                            accept="image/png,image/jpeg,application/pdf">
                                            {(props) =>
                                                <Button {...props}
                                                    variant="outline"
                                                    color='gray'
                                                >Pilih fail...</Button>}
                                        </FileButton>
                                        {file ? (
                                            <Text lineClamp={2} size="xs" ta="center" >
                                                {file.name}
                                            </Text>
                                        ) : (
                                            <Text size="xs" ta="left" c="dimmed" fs="italic">
                                                Tidak ada fail yang dipilih
                                            </Text>
                                        )
                                        }
                                    </Group>
                                </Group> */}
                                <DateInput
                                    valueFormat='DD-MM-YYYY'
                                    label="Tanggal"
                                    placeholder="Tanggal Presensi"
                                    size='xs'
                                    leftSection={<IconCalendar size={16} />}
                                    {...form.getInputProps('tanggal')}
                                />

                                <TextInput
                                    label="Keterangan"
                                    placeholder="Keterangan"
                                    size='xs'

                                    description="Keterangan presensi manual"
                                    {...form.getInputProps('keterangan')}
                                />
                                {/* <Group grow>
                                    <FileButton
                                        onChange={(files) => {
                                            setFile(files);
                                            // form.setFieldValue('file', files);
                                        }}
                                        accept="image/png,image/jpeg,application/pdf">
                                        {(props) =>
                                            <Button {...props}
                                                variant="outline"
                                                color='gray'
                                            >Pilih fail...</Button>}
                                    </FileButton>
                                    {file ? (
                                        <Text lineClamp={2} size="xs" ta="center" >
                                            {file.name}
                                        </Text>
                                    ) : (
                                        <Text size="xs" ta="left" c="dimmed" fs="italic">
                                            Tidak ada fail yang dipilih
                                        </Text>
                                    )
                                    }
                                </Group> */}
                                <FileInput
                                    label="Bukti"
                                    size='xs'
                                    placeholder="Pilih file"
                                    value={file}
                                    onChange={setFile}

                                    description="Bukti dapat berupa jpg, jpeg, png, atau pdf (max 2MB)"
                                    leftSection={<IconFile size={16} />}
                                // {...form.getInputProps('filePresensi')}
                                />


                                <Group justify='space-between' mt="xs">
                                    <Button
                                        size='xs'
                                        variant='default'
                                        color='gray'
                                        leftSection={<IconList style={{ width: rem(16), height: rem(16) }} />}
                                        onClick={() => {
                                            openModal({
                                                centered: true,
                                                size: 'lg',
                                                modalId: 'list-presensi-manual',
                                                title: 'Daftar Presensi Manual',
                                                children: (
                                                    // <Stack gap="md">
                                                    //     {dataPresensiManual.length === 0 ? (
                                                    //         <Text size='sm' c='gray'>Tidak ada data presensi manual</Text>
                                                    //     ) : (
                                                    //         dataPresensiManual.map((item) => (
                                                    //             <Card shadow="xs" padding="md" radius="sm" withBorder>
                                                    //                 <Stack gap="xs">
                                                    //                     <Text size='sm' fw={500}>{item.keterangan}</Text>
                                                    //                     <Text size='xs' c='dimmed'>{item.waktu}</Text>
                                                    //                 </Stack>
                                                    //             </Card>
                                                    //         ))
                                                    //     )}
                                                    // </Stack>
                                                    <TablePresensiManual records={dataPresensiManual} fetchData={fetchDataPresensiManual} />
                                                ),
                                            });
                                        }}>
                                        List
                                    </Button>
                                    <Button

                                        type="submit"
                                        ref={submitButtonRef}
                                        style={{ display: 'none' }}
                                        variant="light">Simpan</Button>
                                    {/* {isFormSubmitted && (
                            <Alert variant='light' color='green' title='Draft Laporan Magang telah terkirim' icon={<IconCheck />} />
                        )} */}
                                    <Button
                                        loading={loadingButtonKirim}
                                        size='xs'
                                        type='button'
                                        variant="light"
                                        leftSection={<IconUpload style={{ width: rem(16), height: rem(16) }} />}
                                        onClick={() => {
                                            modals.openConfirmModal({
                                                centered: true,
                                                children: (
                                                    <Text size="sm">
                                                        {isFormSubmitted ? 'Apakah anda yakin ingin mengirim ulang presensi manual?' : 'Apakah anda yakin ingin mengirim presensi manual'}
                                                    </Text>
                                                ),
                                                labels: { confirm: 'Ya', cancel: 'Tidak' },
                                                cancelProps: { variant: 'light', color: 'gray' },
                                                confirmProps: { variant: 'light', color: 'blue' },
                                                onCancel: () => console.log('Cancel'),
                                                onConfirm: () => {
                                                    if (submitButtonRef.current) {
                                                        submitButtonRef.current.click();
                                                    }
                                                }
                                            });
                                        }}
                                    >
                                        {isFormSubmitted ? 'Kirim Ulang' : 'Kirim'}
                                    </Button>
                                </Group>

                            </Stack>
                        </form>
                    </Card>
                </Stack >

                {/* <Card shadow="xs" padding="md" radius="sm" withBorder>
                    <LoadingOverlay visible={loading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
                    <Card.Section>

                    </Card.Section>
                </Card> */}
                <Paper shadow='xs' radius='sm' withBorder style={{ position: 'relative', height: '100%' }}>
                    <LoadingOverlay visible={loading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
                    <iframe
                        title="User Location Map"
                        width="100%"
                        height="100%"
                        src={mapUrl}
                        allowFullScreen
                        loading="lazy"
                        style={{
                            border: "none",
                            borderRadius: "0.25rem", // Example: Add border radius
                            boxShadow: "0 1px 2px rgba(0, 0, 0, 0.1)" // Example: Add shadow
                        }}
                    ></iframe>
                </Paper>
            </SimpleGrid >
        </>
    );
};

export default Map;
