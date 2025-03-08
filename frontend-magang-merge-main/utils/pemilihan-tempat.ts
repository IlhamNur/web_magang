'use server'
import { cache } from 'react'
// import 'server-only'
import { cookies } from 'next/headers'
import { getMahasiswaId } from './kegiatan-harian'

export async function getPemilihanPenempatan() {
    const token = cookies().get('token')?.value
    const mahasiswaId = await getMahasiswaId()

    const response = await fetch(`${process.env.API_URL}/pemilihan-penempatan?satkerId=&mahasiswaId=${mahasiswaId}`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
        }
    )

    if (!response.ok) {
        throw new Error('Failed to fetch data')
    }

    return response.json()
}

export async function getPemilihanPenempatanById(id: string) {
    const token = cookies().get('token')?.value

    const response = await fetch(`${process.env.API_URL}/pemilihan-penempatan?satkerId=${id}`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
        }
    )

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
                {
                    satkerId: values.satkerId,
                }
            )
        });

        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
    } catch (error) {
        console.error(error);
    }
}

export async function getAllPemilihanPenempatan() {
    const token = cookies().get('token')?.value

    const response = await fetch(`${process.env.API_URL}/pemilihan-penempatan?satkerId=&mahasiswaId=`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
        }
    )

    if (!response.ok) {
        throw new Error('Failed to fetch data')
    }

    return response.json()
}

export async function putKonfirmasiPenempatan(id: number) {
    const token = cookies().get('token')?.value

    const response = await fetch(`${process.env.API_URL}/pemilihan-penempatan/konfirmasi/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        console.log(await response.text())
        throw new Error('Failed to fetch data');
    }

    return response.json();
}