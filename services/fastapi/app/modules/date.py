"""
This module provides utility function for formatting date data

Includes: 
    -Dictionary for converting numerical date values to English month strings
    -Dictionary for date suffixes 
    -Function for converting a ISO 8601 date to human readable "MM DD, YYYY"
"""

date_format = {
    1: 'January',
    2:'February',
    3:'March',
    4:'April',
    5:'May',
    6:'June',
    7:'July',
    8:'August',
    9:'September',
    10:'October',
    11:'November',
    12:'December',
}

date_suffix = {
    1: 'st',
    2: 'nd',
    3: 'rd',
    11: 'th',
    12: 'th',
    13: 'th'
}
def format_date(date : str):
    '''Transfer from ISO 8601 2025-05-22T22:13:13+00:00 to May 22, 2025'''
    date_list = date.split("-")
    month = date_format.get(int(date_list[1]))
    day_list = date_list[2].split('T')
    day = day_list[0]

    # is day format '0X' ? then convert to 'X'
    if day[0] == '0':
        day = day[-1]
    
    # is day suffix an exception? set suffix in dictionary
    if int(day) in date_suffix:
        suffix = date_suffix.get(int(day))
    elif int(day[-1]) in date_suffix:
        suffix = date_suffix.get(int(day[-1]))

    # if not special suffix exception, suffix is 'th'
    else:
        suffix = 'th'
    
    return month + " " +  day + suffix + ", "+ date_list[0]