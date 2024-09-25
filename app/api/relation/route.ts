import { IRelation, Relation, RelationType } from "../../models";
import { connect } from "mongoose";
import {
    RELATION_ADD_INTERVAL,
    RELATION_LIKE_INTERVAL,
} from "@/app/constant";
import crypto from "crypto";

const hashString = (str: string) => {
    return crypto.createHash("md5").update(str).digest("hex");
};
async function setRelation(data: IRelation) {
    try {
        await connect(process.env.MONGODB_URL ?? "");
        // Check if user does relation less than FEADBACK_INTERVAL ago
        const date = new Date().getTime() - RELATION_ADD_INTERVAL;
        const searchModel = await Relation.find({
            userHash: data.userHash,
            date: { $gte: date },
        }).exec();
        if (searchModel.length > 0) {
            throw new Error(
                "You have already added this relation (RELATION_ADD_INTERVAL)"
            );
        }
        // Check if duplicated
        const duplicatedFind = await Relation.find({
            chapterId: data.chapterId,
            ayaId: data.ayaId,
            type: data.type,
            relateToBook: data.relateToBook,
            relateToChapter: data.relateToChapter,
            relateToNumber: data.relateToNumber,
        }).exec();
        if (duplicatedFind.length > 0) {
            throw new Error("relation already exist (DUPLICATED)");
        }

        // Insert new feedback
        const model = new Relation(data);
        await model?.save();
        console.log(`Save Relation ${model.id}`);
        return true;
    } catch (error) {
        console.log(error);
    }
    return false;
}

async function updateRelation(data: IRelation) {
    try {
        await connect(process.env.MONGODB_URL ?? "");
        // Check if user does relation less than INTERVAL
        const date = new Date().getTime() - RELATION_LIKE_INTERVAL;
        const searchModel = await Relation.find({
            userHash: data.userHash,
            date: { $gte: date },
        }).exec();
        if (searchModel.length > 0) {
            throw new Error(
                "You have already liked/disliked this relation (RELATION_LIKE_INTERVAL)"
            );
        }

        const model = await Relation.findOne({
            chapterId: data.chapterId,
            ayaId: data.ayaId,
            type: data.type,
            relateToBook: data.relateToBook,
            relateToChapter: data.relateToChapter,
            relateToNumber: data.relateToNumber,
        }).exec();
        if (model && model.like !== data.like) {
            model.like =
                model.like < data.like ? model.like + 1 : model.like - 1;
            await model.save();
            console.log(`Update Relation ${model.id}`);
            return true;
        }
    } catch (error) {
        console.log(error);
    }
    return false;
}

export async function POST(request: Request) {
    const body: IRelation = await request.json();
    const userHash = hashString(
        request.headers.get("user-agent")! +
        request.headers.get("x-forwarded-for")!
    );
    body.userHash = userHash;
    body.date = new Date().getTime();
    const result = await setRelation(body);
    return Response.json({
        status: result ? 200 : 403,
        message: result ? "success" : "fail",
    });
}

export async function PUT(request: Request) {
    const body: IRelation = await request.json();
    const userHash = hashString(
        request.headers.get("user-agent")! +
        request.headers.get("x-forwarded-for")!
    );
    body.userHash = userHash;
    body.date = new Date().getTime();
    const result = await updateRelation(body);
    return Response.json({
        status: result ? 200 : 403,
        message: result ? "success" : "fail",
    });
}

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const chapterId = searchParams.get("chapterId") ?? "";
    const ayaId = searchParams.get("ayaId") ?? "";
    const type = (searchParams.get("type") ?? "") as RelationType;
    if (!chapterId || !ayaId || !type) {
        return Response.json({
            status: 400,
            message: "Bad request (INVALID PARAMETERS)",
        });
    }
    const searchData: Partial<IRelation> = {
        chapterId: parseInt(chapterId, 10),
        ayaId: parseInt(ayaId, 10),
        type: type,
    };
    await connect(process.env.MONGODB_URL ?? "");
    const searchModel = await Relation.find(searchData).exec();
    if (searchModel.length === 0) {
        return Response.json({
            status: 404,
            message: "Not found",
        });
    }

    const data: Partial<IRelation>[] = [];
    searchModel.forEach((item) => {
        data.push({
            chapterId: item.chapterId,
            ayaId: item.ayaId,
            type: item.type,
            relateToBook: item.relateToBook,
            relateToChapter: item.relateToChapter,
            relateToNumber: item.relateToNumber,
            like: item.like,
        });
    });
    return Response.json({
        status: 200,
        data: data,
    });
}
