'use server'
import { cache } from 'react'
// import 'server-only'
import { cookies } from 'next/headers'


export async function getMahasiswaId() {
    const token = cookies().get('token')?.value
    const mahasiswaId = await fetch(`${process.env.API_URL}/auth/me`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
        }
    )
        .then(res => res.json())
        .then(data => data.data.mahasiswa.mahasiswaId)
        .catch(err => console.log(err))

    return mahasiswaId
}

export async function getKegiatanHarian() {
    const token = cookies().get('token')?.value

    const response = await fetch(`${process.env.API_URL}/kegiatan-harian?tanggal=&namaTipeKegiatan=&statusPenyelesaian=&pemberiTugas=`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
        }
    )

    // console.log(response)

    if (!response.ok) {
        throw new Error('Failed to fetch data')
    }

    return response.json()
}


export async function getNamaKegiatan() {
    const token = cookies().get('token')?.value
    const response = await fetch(`${process.env.API_URL}/kegiatan-harian/tipe-kegiatan?nama=&satuan`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
        }
    )

    // console.log(response)

    if (!response.ok) {
        throw new Error('Failed to fetch data')
    }

    return response.json()
}

export async function postKegiatanHarian(values: any, tipeKegiatanId: number) {

    const token = cookies().get('token')?.value
    const mahasiswaId = await getMahasiswaId()

    // console.log(values, tipeKegiatanId, mahasiswaId)

    const response = await fetch(`${process.env.API_URL}/kegiatan-harian/${mahasiswaId}`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({
                "tanggal": values.tanggal as string,
                "deskripsi": values.deskripsi,
                "volume": Number(values.volume),
                "durasi": Number(values.durasi),
                "pemberiTugas": values.pemberiTugas,
                "tipeKegiatan": {
                    "tipeKegiatanId": tipeKegiatanId
                },
                "statusPenyelesaian": Number(values.statusPenyelesaian)
            })
        }
    )

    // console.log(response)

    if (!response.ok) {
        console.log(await response.text())
        throw new Error('Failed to fetch data')
    }

    return response.json()
}

export async function postTipeKegiatan(nama_kegiatan: string, satuan: string) {
    const token = cookies().get('token')?.value
    // get mahasiswa id from 
    const mahasiswaId = await getMahasiswaId()

    const response = await fetch(`${process.env.API_URL}/kegiatan-harian/tipe-kegiatan/${mahasiswaId}`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({ nama: nama_kegiatan, satuan: satuan })
        }
    )

    // console.log(response)

    if (!response.ok) {
        throw new Error('Failed to fetch data')
    }

    return response.json()
}

export async function putTipeKegiatan(nama_kegiatan: string, satuan: string, tipeKegiatanId: number) {
    const token = cookies().get('token')?.value
    const response = await fetch(`${process.env.API_URL}/kegiatan-harian/tipe-kegiatan/${tipeKegiatanId}`,
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({ nama: nama_kegiatan, satuan: satuan })
        }
    )

    // console.log(response)

    if (!response.ok) {
        throw new Error('Failed to fetch data')
    }

    return response.json()
}


export async function deleteTipeKegiatan(tipeKegiatanId: number) {
    const token = cookies().get('token')?.value
    const response = await fetch(`${process.env.API_URL}/kegiatan-harian/tipe-kegiatan/${tipeKegiatanId}`,
        {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        }
    )

    console.log(response)

    if (!response.ok) {
        throw new Error('Failed to fetch data')
    }

    return response.json()
}

export async function putKegiatanHarian(values: any, kegiatanHarianId: number | undefined, tipeKegiatanId: number) {
    const token = cookies().get('token')?.value


    const response = await fetch(`${process.env.API_URL}/kegiatan-harian/${kegiatanHarianId}`,
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({
                "tanggal": values.tanggal,
                "deskripsi": values.deskripsi,
                "volume": values.volume,
                "durasi": values.durasi,
                "pemberiTugas": values.pemberiTugas,
                "tipeKegiatan": {
                    "tipeKegiatanId": tipeKegiatanId
                },
                "statusPenyelesaian": values.statusPenyelesaian
            })
        }
    )

    // console.log(await response.text())

    if (!response.ok) {
        throw new Error('Failed to fetch data')
    }

    return response.json()
}

export async function approveKegiatanHarian(kegiatan: { kegiatanHarianId: number }[]) {
    const token = cookies().get('token')?.value
    // console.log(kegiatan)
    const response = await fetch(`${process.env.API_URL}/kegiatan-harian/konfirmasi`,
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(kegiatan)
        }
    )

    // console.log(await response.text())

    if (!response.ok) {
        throw new Error('Failed to fetch data')
    }

    return response.json()
}

export async function deleteKegiatanHarian(kegiatanHarianId: number) {
    const token = cookies().get('token')?.value
    const response = await fetch(`${process.env.API_URL}/kegiatan-harian/${kegiatanHarianId}`,
        {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        }
    )

    // console.log(response)

    if (!response.ok) {
        throw new Error('Failed to fetch data')
    }

    return response.json()
}