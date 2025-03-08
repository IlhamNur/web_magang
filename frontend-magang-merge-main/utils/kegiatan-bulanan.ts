'use server'
import { cache } from 'react'
// import 'server-only'
import { cookies } from 'next/headers'
import { getMahasiswaId } from './kegiatan-harian'

export async function getKegiatanBulanan() {
    const token = cookies().get('token')?.value

    const response = await fetch(`${process.env.API_URL}/kegiatan-bulanan?tanggalAwal=&tanggalAkhir=&mahasiswaId=`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
        }
    )

    // console.log(await     response.text())

    if (!response.ok) {
        throw new Error('Failed to fetch data')
    }

    return response.json()
}

export async function postKegiatanBulanan() {

    // get wanggal awal bulan
    const tanggal = new Date()
    const tanggalAkhir = new Date(tanggal.getFullYear(), tanggal.getMonth() + 1, 0)
    const tanggalAwal = new Date(tanggal.getFullYear(), tanggal.getMonth(), 1);
    try {
        const token = cookies().get('token')?.value;
        const mahasiswaId = await getMahasiswaId()

        const response = await fetch(`${process.env.API_URL}/kegiatan-bulanan/${mahasiswaId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(
                {
                    tanggalAwal: tanggalAwal,
                    tanggalAkhir: tanggalAkhir,
                }
            )
        });

        // console.log(response.text());

        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
    } catch (error) {
        console.error(error);
    }
}

export async function putKegiatanBulanan(values: any) {

    const token = cookies().get('token')?.value

    const response = await fetch(`${process.env.API_URL}/kegiatan-bulanan/edit-detail/${values.rekapTipeKegiatanId}`,
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({
                realisasi: values.realisasi,
                keterangan: values.keterangan
            })
        }
    )

    // console.log(response)

    if (!response.ok) {
        throw new Error('Failed to fetch data')
    }

    return response.json()
}

export async function getPeriodeKegiatanBulanan() {
    const token = cookies().get('token')?.value

    const response = await fetch(`${process.env.API_URL}/kegiatan-bulanan/periode-rekap`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
        }
    )

    if (!response.ok) {
        console.log(await response.text())
        throw new Error('Failed to fetch data')
    }

    return response.json()
}

export async function putKualitasKegiatanBulanan(values: any) {
    const token = cookies().get('token')?.value;
    console.log(values);

    const response = await fetch(`${process.env.API_URL}/kegiatan-bulanan/update-kualitas`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
        },
        body: JSON.stringify([{
            rekapTipeId: values.rekapTipeId,
            tingkatKualitas: values.tingkatKualitas,
            keterangan: values.keterangan
        }])
    });

    if (!response.ok) {
        const errorText = await response.text();
        console.error(errorText);
        throw new Error('Failed to fetch data: ' + errorText);
    }

    return response.json();
}