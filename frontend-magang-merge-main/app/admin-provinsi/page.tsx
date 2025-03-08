'use client'
import { ActionIcon, Card, Center, Divider, Image, SimpleGrid, Text } from "@mantine/core";
import { IconCalendarCheck, IconClockCheck, IconMapPin, IconNote, IconUser } from "@tabler/icons-react";

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
                    href="/admin-provinsi/penempatan/alokasi"

                    withBorder>
                    <Card.Section>
                        <Center bg="var(--mantine-primary-color-filled)" c={"white"} h={150}>
                            <IconMapPin size={50} />
                        </Center>
                    </Card.Section>
                    <Text fw={500} size="lg" mt="md">
                        Alokasi
                    </Text>

                    <Text mt="xs" c="dimmed" size="sm">
                        Tentukan alokasi magang mahasiswa
                    </Text>
                </Card>

                <Card
                    shadow="xs"
                    padding="md"
                    radius="sm"
                    component="a"
                    href="/admin-provinsi/penempatan/unit-kerja"

                    withBorder>
                    <Card.Section>
                        <Center bg="var(--mantine-primary-color-filled)" c={"white"} h={150}>
                            <IconNote size={50} />
                        </Center>
                    </Card.Section>
                    <Text fw={500} size="lg" mt="md">
                        Unit Kerja
                    </Text>

                    <Text mt="xs" c="dimmed" size="sm">
                        Kelola unit kerja magang
                    </Text>
                </Card>

                <Card
                    shadow="xs"
                    padding="md"
                    radius="sm"
                    component="a"
                    href="/admin-provinsi/kelola/admin-satker"

                    withBorder>
                    <Card.Section>
                        <Center bg="var(--mantine-primary-color-filled)" c={"white"} h={150}>
                            <IconUser size={50} />
                        </Center>
                    </Card.Section>
                    <Text fw={500} size="lg" mt="md">
                        Kelola Admin Satker
                    </Text>

                    <Text mt="xs" c="dimmed" size="sm">
                        Kelola akun admin satker
                    </Text>
                </Card>
            </SimpleGrid>
        </>
    )
}
