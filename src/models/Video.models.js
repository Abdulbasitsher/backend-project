import mongoose , {Schema} from "mongoose";
import mongooseAggregatePeginate from "mongoose-aggregate-paginate-v2"

const videoSchema = new Schema(
    {
         videoFile: {
            type: String,
            required: ture,
            thumbnail: {
                type: String,
                required: true
            },
            title: {
                type: String,
                required: true
            },
            description: {
                type: String,
                required: true
            },
            duration: {
                type: String,
                required: true
            },
            view: {
                type: Number,
                default: 0
            },
            isPublish: {
                type: Boolean,
                default: true
            },
            owner: {
                type: Schema.Types.ObjectId,
                ref: "User"
            }
         }
    },
{timeStamps : true})

videoSchema.plugin(mongooseAggregatePeginate);

export const Video = mongoose.model("Video", videoSchema)