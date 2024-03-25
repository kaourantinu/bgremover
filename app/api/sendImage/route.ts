import { NextResponse } from "next/server";

export async function POST(req: Request) {

    const formDataFlag = await req.formData()

    const apiKeys = ['V7pAYHCvYVBqdMmWaqfqMS5s', 'oEY68JYCbyDpUEdBuXQUNe7q', 'LgPFCSa4UeHhM5XjKpgHpEwf'];

    const apiUrl = 'https://api.remove.bg/v1.0/removebg';

    const res = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'X-API-Key': apiKeys[0],
        },
        body: formDataFlag
    })

    if (res.status === 200) {
        const blob = await res.blob();

        const headers = new Headers();

        headers.set("Content-Type", "image/*");

        return new NextResponse(blob, { status: res.status, headers });

    } else {
        console.log("Première API saturée ou erronée")
        const res = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'X-API-Key': apiKeys[1],
            },
            body: formDataFlag
        })
        if (res.status === 200) {
            const blob = await res.blob();

            const headers = new Headers();

            headers.set("Content-Type", "image/*");

            return new NextResponse(blob, { status: res.status, headers });
        } else {
            console.log("Seconde API saturée ou erronée")
            const res = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'X-API-Key': apiKeys[2],
                },
                body: formDataFlag
            })

            if (res.status === 200) {
                const blob = await res.blob();

                const headers = new Headers();

                headers.set("Content-Type", "image/*");

                return new NextResponse(blob, { status: res.status, headers });
            } else {
                console.log('Les API sont saturées ou erronées')
                return new NextResponse('Les API sont saturées ou erronées', { status: res.status });
            }
            }
        }}