'use server'
import { cache } from 'react'
// import 'server-only'
import { cookies } from 'next/headers'
import { getMahasiswaId } from './kegiatan-harian'


export async function getUnitKerja() {
    const token = cookies().get('token')?.value

    const response = await fetch(`${process.env.API_URL}/satker?satkerId=&kodeSatker=&namaProvinsi=&kodeProvinsi=&kabupatenKota=&kodeKabupatenKota=&alamat=&internalBPS`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
        }
    )

    // console.log(await response.text())

    if (!response.ok) {
        throw new Error('Failed to fetch data')
    }

    return response.json()
}

export async function getUnitKerjaById(id: number) {
    const token = cookies().get('token')?.value

    const response = await fetch(`${process.env.API_URL}/satker?satkerId=${id}`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
        }
    )

    // console.log(await response.text())

    if (!response.ok) {
        throw new Error('Failed to fetch data')
    }

    return response.json()
}

export async function postPemilihanPenempatan(values: any) {
    try {
        const token = cookies().get('token')?.value;
        const mahasiswaId = await getMahasiswaId();

        const response = await fetch(`${process.env.API_URL}/pemilihan-penempatan/${mahasiswaId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(
                [
                    {
                        satkerId: Number(values.pilihan1),
                    },
                    {
                        satkerId: Number(values.pilihan2),
                    },
                    {
                        satkerId: Number(values.pilihan3),
                    }

                ]
            )
        });

        // console.log(await response.text());

        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
    } catch (error) {
        throw new Error('Failed to fetch data');
        console.error(error);
    }
}

export async function postUnitKerja(values: any) {
    const token = cookies().get('token')?.value;

    const response = await fetch(`${process.env.API_URL}/satker`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({
            nama: values.nama,
            email: values.email,
            alamat: values.alamat,
            provinsi: {
                kodeProvinsi: values.kodeProvinsi
            },
            kabupatenKota: {
                kodeKabupatenKota: values.kodeKabupatenKota,
                namaKabupatenKota: values.namaKabupatenKota
            },
            internalBPS: values.internalBPS
        })
    })


    if (!response.ok) {
        console.log(await response.text())
        throw new Error('Failed to fetch data')
    }

    return response.json()
}

export async function putUnitKerja(values: any) {
    const token = cookies().get('token')?.value

    const response = await fetch(`${process.env.API_URL}/satker/${values.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({
            nama: values.nama,
            email: values.email,
            alamat: values.alamat,
            kode: values.kode,
            provinsi: {
                kodeProvinsi: values.kodeProvinsi
            },
            kabupatenKota: {
                kodeKabupatenKota: values.kodeKabupatenKota,
                // namaKabupatenKota: values.namaKabupatenKota
            },
            kapasitasSatkerTahunAjaran: {
                kapasitas: values.kapasitas
            },
            latitude: values.latitude,
            longitude: values.longitude,
        })
    })

    // console.log(await response.text())

    if (!response.ok) {
        throw new Error('Failed to fetch data')
    }

    return response.json()
}

export async function deleteUnitKerja(id: number) {
    const token = cookies().get('token')?.value

    const response = await fetch(`${process.env.API_URL}/satker/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    })


    if (!response.ok) {
        // console.log(await response.text())
        throw new Error('Failed to fetch data')
    }

    return response.json()
}