# Quran Wiki  
Source of https://www.quranWiki.org.
Welcome to contribute by adding issue or pull request
## Development
We used Next.js 14.0.4 (it needs node version > 18.17)
- Please add `app/constant.ts`  with below lines:
```javascript
export const dbUrl = `mongodb://127.0.0.1:27017/quranwiki`; // MongoDB URL
export const featureAyaDate = false; // Not implemented: allow to add verse's revealation date and story
export const featureBookmark = false; // Not implemented: allow to Verse to user bookmark

export const FEEDBACK_INTERVAL = 1000 * 60 * 5; // Valid interval between feedbacks
export const RELATION_ADD_INTERVAL = 1000 * 20; // Valid interval between adding relations
export const RELATION_LIKE_INTERVAL = 1000 * 20; // Valid interval between liking relations
```

- `npm install`
- `npm run start`

## Resources:
 - Icons: https://fonts.google.com/icons?icon.platform=web and Quran.com
 - Hadith source: https://github.com/A7med3bdulBaset/hadith-json
 - Quran source: https://tanzil.net
 - Audio source: https://everyayah.com/

## TODO
- Improve UI
- Have Mobile App 
- Use AI to find relation between Quran verses