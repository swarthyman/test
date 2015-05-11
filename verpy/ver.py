#
#  _   _ ___  _  _    ___  _  __
# | | / / __|| |/_)  |   |\ \/ /
# | |/ /| __|| |  _  | '_| /  /
# |___/ |___/|_| |_| |_|  /_ /
#
#
# Davíð Helgason <dabbihelgas@gmail.com>
#

import sys
from pathlib import Path
import hashlib

# Calculated hashes of files are stored in a file with this name
FILE_SIGNATURE = '.verpy'

def githash(data):
    s = hashlib.sha1()
    s.update(('blob %u\0' % len(data)).encode('utf-8'))
    s.update(data)
    return s.hexdigest()

def sha256data(data):
    s = hashlib.sha256()
    s.update(data)
    return s.hexdigest()

def main():

    if len(sys.argv) < 2:
        print('Usage: verpy {calc [-r] | verify [-r]} PATH')
        return
    pathstr = sys.argv[1]
    p = Path(pathstr)

    files = []
    dirs = []

    if p.is_dir():
        for x in p.iterdir():
            if x.is_dir():
                dirs += [str(x)]
            else:
                files += [str(x)]
    else:
        files += [pathstr]

    

    if FILE_SIGNATURE in files:
        files.remove(FILE_SIGNATURE)
    else:
        print('OH SHIT!')

    hashes = []

    for f in files:
        with open(f, 'rb') as fi:
            hashes += ['SHA256(' + f + ')= ' + sha256data(fi.read())]
        fi.closed

    hashes.sort()

    for h in hashes:
        print(h)



    with open(FILE_SIGNATURE, 'w') as of:
        for h in hashes:
            of.write(h + '\n')

if __name__ == '__main__':
    main()