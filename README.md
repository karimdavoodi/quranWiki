# Quran Wiki  
Source of https://www.quranWiki.org
## Development
We used Next.js 14.0.4 (it needs node version > 18.17)
- Please add app/constant.ts with below lines:
'''
export const dbUrl = MONGODB_URL;
export const FEEDBACK_INTERVAL = 1000 * 60 * 5;
export const RELATION_ADD_INTERVAL = 1000 * 20;
export const RELATION_LIKE_INTERVAL = 1000 * 20;
export const featureAyaDate = false;
export const featureTranslate = false;
export const featureBookmark = false;
'''

- `npm install`
- `npm run start`

## Resources:
 - Icons: https://fonts.google.com/icons?icon.platform=web and Quran.com
 - Hadith source: https://github.com/A7med3bdulBaset/hadith-json
 - Quran source: https://tanzil.net

## TODO
- Improve UI
- Have Mobile App 
- Use AI to find relation between Quran verses