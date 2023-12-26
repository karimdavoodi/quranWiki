// http://localhost:3000/api?id=123
/*
APIs:
- POST: add relation
   POST /api/relation 
   BODY: {}
- GET: get relation
   GET /api/relation?verseId=123&type=quran
- PUT: update relation 'like'
   PUT /api/relation?verseId=123&type=quran
   BODY: {}
- POST: add feadback
   POST /api/feadback
   BODY: {}
*/

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
            name: "route",
            description: "ROUTE",
            price: 100,
        },
    });
}
