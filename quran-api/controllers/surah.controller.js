import cleanText from "../utils/cleanText.utils.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import axios from "axios";
import { Surah } from "../models/surah.model.js";

const getSurahById = asyncHandler(async (req, res, next) => {
  const chapter_id = req.params.id;

  // Hit chapter api to get chapter info
  const chapterResponse = await axios.get(`https://api.quran.com/api/v4/chapters/${chapter_id}`);
  console.log("Chapter Response: ", chapterResponse);
  const surahName = chapterResponse.data.chapter.name_simple;
  const revelationPlace = chapterResponse.data.chapter.revelation_place;

  // check if surah exist in DB
  const alreadyExist = await Surah.findOne({
    surahNumber: chapter_id
  })

  if (alreadyExist) {
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          alreadyExist,
          "Surah data fetched successfully"
        )
      )
  }

  // first request to get all pages
  const surah_URL = `https://api.quran.com/api/v4/verses/by_chapter/${chapter_id}?fields=text_indopak&translations=95,97&page=1`;

  const firstResponse = await axios.get(surah_URL);

  const total_pages = firstResponse.data.pagination.total_pages;

  let versesArr = [];

  for (let page = 1; page <= total_pages; page++) {
    const url = `https://api.quran.com/api/v4/verses/by_chapter/${chapter_id}?fields=text_indopak&translations=95,97&page=${page}`;

    const response = await axios.get(url);

    const verseArr = response.data.verses;

    verseArr.forEach((verse) => {
      const verseNumber = verse.verse_number;
      const arabicText = verse.text_indopak;
      const englishText = verse.translations[0].text;
      const urduText = verse.translations[1].text;

      versesArr.push({
        verse_number: verseNumber,
        arabic_text: arabicText,
        englishTranslation: { language: "en", text: cleanText(englishText)},
        urduTranslation: { language: "ur", text: cleanText(urduText)}
      });
    })
  }

  const surah = await Surah.create({
    surahName: surahName,
    revelationPlace: revelationPlace,
    surahNumber: chapter_id,
    verses: versesArr
  })

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        surah,
        "Surah data fetched successfully"
      )
    )
}
)

export { getSurahById }




// // Debugging
// console.log("Response data: ", response.data);
// console.log("Response data with pagination: ", response.data.pagination.total_pages);

// console.log("Verses: ", response.data.verses);
// console.log("Verses Data: ", response.data.verses[0]);

// console.log("Verse key: ", response.data.verses[0].verse_key);
// console.log("Verse number: ", response.data.verses[0].verse_number);
// console.log("Arabic text: ", response.data.verses[0].text_indopak);
// console.log("English text: ", response.data.verses[0].translations[0].text);
// console.log("Urdu text: ", response.data.verses[0].translations[1].text);

// const englishText = response.data.verses[i].translations[0].text;
// const urduText = response.data.verses[i].translations[1].text

// const arabicText = response.data.verses[i].text_indopak;
// const cleanEnglishText = cleanText(englishText);
// const cleanUrduText = cleanText(urduText)


// const verseArr = response.data.verses;
// for (let i = 0; i < verseArr.length; i++) {
//   const verseNumber = response.data.verses[i].verse_number;
//   const arabicText = response.data.verses[i].text_indopak;
//   const englishText = response.data.verses[i].translations[0].text;
//   const urduText = response.data.verses[i].translations[1].text;

//   const cleanEnglishText = cleanText(englishText);
//   const cleanUrduText = cleanText(urduText);

//   // Degugging
//   console.log("After removing english foot_notes: ", cleanEnglishText);
//   console.log("After removing urdu foot_notes foot_notes: ", cleanUrduText);


// Extract data
// let verses = [];
// const verseArr = response.data.verses;
// for (let i = 0; i < verseArr.length; i++) {
//   const verseNumber = response.data.verses[i].verse_number;
//   const arabicText = response.data.verses[i].text_indopak;
//   const englishText = response.data.verses[i].translations[0].text;
//   const urduText = response.data.verses[i].translations[1].text;

//   const cleanEnglishText = cleanText(englishText);
//   const cleanUrduText = cleanText(urduText);

//   verses.push({verseNumber, arabicText, cleanEnglishText, cleanUrduText});
//   // Degugging
//   console.log("After removing english foot_notes: ", cleanEnglishText);
//   console.log("After removing urdu foot_notes foot_notes: ", cleanUrduText);

// }

// send response
// return res
//   .status(200)
//   .json(
//     new ApiResponse(
//       200,
//       {
//         "surah_name": `Chapter${chapter_id}`,
//         "verses": verses.map((verse) => ({
//             "verse_number": verse.verseNumber,
//             "arabic_text": verse.arabicText,
//             "english_translation": verse.cleanEnglishText,
//             "urdu_translation": verse.cleanUrduText
//           }))
//       },
//       "Verses fetched successfully"
//     )
//   )