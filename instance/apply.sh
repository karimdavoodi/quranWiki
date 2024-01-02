#!/bin/bash
echo 'Apply git'
cd quranWiki
git pull
echo 'Build ....'
npm run build
echo 'Restart... '
sudo pm2 stop quranWiki
sudo pm2 start quranWiki