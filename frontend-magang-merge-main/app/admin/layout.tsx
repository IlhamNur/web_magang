'use client';
import AppShellResponsive from "@/components/AppShellResponsive/AppShellResponsive"
import { NavbarProps } from "@/components/Navbar/Navbar"
import { IconAdjustments, IconBook, IconBuilding, IconCalendarCheck, IconCalendarClock, IconCalendarStats, IconCashBanknote, IconFileAnalytics, IconGauge, IconHome2, IconLock, IconMapPin, IconNote, IconNotebook, IconNotes, IconPresentationAnalytics, IconUser, IconUserCode, IconUserSearch, IconUserShield, IconUsersGroup, IconUsersPlus } from "@tabler/icons-react";

const profilePath: string = "/admin/profil";

const mockdata: NavbarProps[] = [
    {
        label: "Beranda",
        icon: IconHome2,
        link: "/admin",
    },
    // {
    //     label: "Catatan Kegiatan",
    //     icon: IconNotes,
    //     link: undefined,
    //     // initiallyOpened: true,
    //     links: [
    //         {
    //             label: "Kegiatan Harian",
    //             link: "/admin/kegiatan/harian",
    //             icon: IconNote,
    //         },
    //         {
    //             label: "Kegiatan Bulanan",
    //             link: "/admin/kegiatan/bulanan",
    //             icon: IconNotebook,
    //         },
    //     ],
    // },
    {
        label: "Bimbingan",
        icon: IconCalendarStats,
        link: undefined,
        links: [
            {
                label: "Bimbingan Magang",
                link: "/admin/bimbingan/magang",
                icon: IconCalendarCheck,
            },
            {
                label: "Perizinan Kampus",
                link: "/admin/bimbingan/perizinan",
                icon: IconCalendarClock,
            },
        ],
    },
    // {
    //     label: "Rekening",
    //     icon: IconCashBanknote,
    //     link: "/admin/rekening",
    // },

    {
        label: "Penempatan Magang",
        icon: IconPresentationAnalytics,
        links: [
            {
                label: "Alokasi",
                link: "/admin/penempatan/alokasi",
                icon: IconMapPin,
            },
            {
                label: "Unit Kerja",
                link: "/admin/penempatan/unit-kerja",
                icon: IconBuilding,
            }
        ]
    },
    {
        label: "Laporan Magang",
        icon: IconFileAnalytics,
        link: "/admin/laporan-magang"
    },
    {
        label: "Kelola Akun",
        icon: IconUser,
        links: [
            {
                label: "Mahasiswa",
                link: "/admin/kelola-user/mahasiswa",
                icon: IconUsersGroup
            },
            {
                label: "Dosen Pembimbing",
                link: "/admin/kelola-user/dosen-pembimbing",
                icon: IconUserShield
            },
            {
                label: "Pembimbing Lapangan",
                link: "/admin/kelola-user/pembimbing-lapangan",
                icon: IconUserSearch
            },
            {
                label: "Admin Provinsi",
                link: "/admin/kelola-user/admin-provinsi",
                icon: IconUserCode
            }
        ],
    },
];


const AppShell = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    return (
        <AppShellResponsive
            mockdata={mockdata}
            profilePath={profilePath}
        >{children}</AppShellResponsive>
    )
}

export default AppShell