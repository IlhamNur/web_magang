'use client'
import { ActionIcon, Card, Center, Divider, Image, SimpleGrid, Text } from "@mantine/core";
import { IconCalendarClock } from "@tabler/icons-react";
import { IconCalendarCheck, IconClockCheck, IconNote } from "@tabler/icons-react";

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
                    href="/pembimbing-lapangan/presensi"

                    withBorder>
                    <Card.Section>
                        <Center bg="var(--mantine-primary-color-filled)" c={"white"} h={150}>
                            <IconClockCheck size={50} />
                        </Center>
                    </Card.Section >
                    <Text fw={500} size="lg" mt="md">
                        Daftar Presensi
                    </Text>

                    <Text mt="xs" c="dimmed" size="sm">
                        Daftar presensi mahasiswa magang
                    </Text>
                </Card >

                <Card
                    shadow="xs"
                    padding="md"
                    radius="sm"
                    component="a"
                    href="/pembimbing-lapangan/kegiatan/harian"

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
                        Catatan kegiatan harian mahasiswa magang
                    </Text>
                </Card>

                <Card
                    shadow="xs"
                    padding="md"
                    radius="sm"
                    component="a"
                    href="/pembimbing-lapangan/bimbingan/perizinan"

                    withBorder>
                    <Card.Section>
                        <Center bg="var(--mantine-primary-color-filled)" c={"white"} h={150}>
                            <IconCalendarClock size={50} />
                        </Center>
                    </Card.Section>
                    <Text fw={500} size="lg" mt="md">
                        Perizinan Kampus
                    </Text>

                    <Text mt="xs" c="dimmed" size="sm">
                        Perizinan kegiatan kampus
                    </Text>
                </Card>
            </SimpleGrid>
        </>
    )
}
