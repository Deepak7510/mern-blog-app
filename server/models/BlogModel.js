import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Category",
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    approval: {
      type: Boolean,
      enum: [true, false],
      default: true,
    },
    status: {
      type: Boolean,
      enum: [true, false],
      default: true,
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt
);

const BlogModel = mongoose.model("Blog", blogSchema);

export default BlogModel; // Export Model
