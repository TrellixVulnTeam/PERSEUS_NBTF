import getpass
from colorama import Fore
import shutil
import os,time,sys
import platform

username=getpass.getuser()
if platform.system() == "Windows":
    root=f"C:\\Users\\{username}\\Desktop\\PERSEUS\\"
    root_path=f"{root}\\tools\\"
    root_wsl= f"/mnt/c/Users/{os.getenv('username')}/Desktop/PERSEUS/tools/LinkFinder/linkfinder.py"
    root_wsl2= f"/mnt/c/Users/{os.getenv('username')}/Desktop/PERSEUS/tools/SecretFinder/SecretFinder.py"
else:
    root=f"/home/{username}/Scrivania/PERSEUS/" 
    root_path=f"{root}/tools/"

ok=f"{Fore.GREEN}[INFO]{Fore.WHITE}"
error=f"{Fore.RED}[ERROR]{Fore.WHITE}"
warning=f"{Fore.YELLOW}[WARNING]{Fore.WHITE}"
funzionante=f"{Fore.GREEN}[ENABLED]{Fore.WHITE}"
non_funzionante=f"{Fore.RED}[DISABLED]{Fore.WHITE}"
partial=f"{Fore.YELLOW}[PARTIAL ENABLED]{Fore.WHITE}"
apk=f"{Fore.YELLOW}[APK DIR]{Fore.WHITE}"



def intro():
    blue=Fore.GREEN
    print(blue+"\t\t\t\t+=======================================+")
    print(blue+"\t\t\t\t|................PERSEUS................|")
    print(blue+"\t\t\t\t+---------------------------------------+")
    print(blue+"\t\t\t\t|#Author: Claudio Rimensi               |")
    print(blue+"\t\t\t\t|#Date of creation: Unknown ahah '.'    |")
    print(blue+"\t\t\t\t|#The premature optimization is a root  |")
    print(blue+"\t\t\t\t|of all evil.. :)                       |")
    print(blue+"\t\t\t\t+=======================================+")
    print(blue+"\t\t\t\t|................PERSEUS................|")
    print(blue+"\t\t\t\t+---------------------------------------+")


def info():
    blue=Fore.YELLOW
    print(blue+"\t\t\t\t+---------------------------------------+")
    print(blue+"\t\t\t\t|      Use me without abusing me!!!     |")
    print(blue+"\t\t\t\t+=======================================+")

def others_info():

    blue=Fore.GREEN
    print(blue+"\t\t\t\t+---------------------------------------+")
    print(blue+"\t\t\t\t|      Inspired from eWPTX & OWASP      |")
    print(blue+"\t\t\t\t+=======================================+")