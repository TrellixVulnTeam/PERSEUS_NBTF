from lib.config import *
from lib.pt_web import *
from lib.logo import *
import os,time,sys
from colorama import Fore
import webbrowser,getpass
import random
from pathlib import Path
import platform,sys
'''
You must have python3 installed. From shell look if run python3 
If you use Windows platform, you must have wsl installed.
'''


def mobile_run():
    banner_title = random.choice([logo_design_1,logo_design_2,logo_design_3,logo_design_4,logo_design_5,logo_design_6,logo_design_7,logo_design_8])
    print (Fore.RED + banner_title)
    print(Fore.WHITE)
    choose3=input(f"{warning} Run a Mobile Scanner MobSF 1-Yes 2-NO?: ")
    choose3=int(choose3)
    if choose3 == 1:
        if platform.system() == "Windows":
            os.system(f"start C:\\Users\\claud\\OneDrive\\Desktop\\PERSEUS\\mobile_tools\\MobSF\\setup.bat")
            #os.system(f"start C:\\Users\\claud\\OneDrive\\Desktop\\PERSEUS\\mobile_tools\\MobSF\\run.bat 127.0.0.1:8000")
        else:
            os.system("clear")
            time.sleep(1)
    else: pass

def web_run():
    intro()
    info()
    others_info()
    print(Fore.WHITE)
    time.sleep(1)
    scelta=input(f"Tools:\n1) WAF Detection {funzionante}\n2) Check Headers {funzionante}\n3) Enumeration {funzionante}\n4) XSS Payload {funzionante}\n5) SQLMap {funzionante}\n6) Clickjacking {funzionante}\n8) Unrestricted File Upload {funzionante}\n9) Session Hijacking {funzionante}\n10) Automatic Web Scanner NetSpark {funzionante}\n11) HTTP Verb Tampering {funzionante}\n12) Log4J Scanner {funzionante}\n13) Exit\n ---> ")
    scelta=int(scelta)
    if(scelta == 1):
        waf_detection()
        web_run()
    elif(scelta == 2):
        check_header()
        web_run()
    elif(scelta == 3):
        enumeration()
        web_run()
    elif(scelta == 4):
        cross_site_scripting()
        web_run()
    elif(scelta == 5):
        sqlmap()
        web_run()
    elif(scelta == 6):
        clickjacking()
        web_run()
    elif(scelta == 8):
        unrestricted_trick()
        web_run()
    elif(scelta == 9):
        session_hijacking()
        web_run()
    elif(scelta == 10):
        if platform.system() == "Windows":
                os.system(f"start {root_path}\\netspark\\netspark\\Netsparker.exe")
                time.sleep(5)
        else:
            print(f"{error} No OS WIndows detected...")
        if platform.system() == "Windows":
            os.system("cls")
        else:
            os.system("clear")
        web_run()
    elif(scelta==11):
        verb_tampering()
        web_run()
    elif(scelta == 12):
        log4J_shell()
        web_run()
    else:
        sys.exit(0)



def starting():
    intro()
    print("\n")
    info()
    print(Fore.WHITE)
    print("\n\n")
    time.sleep(1)
    scelta0=input(f"(1) Web Application Pentesting {partial}\n(2) Mobile Application Pentesting {non_funzionante}\nChoose: ")
    return scelta0


if __name__=="__main__":
    scelta0=starting()
    scelta0=int(scelta0)
    if scelta0 == 1:
        if platform.system() == "Windows":
            os.system("cls")
        else:
            os.system("clear")
        time.sleep(1)
        web_run()
    else:
        if platform.system() == "Windows":
            os.system("cls")
        else:
            os.system("clear")
        time.sleep(1)
        mobile_run()
       