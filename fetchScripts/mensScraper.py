import requests
from bs4 import BeautifulSoup
import json
import csv


teamLinkList = []
filePath = "Stats/Men/Season/2019-2020.csv"

def fetchMensTeams():
    url = "https://www.curlingzone.com/teams.php?ey=2020&et=81#1"
    response = requests.get(url)

    if response.status_code == 200:
        soup = BeautifulSoup(response.text, "html.parser")

    

    teamLinks = soup.find_all("a", attrs={"class": "teamlink"})

    #Collects all the links to the different teams and adds them to the list teamLinkList
    for val in teamLinks:
        get_val = val['href']
        
        teamLinkList.append(f"https://www.curlingzone.com/{get_val}")
    
    # print(teamLinkList)
    print('now fetching data')
    # with open('mensteams.txt', 'w') as f:
    #     for line in teamLinkList:
    #         f.write(f"{line}\n")


    

    fetchData()

# TODO
# Adjust all the things with records to be percentages instead
#Adjust the order of stats


def fetchData():
    f = open(filePath, 'w')
    
    f.write("Team, GamesPlayed, Wins, Losses, Ties, PCT, HammerEfficiency, ExtraEndHammer, ExtraEndSteal, Ends, PointsFor, PointsAgainst, PointsFor/Game, PointsAgainst/Game, AvgDiff, HammerPF/E, HammerPA/E, NoHammerPF/E, NoHammerPA/E, EndsFor/Game, EndsAgainst/Game, PointsFor/End, PointsAgainst/End, BigEnds/Game, StealDefence, ForceEfficiency, StealEfficiency \n")   
    noduplicatelist = list(dict.fromkeys(teamLinkList))

    for item in noduplicatelist:
        #gets the current index value of item
        indx = noduplicatelist.index(item)
        print(indx)

        url = noduplicatelist[indx]

        response = requests.get(url)

        if response.status_code == 200:
            soup = BeautifulSoup(response.text, "html.parser")


        #define variables for each piece of data
        teamName = soup.find("a", attrs={"name": "roster"})
        wins = soup.find("td", attrs={"data-th": "W"})
        ties = soup.find("td", attrs={"data-th": "T"})

        losses = soup.find("td", attrs={"data-th": "L"})
        pct = soup.find("td", attrs={"data-th": "PCT"})
        stolenWins = soup.find("td", attrs={"data-th": "STL"})
        eeh = soup.find("td", attrs={"data-th": "EEH"})
        ees = soup.find("td", attrs={"data-th": "EES"})
        ends = soup.find("td", attrs={"data-th": "ENDs"})
        pa = soup.find("td", attrs={"data-th": "PA"})
        pf = soup.find("td", attrs={"data-th": "PF"})
        pfg = soup.find("td", attrs={"data-th": "PF/G"})
        pag = soup.find("td", attrs={"data-th": "PA/G"})
        avgDiff = soup.find("td", attrs={"data-th": "+/-"})
        pag = soup.find("td", attrs={"data-th": "PA/G"})
        efg = soup.find("td", attrs={"data-th": "EF/G"})
        eag = soup.find("td", attrs={"data-th": "EA/G"})
        pae = soup.find("td", attrs={"data-th": "PA/E"})
        beg = soup.find("td", attrs={"data-th": "BE/G"})
        he = soup.find("td", attrs={"data-th": "HE"})
        sd = soup.find("td", attrs={"data-th": "SD"})
        pag = soup.find("td", attrs={"data-th": "PA/G"})
        fe = soup.find("td", attrs={"data-th": "FE"})
        se = soup.find("td", attrs={"data-th": "SE"})
        


        
        pfe = soup.find("td", attrs={"data-th": "PF/E"})
        print(pfe)


        table = soup.find_all("table", attrs={"class": 'rwd-table'})

        if len(table) >= 4:
            hammerTable = table[2]
            stealTable = table[3]


        fe = stealTable.find('td', attrs={'data-th': 'HE'})
        se = stealTable.find('td', attrs={'data-th': 'SD'})
        StealPFE = stealTable.find('td', attrs={'data-th': 'PF/E'})
        StealPAE = stealTable.find('td', attrs={'data-th': 'PA/E'})

        HammerPAE = hammerTable.find('td', attrs={'data-th': 'PA/E'})
        HammerPFE = hammerTable.find('td', attrs={'data-th': 'PF/E'})



        
        

        print(wins)


        if HammerPFE != None:
            HammerPFE = hammerTable.find("td", attrs={"data-th": "PF/E"}).get_text(strip=True)


        if HammerPAE != None:
            HammerPAE = hammerTable.find("td", attrs={"data-th": "PA/E"}).get_text(strip=True)

        if StealPFE != None:
            StealPFE = stealTable.find("td", attrs={"data-th": "PF/E"}).get_text(strip=True)


        if StealPAE != None:
            StealPAE = stealTable.find("td", attrs={"data-th": "PA/E"}).get_text(strip=True)

        if fe != None:
            fe = stealTable.find("td", attrs={"data-th": "HE"}).get_text(strip=True)

        if se != None:
            se = stealTable.find("td", attrs={"data-th": "SD"}).get_text(strip=True)
        
        if teamName != None:
            teamNameUnfiltered = soup.find("a", attrs={"name": "roster"}).get_text(strip=True)

            if teamNameUnfiltered.startswith("TEAM "):
                teamName = teamNameUnfiltered[5:]
            else:
                teamName = teamNameUnfiltered



        if wins != None:
            wins = soup.find("td", attrs={"data-th": "W"}).get_text(strip=True)

        if ties != None:
            ties = soup.find("td", attrs={"data-th": "T"}).get_text(strip=True)


        if losses != None:
            losses = soup.find("td", attrs={"data-th": "L"}).get_text(strip=True)

        if pct != None:
            pct = soup.find("td", attrs={"data-th": "PCT"}).get_text(strip=True)

        if stolenWins != None:
            stolenWins = soup.find("td", attrs={"data-th": "STL"}).get_text(strip=True)

        if eeh != None:

            eehRecord = soup.find("td", attrs={"data-th": "EEH"}).get_text(strip=True)


            if eehRecord != '--' and eehRecord != '-' and eehRecord != '-':
            # Split the record into wins and losses
                eehWins, eehLosses = map(int, eehRecord.split('-'))

                # Calculate the total number of games
                total_games = eehWins + eehLosses

                # Calculate the win percentage
                if total_games > 0:
                    eeh = (eehWins / total_games)
                else:
                    eeh = 0  # Handle the case where there are no games


        if ees != None:
            #turn into record
            eesRecord = soup.find("td", attrs={"data-th": "EES"}).get_text(strip=True)

            if eehRecord != '--' and eehRecord != '-' and eehRecord != '-':

            # Split the record into wins and losses
                eesWins, eesLosses = map(int, eesRecord.split('-'))

                # Calculate the total number of games
                total_games = eesWins + eesLosses

                # Calculate the win percentage
                if total_games > 0:
                    ees = (eesWins / total_games)
                else:
                    ees = 0  # Handle the case where there are no games







        if ends != None:
            ends = soup.find("td", attrs={"data-th": "ENDs"}).get_text(strip=True)

        if pa != None:
            pa = soup.find("td", attrs={"data-th": "PA"}).get_text(strip=True)

        if pf != None:
            pf = soup.find("td", attrs={"data-th": "PF"}).get_text(strip=True)

        if pfg != None:
            pfg = soup.find("td", attrs={"data-th": "PF/G"}).get_text(strip=True)

        if pag != None:
            pag = soup.find("td", attrs={"data-th": "PA/G"}).get_text(strip=True)

        if avgDiff != None:
            avgDiff = soup.find("td", attrs={"data-th": "+/-"}).get_text(strip=True)

        if efg != None:
            efg = soup.find("td", attrs={"data-th": "EF/G"}).get_text(strip=True)

        if eag != None:
            eag = soup.find("td", attrs={"data-th": "EA/G"}).get_text(strip=True)

        if pfe != None:
            pfe = soup.find("td", attrs={"data-th": "PF/E"}).get_text(strip=True)

        if pae != None:
            pae = soup.find("td", attrs={"data-th": "PA/E"}).get_text(strip=True)

        if beg != None:
            beg = soup.find("td", attrs={"data-th": "BE/G"}).get_text(strip=True)

        if he != None:
            he = soup.find("td", attrs={"data-th": "HE"}).get_text(strip=True)

        if sd != None:
            sd = soup.find("td", attrs={"data-th": "SD"}).get_text(strip=True)


        if wins != None and losses != None and ties != None and wins != '' and losses != '' and ties != '' and wins != '--' and losses != '--' and ties != '--' and wins != '-' and losses != '-' and ties != '-' and wins != '---' and losses != '---' and ties != '---': 
            gp = int(wins) + int(losses) + int(ties)

        if wins == None:
            print('no data, skip')
        elif wins == "":
            print('no data, skip')
        else:


            f.write(f"{teamName}, {gp}, {wins}, {losses}, {ties}, {pct}, {he}, {eeh}, {ees}, {ends}, {pf}, {pa}, {pfg}, {pag}, {avgDiff}, {HammerPFE}, {HammerPAE}, {StealPFE}, {StealPAE}, {efg}, {eag}, {pfe}, {pae}, {beg}, {sd}, {fe}, {se} \n")

        print(teamName)



        




fetchMensTeams()