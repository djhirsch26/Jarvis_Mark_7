INTERNAL_ = {
    'HOME': "/home/pi",
    'JARVIS': "/home/pi/Jarvis",
    'UTIL': "/home/pi/Jarvis/util"
}

CONFIG = {
 "authorized_keys": '{HOME}/.ssh/authorized_keys',
 "dclean.sh": '{UTIL}/dclean.sh'
}

def translator(k, v):
    return v.format(**INTERNAL_)

CONFIG = {k: translator(k, v) for k, v in CONFIG.items()}
PATHS = INTERNAL_.values()
