'use server'
import { cache } from 'react'
// import 'server-only'
import { cookies } from 'next/headers'

export async function getAllAdminProvinsi() {
    const token = cookies().get('token')?.value

    const response = await fetch(`${process.env.API_URL}/admin-provinsi?email=&namaProvinsi=&kodeProvinsi=`, {
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

export async function postAdminProvinsi(values: any) {
    const token = cookies().get('token')?.value;

    const response = await fetch(`${process.env.API_URL}/admin-provinsi`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({
            nama: values.nama,
            nip: values.nip,
            kodeProvinsi: values.kodeProvinsi,
            user: {
                email: values.email,
                password: values.password,
            }
        })
    })


    if (!response.ok) {
        console.log(await response.text())
        throw new Error('Failed to fetch data')
    }

    return response.json()
}

export async function putAdminProvinsi(values: any) {
    const token = cookies().get('token')?.value

    const response = await fetch(`${process.env.API_URL}/admin-provinsi/${values.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({
            nama: values.nama,
            nip: values.nip,
            // kodeProvinsi: values.kodeProvinsi,
            user: {
                email: values.email,
                password: values.password,
            }
        })
    })

    // console.log(await response.text())

    if (!response.ok) {
        throw new Error('Failed to fetch data')
    }

    return response.json()
}

export async function putAdminProvinsiWithoutPassword(values: any) {
    const token = cookies().get('token')?.value

    const response = await fetch(`${process.env.API_URL}/admin-provinsi/${values.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({
            nama: values.nama,
            nip: values.nip,
            // kodeProvinsi: values.kodeProvinsi,
            user: {
                email: values.email,
            }
        })
    })

    // console.log(await response.text())

    if (!response.ok) {
        throw new Error('Failed to fetch data')
    }

    return response.json()
}

export async function deleteAdminProvinsi(id: number) {
    const token = cookies().get('token')?.value

    const response = await fetch(`${process.env.API_URL}/admin-provinsi/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
    })

    // console.log(await response.text())

    if (!response.ok) {
        throw new Error('Failed to fetch data')
    }

    return response.json()
}