'use client'
import { ActionIcon, Alert, Card, Center, Divider, Image, List, SimpleGrid, Text } from "@mantine/core";
import { IconCalendarCheck, IconClockCheck, IconInfoCircle, IconNote } from "@tabler/icons-react";

export default function Home() {
    return (
        <>
            <Text c="dimmed" mb="md">
                Beranda
            </Text>
            <Text
                size="xl"
                fw={700}
            >Selamat datang!</Text>

            <Alert my="md" variant="light" title="Pengumuman" icon={<IconInfoCircle />} >
                <List size="xs">
                    <List.Item>
                        Penambahan Fitur Presensi Luar Kota: presensi dilakukan dengan mengirimkan keterangan dan bukti, yang kemudian diverifikasi oleh pembimbing lapangan
                    </List.Item>
                    <Divider my={"xs"} />
                    <List.Item>
                        Jika GPS tidak akurat, pastikan Anda telah memberikan izin akses lokasi pada browser Anda atau gunakan perangkat yang memiliki GPS yang lebih akurat, seperti smartphone
                    </List.Item>
                    <List.Item>
                        Lokasi BPS tempat magang sudah disesuaikan
                    </List.Item>
                    <List.Item>
                        Pengajuan bimbingan belum bisa dilakukan karena alokasi dosen pembimbing belum tersedia
                    </List.Item>
                    <List.Item>
                        Perizinan presensi dilakukan dengan mengisi form perizinan terlebih dahulu. Setelah itu, Anda dapat menambahkan bukti presensi
                    </List.Item>
                </List>
            </Alert>

            <Divider
                label={
                    <Text
                        size="xs"
                        c={"gray"}
                        fw={700}
                    >Pintasan
                    </Text >
                }
                labelPosition="left"
                size={2}
                my="md"
            />

            <SimpleGrid cols={{ base: 1, xs: 2, md: 3 }} spacing="lg">
                <Card
                    shadow="xs"
                    padding="md"
                    radius="sm"
                    component="a"
                    href="/mahasiswa/presensi"

                    withBorder>
                    <Card.Section>
                        <Center bg="var(--mantine-primary-color-filled)" c={"white"} h={150}>
                            <IconClockCheck size={50} />
                        </Center>
                    </Card.Section>
                    <Text fw={500} size="lg" mt="md">
                        Presensi
                    </Text>

                    <Text mt="xs" c="dimmed" size="sm">
                        Tandai kehadiran magang Anda
                    </Text>
                </Card>

                <Card
                    shadow="xs"
                    padding="md"
                    radius="sm"
                    component="a"
                    href="/mahasiswa/kegiatan/harian"

                    withBorder>
                    <Card.Section>
                        <Center bg="var(--mantine-primary-color-filled)" c={"white"} h={150}>
                            <IconNote size={50} />
                        </Center>
                    </Card.Section>
                    <Text fw={500} size="lg" mt="md">
                        Catatan Kegiatan
                    </Text>

                    <Text mt="xs" c="dimmed" size="sm">
                        Catat kegiatan harian Anda selama magang
                    </Text>
                </Card>

                <Card
                    shadow="xs"
                    padding="md"
                    radius="sm"
                    component="a"
                    href="/mahasiswa/bimbingan/magang"

                    withBorder>
                    <Card.Section>
                        <Center bg="var(--mantine-primary-color-filled)" c={"white"} h={150}>
                            <IconCalendarCheck size={50} />
                        </Center>
                    </Card.Section>
                    <Text fw={500} size="lg" mt="md">
                        Bimbingan Magang
                    </Text>

                    <Text mt="xs" c="dimmed" size="sm">
                        Jadwal pertemuan bimbingan magang
                    </Text>
                </Card>
            </SimpleGrid>
        </>
    )
}
