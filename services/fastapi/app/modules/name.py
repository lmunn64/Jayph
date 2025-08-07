def get_review_name(fn : str, ln : str):
    if ln is not None:
        lnl  = list(ln)
        # FIRSTNAME L.
        return fn + " " + lnl[0] + "." 
    return fn
    
