INTERNAL_ = {
    'HOME': "/home/pi"
}

CONFIG = {
 "authorized_keys": '${HOME}/.ssh/authorized_keys'
}

def translator(k, v):
    print(INTERNAL_)
    return v.format(INTERNAL_)

CONFIG = {k: translator(k, v) for k, v in CONFIG.items()}
