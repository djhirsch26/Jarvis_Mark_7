docker build --tag=jarvis .

docker run -d -p 3030:22 -v /Users/daniel/Documents/Jarvis/Jarvis_Mark_7/Docker:/home/jarvis/Documents -v /Users/daniel/Documents:/var/jail/Documents -v    /Users/daniel/Documents/SAFC/CoChair:/home/jarvis/GCloud/Documents/SAFC/CoChair -v  /Users/daniel/Documents/ELL:/home/jarvis/GCloud/Documents/ELL -v                                                    /Users/daniel/Documents/SAFC/Forms:/home/jarvis/GCloud/Documents/SAFC/Forms jarvis:latest
