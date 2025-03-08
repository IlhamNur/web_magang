'use client'

import { Button, Group, Text, Box, Stack, TextInput, Textarea, NumberInput, Modal, Select, SimpleGrid } from "@mantine/core";
import TableKegiatanBulanan, {
  RecordKegiatanBulanan,
} from "@/components/Table/TableKegiatanBulanan/TableKegiatanBulanan";
import { useDisclosure } from "@mantine/hooks";
import { use, useEffect, useState } from "react";
import { getKegiatanBulanan, getPeriodeKegiatanBulanan } from "@/utils/kegiatan-bulanan";

const Bulanan = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [data, setData] = useState([]);
  const [dataFiltered, setDataFiltered] = useState<RecordKegiatanBulanan[]>([]);
  const [periode, setPeriode] = useState<[]>([]);
  const [selectedPeriode, setSelectedPeriode] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    // get kegiatan bulanan data dan periode kegiatan bulanan
    const response = await getKegiatanBulanan();
    const response2 = await getPeriodeKegiatanBulanan();

    // console.log(response.data);
    // console.log(response2.data);

    // set id using rekapTipeId inside each rekapKegiatanBulananTipeKegiatan
    let modifiedData = response.data.map((item: { RekapKegiatanBulananTipeKegiatan: any[]; }) => ({
      ...item,
      RekapKegiatanBulananTipeKegiatan: item.RekapKegiatanBulananTipeKegiatan.map(kegiatan => ({
        ...kegiatan,
        id: kegiatan.rekapTipeId,
      }))
    }));

    // set periode
    if (periode.length === 0) {
      const listPeriode = response2.data.map((item: { tanggalAwal: any; tanggalAkhir: any; }) => ({
        value: item.tanggalAwal,
        label: `${new Date(item.tanggalAwal).toLocaleDateString("id", { day: 'numeric', month: 'numeric', year: 'numeric' })} - ${new Date(item.tanggalAkhir).toLocaleDateString("id", { day: 'numeric', month: 'numeric', year: 'numeric' })}`
      }));

      setPeriode(listPeriode);
      if (listPeriode.length > 0) {
        setSelectedPeriode(listPeriode[0].value);
      }
    }

    setData(modifiedData);

    if (data.length > 0) {
      setDataFiltered(filterData(data, selectedPeriode)[0].RekapKegiatanBulananTipeKegiatan);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);


  const filterData = (data: any[], selectedPeriode: string) => {
    return data.filter(item => item.tanggalAwal === selectedPeriode);
  }

  useEffect(() => {
    if (data.length > 0) {
      setDataFiltered(filterData(data, selectedPeriode)[0].RekapKegiatanBulananTipeKegiatan);
    }
    // console.log(selectedPeriode);
    // console.log(dataFiltered);
  }, [data, selectedPeriode]);


  return (
    <>
      <Text c="dimmed" mb="md">Kegiatan Bulanan</Text>
      {/* <Group justify="flex-end" mb={10}>
        <Button leftSection={<IconPlus size={14} />}
          onClick={
            open
          }>
          Tambah
        </Button>
      </Group> */}

      {/* <Text size="xs" mb="xs">Periode : {new Date(periode.tanggalAwal).toLocaleDateString("id", { day: 'numeric', month: 'long', year: 'numeric' })} - {new Date(periode.tanggalAkhir).toLocaleDateString("id", { day: 'numeric', month: 'long', year: 'numeric' })}</Text> */}
      <SimpleGrid cols={{ base: 2, md: 3, xl: 4 }} mb={"md"}>
        <Select
          size="xs"
          // label="Periode"
          placeholder="Pilih Periode"
          data={periode}
          value={selectedPeriode}
          onChange={(value) => setSelectedPeriode(value as string)}
          allowDeselect={false}
        />
      </SimpleGrid >
      <TableKegiatanBulanan records={dataFiltered} isLoading={loading} fetchData={fetchData} />

    </>
  );
};


export default Bulanan;
