Linux (Ubuntu 23.10)
### SWAP
sudo dd if=/dev/zero of=swapfile bs=1M count=1024
sudo chmod 600 swapfile
sudo mkswap swapfile
sudo swapon swapfile
echo '/home/karimdavoodi/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab

### Update node
sudo apt update
sudo apt install npm nodejs
# If node < 18.17
sudo npm install -g n
sudo n lts
hash -r
node -v

git clone https://github.com/karimdavoodi/quranWiki.git
cd quranWiki/
npm install --omit=optional
# Create constant file
vi app/constant.ts

npm run build

sudo apt install nginx net-tools
### CERT
sudo mkdir /etc/nginx/ssl
sudo cp www.quranwiki.org.key www.quranwiki.org.crt /etc/nginx/ssl
sudo cp nginxQuran.con /etc/nginx/conf.d/quran.conf
sudo service nginx restart

sudo npm install -g pm2
sudo pm2 start npm --name "quranWiki" -- start
sudo pm2 save
sudo pm2 startup
sudo pm2 list

