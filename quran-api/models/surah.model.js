import mongoose, { Schema } from "mongoose";

const surahSchema = new Schema(
  {
    surahName: {
      type: String,
      required: true,
    },
    surahNumber: {
      type: Number,
      required: true,
      unique: true
    },
    revelationPlace: {
      type: String,
      required: true
    },
    verses: [
      {
        verse_number: {
          type: Number,
          required: true
        },
        arabic_text: {
          type: String,
          required: true
        },
        englishTranslation: {
          language: {type: String, default: "en"},
          text: {type: String, required: true}
        },
        urduTranslation: {
          language: {type: String, default: "ur"},
          text: {type: String, required: true}
        }
      }
    ]
  },

  { timestamps: true }
)


export const Surah = mongoose.model("Surah", surahSchema)

