'use server'
import { cache } from 'react'
// import 'server-only'
import { cookies } from 'next/headers'

export async function getAllMahasiswa() {
    const token = cookies().get('token')?.value

    const response = await fetch(`${process.env.API_URL}/mahasiswa?nim=&nama=&kelas=&prodi=&dosenId=&pemlapId=&satkerId=&email=&tahunAjaran=`, {
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


export async function postAllMahasiswa(file: File) {
    const token = cookies().get('token')?.value;
    if (file) {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);

        const formdata = new FormData();
        formdata.append("file", file);

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: formdata,
            // redirect: "follow"
        };

        try {
            const response = await fetch(`${process.env.API_URL}/mahasiswa/excel`, requestOptions);
            const result = await response.json();
            console.log(await response.text());

            // // Assuming the API returns the updated list of mahasiswa
            // const modifiedData = result.data.map((item: { mahasiswaId: any; }) => ({
            //     ...item,
            //     id: item.mahasiswaId,  // Add the `id` field using `mahasiswaId`
            // }));
            // setData(modifiedData);
        } catch (error) {
            console.error("Failed to upload file", error);
        }
    }
}

export async function getToken() {
    const token = cookies().get('token')?.value;
    return token;
}

export async function putMahasiswa(values: any) {
    const token = cookies().get('token')?.value;

    // console.log(values);

    const response = await fetch(`${process.env.API_URL}/mahasiswa/${values.mahasiswaId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({
            nim: values.nim,
            nama: values.nama,
            kelas: values.kelas,
            prodi: values.prodi,
            dosenPembimbingMagang: {
                dosenId: values.dosenId !== "null" ? Number(values.dosenId) : ""
            },
            pembimbingLapangan: {
                pemlapId: values.pemlapId !== "null" ? Number(values.pemlapId) : ""
            },
            satker: {
                satkerId: values.satkerId !== "null" ? Number(values.satkerId) : ""
            },
            alamat: values.alamat,
        })
    });


    if (!response.ok) {
        console.log(await response.text());
        throw new Error('Failed to fetch data')
    }

    return response.json()
}