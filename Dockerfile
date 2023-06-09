FROM node:latest

# Create app directory
WORKDIR /app

# Install app dependencies
COPY requirements.txt ./

RUN apt-get update && apt-get install -y \
    tesseract-ocr \
    libtesseract-dev \
    python3 \
    python3-pip \
    npm

RUN apt-get update
RUN apt-get install -y libgl1-mesa-glx

RUN pip install -r requirements.txt

RUN npm install -g @angular/cli

# Bundle app source
COPY . .
CMD [ "./install.sh" ]

EXPOSE 4200
ENTRYPOINT ["bash", "/app/launch.sh"]
