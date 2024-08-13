import requests
from bs4 import BeautifulSoup
import json
import csv


teamLinkList = []
# filePath = "Stats/Women/Season/2019-2020.csv"



def fetchMensTeams(filePath, url):
    # url = "https://www.curlingzone.com/statistics.php?ey=2020&et=81#1"
    response = requests.get(url)

    if response.status_code == 200:
        soup = BeautifulSoup(response.text, "html.parser")

    
    table = soup.find_all('table', attrs={'class': 'rwd-table'})

    tableToSearch = table[1]

    # Extract rows from the table
    rows = tableToSearch.find_all('tr')

    f = open(filePath, 'w')
    f.write("Team, GamesPlayed, Wins, Losses, Ties, PCT, HammerEfficiency, ExtraEndHammer, ExtraEndSteal, Ends, PointsFor, PointsAgainst, PointsFor/Game, PointsAgainst/Game, AvgDiff, HammerPF/E, HammerPA/E, NoHammerPF/E, NoHammerPA/E, EndsFor/Game, EndsAgainst/Game, PointsFor/End, PointsAgainst/End, BigEnds/Game, StealDefence, ForceEfficiency, StealEfficiency \n")   


    # Prepare lists to store data
    wins = []
    losses = []

    # Loop through rows and extract the data from the second and third columns
    for row in rows[1:]:  # Skip the header row
        columns = row.find_all('td')
        if len(columns) >= 3:
            team = columns[1].text.strip()
            win = columns[3].text.strip()
            loss = columns[4].text.strip()
            tie = columns[5].text.strip()
            gp = int(win) +int(loss) + int(tie)
            pct = columns[6].text.strip()
            eeh = columns[10].text.strip()
            ees = columns[11].text.strip()

            if eeh != '--' and ees != '-' and eeh != '-':
            # Split the record into wins and losses
                eehWins, eehLosses = map(int, eeh.split('-'))
                # print('doing the aajklds')
                # Calculate the total number of games
                total_games = eehWins + eehLosses

                # Calculate the win percentage
                if total_games > 0:
                    eeh = (eehWins / total_games)
                else:
                    eeh = 0  # Handle the case where there are no games


            if ees != None:
                #turn into record

                if eeh != '--' and eeh != '-' and eeh != '-':

                # Split the record into wins and losses
                    eesWins, eesLosses = map(int, ees.split('-'))

                    # Calculate the total number of games
                    total_games = eesWins + eesLosses

                    # Calculate the win percentage
                    if total_games > 0:
                        ees = (eesWins / total_games)
                    else:
                        ees = 0  # Handle the case where there are no games




            f.write(f'{team}, {gp}, {win}, {loss}, {tie}, {pct}, N/A, {eeh}, {ees}, N/A, N/A, N/A, N/A, N/A, N/A, N/A, N/A, N/A, N/A, N/A, N/A, N/A, N/A, N/A, N/A, N/A, N/A, \n')

            

fetchList = {
    # "Stats/Men/Season/2018-2019.csv": 'https://www.curlingzone.com/statistics.php?ey=2019&et=81#1',
    # "Stats/Men/Season/2017-2018.csv": 'https://www.curlingzone.com/statistics.php?ey=2018&et=81#1',
    # "Stats/Men/Season/2016-2017.csv": 'https://www.curlingzone.com/statistics.php?ey=2017&et=81#1',
    # "Stats/Men/Season/2015-2016.csv": 'https://www.curlingzone.com/statistics.php?ey=2016&et=81#1',
    # "Stats/Men/Season/2014-2015.csv": 'https://www.curlingzone.com/statistics.php?ey=2015&et=81#1',
    # "Stats/Men/Season/2013-2014.csv": 'https://www.curlingzone.com/statistics.php?ey=2014&et=81#1',
    # "Stats/Men/Season/2012-2013.csv": 'https://www.curlingzone.com/statistics.php?ey=2013&et=81#1',
    # "Stats/Men/Season/2011-2012.csv": 'https://www.curlingzone.com/statistics.php?ey=2012&et=81#1',
    # "Stats/Men/Season/2010-2011.csv": 'https://www.curlingzone.com/statistics.php?ey=2011&et=81#1',

    "Stats/Women/Season/2018-2019.csv": 'https://www.curlingzone.com/statistics.php?ey=2019&et=82#1',
    "Stats/Women/Season/2017-2018.csv": 'https://www.curlingzone.com/statistics.php?ey=2018&et=82#1',
    "Stats/Women/Season/2016-2017.csv": 'https://www.curlingzone.com/statistics.php?ey=2017&et=82#1',
    "Stats/Women/Season/2015-2016.csv": 'https://www.curlingzone.com/statistics.php?ey=2016&et=82#1',
    "Stats/Women/Season/2014-2015.csv": 'https://www.curlingzone.com/statistics.php?ey=2015&et=82#1',
    "Stats/Women/Season/2013-2014.csv": 'https://www.curlingzone.com/statistics.php?ey=2014&et=82#1',
    "Stats/Women/Season/2012-2013.csv": 'https://www.curlingzone.com/statistics.php?ey=2013&et=82#1',
    "Stats/Women/Season/2011-2012.csv": 'https://www.curlingzone.com/statistics.php?ey=2012&et=82#1',
    "Stats/Women/Season/2010-2011.csv": 'https://www.curlingzone.com/statistics.php?ey=2011&et=82#1',


}

for key, value in fetchList.items():
    fetchMensTeams(key, value)
    print(value, key)

