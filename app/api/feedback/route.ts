import { IFeedback, Feedback } from "../../models";
import { connect } from "mongoose";
import { FEEDBACK_INTERVAL, dbUrl } from "@/app/constant";
import crypto from "crypto";

const hashString = (str: string) => {
    return crypto.createHash("md5").update(str).digest("hex");
};

async function setFeedback(data: IFeedback) {
    try {
        await connect(dbUrl);
        // Check if user does feedback less than FEADBACK_INTERVAL ago
        const date = new Date().getTime() - FEEDBACK_INTERVAL;
        const searchModel = await Feedback.find({
            userHash: data.userHash,
            date: { $gte: date },
        }).exec();
        if (searchModel.length > 0) {
            console.log("feedback already exist:", searchModel[0].date);
            return;
        }

        // Insert new feedback
        const model = new Feedback(data);
        await model?.save();
        console.log(`Save Feedback ${model.id}`);
        return true;
    } catch (error) {
        console.log(error);
    }
    return false;
}

export async function POST(request: Request) {
    const body: IFeedback = await request.json();
    const data = {
        name: body.name.substring(0, 100),
        email: body.email.substring(0, 100),
        message: body.message.substring(0, 2048),
        type: body.type,
        date: new Date().getTime(),
        userHash: hashString(
            request.headers.get("user-agent")! +
                request.headers.get("x-forwarded-for")!
        ),
    };
    const result = await setFeedback(data);
    return Response.json({
        status: result ? 200 : 403,
        message: result ? "success" : "fail",
    });
}
