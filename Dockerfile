FROM ubuntu:latest

# Create app directory
WORKDIR /app

# Install app dependencies
COPY requirements.txt ./

RUN apt-get update && apt-get install -y \
    tesseract-ocr \
    libtesseract-dev \
    python3 \
    python3-pip \
    nodejs \
    npm

RUN apt-get update
RUN apt-get install -y libgl1-mesa-glx

RUN pip install -r requirements.txt

# Bundle app source
COPY . .

EXPOSE 4200
CMD [ "./launch.sh" ]