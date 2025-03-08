'use server'
import { cache } from 'react'
// import 'server-only'
import { cookies } from 'next/headers'

export async function getAllPembimbingLapangan() {
    const token = cookies().get('token')?.value

    const response = await fetch(`${process.env.API_URL}/pembimbing-lapangan?nip=&tahun=`, {
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

export async function postPembimbingLapangan(values: any) {
    const token = cookies().get('token')?.value

    const response = await fetch(`${process.env.API_URL}/pembimbing-lapangan`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({
            nip: values.nip,
            nama: values.nama,
            user: {
                email: values.email,
                password: values.password,
            },
            satker: {
                kodeSatker: values.satker
            }
        })

    })

    if (!response.ok) {
        throw new Error('Failed to fetch data')
    }

    return response.json()
}

export async function putPembimbingLapangan(values: any) {
    const token = cookies().get('token')?.value

    const response = await fetch(`${process.env.API_URL}/pembimbing-lapangan/${values.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({
            nip: values.nip,
            nama: values.nama,
            email: values.email,
        })
    })

    if (!response.ok) {
        throw new Error('Failed to fetch data')
    }

    return response.json()
}


export async function putPembimbingLapanganWithPassword(values: any) {
    const token = cookies().get('token')?.value

    const response = await fetch(`${process.env.API_URL}/pembimbing-lapangan/${values.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({
            nip: values.nip,
            nama: values.nama,
            email: values.email,
            password: values.password,
        })
    })

    if (!response.ok) {
        throw new Error('Failed to fetch data')
    }

    return response.json()
}

export async function deletePembimbingLapangan(id: number) {
    const token = cookies().get('token')?.value

    const response = await fetch(`${process.env.API_URL}/pembimbing-lapangan/${id}`, {
        method: 'DELETE',
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

export async function getPembimbingLapangan() {
    const token = cookies().get('token')?.value

    const response = await fetch(`${process.env.API_URL}/pembimbing-lapangan?nip=&tahun=`, {
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