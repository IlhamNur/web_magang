'use server'
import { cache } from 'react'
// import 'server-only'
import { cookies } from 'next/headers'

export async function getAllDosenPembimbing() {
    const token = cookies().get('token')?.value

    const response = await fetch(`${process.env.API_URL}/dosen-pembimbing?nip=&nama=&prodi=&tahunAjaran=`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
    })

    if (!response.ok) {
        throw new Error('Failed to fetch data')
    }

    return response.json()
}

export async function postDosenPembimbing(values: any) {
    const token = cookies().get('token')?.value

    const response = await fetch(`${process.env.API_URL}/dosen-pembimbing`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({
            nip: values.nip,
            nama: values.nama,
            prodi: values.prodi,
            user: {
                email: values.email,
                password: values.password,
            }
        })

    })

    if (!response.ok) {
        throw new Error('Failed to fetch data')
    }

    return response.json()
}

export async function putDosenPembimbing(values: any) {
    const token = cookies().get('token')?.value

    const response = await fetch(`${process.env.API_URL}/dosen-pembimbing/${values.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({
            nip: values.nip,
            nama: values.nama,
            prodi: values.prodi,
            user: {
                email: values.email,
                password: values.password,
            }
        })
    })

    if (!response.ok) {
        throw new Error('Failed to fetch data')
    }

    return response.json()
}

export async function putDosenPembimbingWihoutPassword(values: any) {
    const token = cookies().get('token')?.value

    const response = await fetch(`${process.env.API_URL}/dosen-pembimbing/${values.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({
            nip: values.nip,
            nama: values.nama,
            prodi: values.prodi,
            user: {
                email: values.email,
            }
        })
    })

    if (!response.ok) {
        throw new Error('Failed to fetch data')
    }

    return response.json()
}

export async function putAssignMahasiswaToDosen(values: any) {
    const token = cookies().get('token')?.value
    // console.log(values)

    const convertedArray = values.mahasiswaBimbingan.map((id: any) => ({ mahasiswaId: Number(id) }));
    const response = await fetch(`${process.env.API_URL}/tim-magang/assign-mahasiswa/dosen/${values.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(convertedArray)
    })

    if (!response.ok) {
        throw new Error(`Failed to fetch data ${await response.text()}`)
    }

    return response.json()
}

export async function putUnassignMahasiswaToDosen(values: any) {
    const token = cookies().get('token')?.value
    // console.log(values)
    // get the unslected mahasiswa from the selected mahasiswa by values.mahasiswaBimbingan and values.mahasiswaBimbinganFull
    const unselectedMahasiswa = values.mahasiswaBimbinganFull.filter((mahasiswa: any) => !values.mahasiswaBimbingan.includes(mahasiswa))
    // console.log(unselectedMahasiswa)
    const convertedArray = unselectedMahasiswa.map((mahasiswa: any) => ({ mahasiswaId: Number(mahasiswa) }));


    // console.log(convertedArray)
    if (convertedArray.length === 0) {
        return
    }
    const response = await fetch(`${process.env.API_URL}/tim-magang/unassign-mahasiswa/dosen/${values.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(convertedArray)
    })

    if (!response.ok) {
        throw new Error(`Failed to fetch data ${await response.text()}`)
    }

    return response.json()
}