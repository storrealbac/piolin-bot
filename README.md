# piolin-bot
An image generator about "what kind of person are you" memes. Using [ImageMagick](https://imagemagick.org/index.php) as a processor.


## Installation ⚙️
### Prerequisites

ImageMagick : [https://imagemagick.org/index.php]()\
Node.js : [https://nodejs.org/es/]()\
Typescript: [https://www.typescriptlang.org/]()

##### Debian
```bash
# Update all packages
sudo apt update

# ImageMagick
sudo apt install imagemagick

# Node.js, npm and Typescript
sudo apt install nodejs npm
npm install typescript --save-dev

```
##### Arch Linux
```bash
# Update all packages
sudo apt update

# ImageMagick
sudo pacman -S imagemagick

# Node.js, npm and Typescript
sudo pacman -S nodejs npm
npm install typescript --save-dev

```

### Install the project

```bash
# Clone the repository
git clone https://github.com/storrealbac/piolin-bot.git
cd piolin-bot

# Install all node modules
npm install

# Give permissions to ImageMagick scripts 
chmod +x src/processor/caption.sh
chmod +x src/processor/cover.sh
chmod +x src/processor/resize.sh

# Build
npm run build

```

## Usage 🏓

### Before running the bot 
You have two files where you can place information where the bot will obtain the information\
\
__themes.txt__\
These are the topics where the bot will look for images \
_(The bot deletes the selected topic at random so that it will not be repeated the next time)_

```js
balls
chair
carpet
hard disk
bottle
book
```
__names.txt__\
These are the names that are used for the images
```js
John
Steve
Sebastián
Vicente
Gabriel
Julieta
Diego
Marcelo
Javier
```
#### ignorewebsites.txt
It is an additional file to be able to block image sources (like youtube thumbnails) 
```
www.youtube.com
i.ytimg.com
```

### After running the bot 
```bash
# You can use the npm script
npm run run
# Or
./run.sh
```


## Used dependencies 🛠️
- __[typescript](https://www.npmjs.com/package/typescript):__ Strict superset of ECMAScript\
- __[colorette](https://www.npmjs.com/package/colorette):__ Easily set the color and style of text in the terminal.\
- __[dotenv](https://www.npmjs.com/package/dotenv):__ Loads environment variables from .env file\
- __[duckduckgo-images-api](https://www.npmjs.com/package/duckduckgo-images-api):__ DuckDuckGo image-search api for node\
- __[node-libcurl:](https://www.npmjs.com/package/node-libcurl)__ Fastest http(s) client for node

## Contributing
We are open to receiving a pull request, but please open an issue first to discuss how we can change it.

## Project status
The project is still under development.

## Contributors ✍
Sebastián Torrealba [@storrealbac](https://github.com/storrealbac)\
Vicente Villaroel [@ele38](https://github.com/ele38)\
\
If you want to be on the list of contributions you can join us! 😃 


## License
This project is under the license  [GPL-3.0](https://www.gnu.org/licenses/gpl-3.0.html)