'use client'
import { ActionIcon, Card, Center, Divider, Image, SimpleGrid, Text } from "@mantine/core";
import { IconCalendarCheck, IconCashBanknote, IconClockCheck, IconFileAnalytics, IconLocation, IconLocationBolt, IconLocationPin, IconMap, IconMapPin, IconNote, IconPin } from "@tabler/icons-react";

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
                    href="/admin/bimbingan/magang"

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

                <Card
                    shadow="xs"
                    padding="md"
                    radius="sm"
                    component="a"
                    href="/admin/penempatan/alokasi"

                    withBorder>
                    <Card.Section>
                        <Center bg="var(--mantine-primary-color-filled)" c={"white"} h={150}>
                            <IconMapPin size={50} />
                        </Center>
                    </Card.Section>
                    <Text fw={500} size="lg" mt="md">
                        Penempatan Magang
                    </Text>

                    <Text mt="xs" c="dimmed" size="sm">
                        Alokasi penempatan magang mahasiswa
                    </Text>
                </Card>

                <Card
                    shadow="xs"
                    padding="md"
                    radius="sm"
                    component="a"
                    href="/admin/laporan-magang"

                    withBorder>
                    <Card.Section>
                        <Center bg="var(--mantine-primary-color-filled)" c={"white"} h={150}>
                            <IconFileAnalytics size={50} />
                        </Center>
                    </Card.Section>
                    <Text fw={500} size="lg" mt="md">
                        Laporan Magang
                    </Text>

                    <Text mt="xs" c="dimmed" size="sm">
                        Daftar Laporan Magang Mahasiswa
                    </Text>
                </Card>

            </SimpleGrid>
        </>
    )
}
