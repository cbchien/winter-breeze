FROM node:8
RUN mkdir /winter-breeze
WORKDIR /winter-breeze
COPY package.json /winter-breeze
RUN npm install
COPY . /winter-breeze
EXPOSE 80 3000
CMD ["npm", "start"]