FROM node:8
RUN mkdir /winter-breeze
ADD . /winter-breeze
WORKDIR /winter-breeze
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 80
CMD ["npm", "start"]