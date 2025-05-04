

export async function GET(req: Request) {
     const data = await req.json();
    const rpcQueryRes = await fetch(`https://devnet.dplabs-internal.com/`, {
        method: `GET`,
        headers: {
            'Content-Type': "application/json",
        },
        body: JSON.stringify(data)
    })
    //  const res = await data
    console.log(`query status ${rpcQueryRes.statusText}`)
    return Response.json({ result: rpcQueryRes })
}

export async function POST(req: Request) {
    const res = await req.json();
    let rpcRes, reqTime: number;

    try {
        rpcRes = await fetch(`https://devnet.dplabs-internal.com/`, {
            method: `POST`,
            headers: {
                'Content-Type': "application/json",
            },
            body: JSON.stringify(res)
        })
        console.log(`post status ${rpcRes?.statusText!}`)
        return Response.json({ result: rpcRes })

    } catch(err) {
        console.log(err)
        return err
    }
}