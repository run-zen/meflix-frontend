export const filters = {
    genres: [
        { value: "All", label: "All genres" },
        { value: "Action", label: "Action" },
        { value: "Adventure", label: "Adventure" },
        { value: "Animation", label: "Animation" },
        { value: "Biography", label: "Biography" },
        { value: "Comedy", label: "Comedy" },
        { value: "Crime", label: "Crime" },
        { value: "Documentary", label: "Documentary" },
        { value: "Drama", label: "Drama" },
        { value: "Family", label: "Family" },
        { value: "Fantasy", label: "Fantasy" },
        { value: "Film-Noir", label: "Film-Noir" },
        { value: "History", label: "History" },
        { value: "Horror", label: "Horror" },
        { value: "Music", label: "Music" },
        { value: "Musical", label: "Musical" },
        { value: "Mystery", label: "Mystery" },
        { value: "News", label: "News" },
        { value: "Romance", label: "Romance" },
        { value: "Sci-Fi", label: "Sci-Fi" },
        { value: "Short", label: "Short" },
        { value: "Sport", label: "Sport" },
        { value: "Talk-Show", label: "Talk-Show" },
        { value: "Thriller", label: "Thriller" },
        { value: "War", label: "War" },
        { value: "Western", label: "Western" },
    ],
    rating: [
        { value: "All", label: "All" },
        { value: "9", label: "9+" },
        { value: "8", label: "8+" },
        { value: "7", label: "7+" },
        { value: "6", label: "6+" },
    ],
    sortby: [
        { value: "default", label: "Default" },
        { value: "newreleased", label: "Newest to Oldest" },
        { value: "oldreleased", label: "Oldest to Newest" },
        { value: "imdb.rating", label: "Imdb" },
    ],
    languages: [
        { value: "All", label: "All Languages" },

        { value: "Bengali", label: "Bengali" },

        { value: "Chinese", label: "Chinese" },

        { value: "Czech", label: "Czech" },
        { value: "Danish", label: "Danish" },
        { value: "Dari", label: "Dari" },
        { value: "Dinka", label: "Dinka" },
        { value: "Dutch", label: "Dutch" },

        { value: "Egyptian (Ancient)", label: "Egyptian (Ancient)" },
        { value: "English", label: "English" },
        { value: "Esperanto", label: "Esperanto" },

        { value: "Filipino", label: "Filipino" },
        { value: "Finnish", label: "Finnish" },

        { value: "French", label: "French" },

        { value: "German", label: "German" },

        { value: "Greek", label: "Greek" },

        { value: "Gujarati", label: "Gujarati" },

        { value: "Haitian", label: "Haitian" },

        { value: "Hawaiian", label: "Hawaiian" },

        { value: "Hindi", label: "Hindi" },

        { value: "Hungarian", label: "Hungarian" },

        { value: "Indonesian", label: "Indonesian" },

        { value: "Irish", label: "Irish" },
        { value: "Italian", label: "Italian" },
        { value: "Japanese", label: "Japanese" },

        { value: "Korean", label: "Korean" },

        { value: "Latin", label: "Latin" },
        { value: "Latvian", label: "Latvian" },
        { value: "Lingala", label: "Lingala" },
        { value: "Lithuanian", label: "Lithuanian" },
        { value: "Low German", label: "Low German" },
        { value: "Luxembourgish", label: "Luxembourgish" },
        { value: "Macedonian", label: "Macedonian" },
        { value: "Malay", label: "Malay" },
        { value: "Malayalam", label: "Malayalam" },
        { value: "Malinka", label: "Malinka" },
        { value: "Maltese", label: "Maltese" },
        { value: "Mandarin", label: "Mandarin" },
        { value: "Manipuri", label: "Manipuri" },

        { value: "Marathi", label: "Marathi" },

        { value: "Mongolian", label: "Mongolian" },

        { value: "Neapolitan", label: "Neapolitan" },

        { value: "Nepali", label: "Nepali" },

        { value: "North American Indian", label: "North American Indian" },
        { value: "Norwegian", label: "Norwegian" },

        { value: "Old English", label: "Old English" },
        { value: "Oriya", label: "Oriya" },
        { value: "Panjabi", label: "Panjabi" },
        { value: "Pawnee", label: "Pawnee" },
        { value: "Persian", label: "Persian" },
        { value: "Peul", label: "Peul" },
        { value: "Polish", label: "Polish" },
        { value: "Polynesian", label: "Polynesian" },
        { value: "Portuguese", label: "Portuguese" },

        { value: "Quechua", label: "Quechua" },
        { value: "Quenya", label: "Quenya" },
        { value: "Rajasthani", label: "Rajasthani" },
        { value: "Romanian", label: "Romanian" },
        { value: "Romany", label: "Romany" },
        { value: "Russian", label: "Russian" },
        { value: "Russian Sign Language", label: "Russian Sign Language" },
        { value: "Ryukyuan", label: "Ryukyuan" },

        { value: "Samoan", label: "Samoan" },
        { value: "Sanskrit", label: "Sanskrit" },
        { value: "Sardinian", label: "Sardinian" },
        { value: "Scanian", label: "Scanian" },
        { value: "Scots", label: "Scots" },
        { value: "Scottish Gaelic", label: "Scottish Gaelic" },
        { value: "Serbian", label: "Serbian" },
        { value: "Serbo-Croatian", label: "Serbo-Croatian" },
        { value: "Shanghainese", label: "Shanghainese" },

        { value: "Sicilian", label: "Sicilian" },
        { value: "Sign Languages", label: "Sign Languages" },
        { value: "Sindarin", label: "Sindarin" },
        { value: "Sinhalese", label: "Sinhalese" },
        { value: "Sioux", label: "Sioux" },
        { value: "Slovak", label: "Slovak" },
        { value: "Slovenian", label: "Slovenian" },
        { value: "Somali", label: "Somali" },

        { value: "Southern Sotho", label: "Southern Sotho" },
        { value: "Spanish", label: "Spanish" },

        { value: "Swedish", label: "Swedish" },
        { value: "Swiss German", label: "Swiss German" },

        { value: "Tamil", label: "Tamil" },

        { value: "Telugu", label: "Telugu" },
        { value: "Thai", label: "Thai" },
        { value: "Tibetan", label: "Tibetan" },

        { value: "Turkish", label: "Turkish" },
        { value: "Turkmen", label: "Turkmen" },

        { value: "Ukrainian", label: "Ukrainian" },

        { value: "Urdu", label: "Urdu" },
        { value: "Uzbek", label: "Uzbek" },
        { value: "Vietnamese", label: "Vietnamese" },

        { value: "Welsh", label: "Welsh" },
    ],
};
