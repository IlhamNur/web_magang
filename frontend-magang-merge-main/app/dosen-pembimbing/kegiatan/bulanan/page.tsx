'use client'

import { Button, Group, Text, Box, Stack, TextInput, Textarea, NumberInput, Modal, SimpleGrid, Select } from "@mantine/core";
import TableKegiatanBulanan, {
  RecordKegiatanBulanan,
} from "@/components/Table/TableKegiatanBulanan/TableKegiatanBulanan";
import { useDisclosure } from "@mantine/hooks";
import TableKegiatanBulananNested, { RecordKegiatanBulananNested } from "@/components/Table/TableKegiatanBulanan/TableKegiatanBulananNestedForDosen";
import { useEffect, useState } from "react";
import { getAllMahasiswa } from "@/utils/kelola-user/mahasiswa";
import { getKegiatanBulanan, getPeriodeKegiatanBulanan } from "@/utils/kegiatan-bulanan";

const Bulanan = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [data, setData] = useState([]);
  const [dataKegiatanBulanan, setDataKegiatanBulanan] = useState([]);
  const [dataFiltered, setDataFiltered] = useState<RecordKegiatanBulananNested[]>([]);
  // periode contain value and label 
  const [periode, setPeriode] = useState<{ value: string, label: string }[]>([]);
  const [selectedPeriode, setSelectedPeriode] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {

    const response = await getAllMahasiswa()
    const response2 = await getKegiatanBulanan()
    const response3 = await getPeriodeKegiatanBulanan();

    let modifiedData = response.data.map((item: { mahasiswaId: any; }) => ({
      ...item,
      id: item.mahasiswaId,  // Add the `id` field using `mahasiswaId`
    }))

    let modifiedData2 = response2.data.map((item: { rekapId: any; }) => ({
      ...item,
      id: item.rekapId,  // Add the `id` field using `KegiatanBulananId`
    }))

    // sort form the highest rekapId
    // modifiedData2 = modifiedData2.sort((a: { rekapId: number; }, b: { rekapId: number; }) => b.rekapId - a.rekapId);

    // set periode
    const listPeriode = response3.data.map((item: { tanggalAwal: any; tanggalAkhir: any; }) => ({
      value: item.tanggalAwal,
      label: `${new Date(item.tanggalAwal).toLocaleDateString("id", { day: 'numeric', month: 'numeric', year: 'numeric' })} - ${new Date(item.tanggalAkhir).toLocaleDateString("id", { day: 'numeric', month: 'numeric', year: 'numeric' })}`
    }));

    // console.log('modifiedData', modifiedData)
    // console.log('modifiedData2', modifiedData2)

    setData(modifiedData)
    setDataKegiatanBulanan(modifiedData2)
    setPeriode(listPeriode);

    if (listPeriode.length > 0) {
      setSelectedPeriode(listPeriode[0].value);
    }
    if (data.length > 0) {
      setDataFiltered(filterData(data, selectedPeriode));
    }
    setLoading(false)

  }

  useEffect(() => {
    fetchData()
  }, [])

  const filterData = (dataKegiatanBulanan: any[], selectedPeriode: string) => {
    return dataKegiatanBulanan.filter(item => item.tanggalAwal === selectedPeriode);
  }

  useEffect(() => {
    if (data.length > 0) {
      setDataFiltered(filterData(dataKegiatanBulanan, selectedPeriode));
    }
    // console.log('selectedPeriode', selectedPeriode); // '2022-02-01'
    // console.log('dataFiltered', dataFiltered); // []
  }, [data, selectedPeriode]);

  return (
    <>
      <Text c="dimmed" mb="md">Kegiatan Bulanan</Text>
      <SimpleGrid cols={{ base: 2, md: 3, xl: 4 }} mb={"md"}>
        <Select
          size="xs"
          // label="Periode"
          placeholder="Pilih Periode"
          description="Periode"
          data={periode}
          value={selectedPeriode}
          onChange={(value) => setSelectedPeriode(value as string)}
          allowDeselect={false}
        // styles={{
        //   input: {
        //     fontFamily: 'monospace',
        //   }
        // }}
        />
      </SimpleGrid >
      <TableKegiatanBulananNested records={data} dataKegiatanBulanan={dataFiltered} loading={loading} fetchData={fetchData} periode={periode.find((item: any) => item.value === selectedPeriode)?.label || ""} />

    </>
  );
};


export default Bulanan;
