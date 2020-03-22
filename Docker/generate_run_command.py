"""
Sample Ouput:
docker run -d -p 3030:22 -v
 /Users/daniel/Documents/Jarvis/Jarvis_Mark_7/Docker:/home/jarvis/Documents -v
 /Users/daniel/Documents:/var/jail/Documents -v
 /Users/daniel/Documents/SAFC/CoChair:/home/jarvis/GCloud/Documents/SAFC/CoChair -v
 /Users/daniel/Documents/Google:/home/jarvis/GCloud/Documents/Google -v
 /Users/daniel/Documents/ELL:/home/jarvis/GCloud/Documents/ELL -v
 /Users/daniel/Documents/CMR/Team\ Lead:/home/jarvis/GCloud/Documents/CMR/Team\ Lead -v
 /Users/daniel/Documents/Buffalo\ House:/home/jarvis/GCloud/Documents/Buffalo\ House -v
 /Users/daniel/Documents/Important:/home/jarvis/GCloud/Documents/Important -v
 /Users/daniel/Documents/Resume/In-College\ Resume/Daniel_Hirsch_Resume.pdf:/home/jarvis/GCloud/Documents/Resume/In-College\ Resume/Daniel_Hirsch_Resume.pdf -
 /Users/daniel/Documents/Resume/In-College\ Resume/Daniel_Hirsch_Resume\ 8-26.docx:/home/jarvis/GCloud/Documents/Resume/Daniel_Hirsch_Resume\ 8-26.docx -v
 /Users/daniel/Documents/SAFC/Forms:/home/jarvis/GCloud/Documents/SAFC/Forms jarvis:latest
"""

BASE = "docker run -d -p 3030:22 -v"
END = 'jarvis:latest'

ASYMETRIC_MOUNTS = [
('/Users/daniel/Documents/Jarvis/Jarvis_Mark_7/Docker', '/home/jarvis/Documents'),
('/Users/daniel/Documents', '/var/jail/Documents')
]

GCLOUD_MOUNTS = [
'/SAFC/CoChair',
'/SAFC/Forms',
'/Google',
'/ELL',
'/CMR/Team\ Lead',
'/Buffalo\ House',
'/Important',
'/Resume/In-College\ Resume/Daniel_Hirsch_Resume.pdf',
'/Resume/In-College\ Resume/Daniel_Hirsch_Resume\ 8-26.docx'
]
GCLOUD_LOCAL_BASE = '/Users/daniel/Documents'
GCLOUD_REMOTE_BASE = '/home/jarvis/GCloud/Documents'


asymetricMounts = list(map(lambda mount: mount[0]+':'+mount[1], ASYMETRIC_MOUNTS))
asymetricMounts = ' -v '.join(asymetricMounts)

gcloudMounts = list(map(lambda mount: GCLOUD_LOCAL_BASE+mount+':'+GCLOUD_REMOTE_BASE+mount, GCLOUD_MOUNTS))
gcloudMounts = ' -v '.join(gcloudMounts)


command = [BASE, asymetricMounts, '-v', gcloudMounts, END]
command = ' '.join(command)
print(command)
