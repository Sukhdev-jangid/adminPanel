import mongoose,{Document,Schema} from "mongoose";

export interface ICourse extends Document {
    title: string;
    description: string;
    price: number;
    instructor:string;
    category: string;
    thumbnail?: string;
    published: boolean;
}

const courseSchema = new Schema<ICourse>({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    instructor: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    thumbnail: {
        type: String,
        default: "",
    },
    published: {
        type: Boolean,
        default: false,
        required: true,
    },    
}, { timestamps: true });

export default mongoose.model<ICourse>("Course", courseSchema);