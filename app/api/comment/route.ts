export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    // const res = await fetch(`https://data.mongodb-api.com/product/${id}`, {
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'API-Key': process.env.DATA_API_KEY!,
    //   },
    // })
    // const product = await res.json()

    return Response.json({
        status: 200,
        data: {
            id: id,
            name: "comment",
            description: "Comment",
            price: 100,
        },
    });
}
