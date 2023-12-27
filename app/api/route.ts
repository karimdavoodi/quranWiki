export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
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
