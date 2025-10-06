import json

# returns the total tax for quote on a property, formatted to .2f
def get_total_tax(taxes):
    default_tax = '$0.00'
    try:
        total_num = sum([item.get('amount') for item in taxes])
        return f'${total_num/100:,.2f}'
    except (json.JSONDecodeError, KeyError, TypeError):
        return default_tax  # Return default if invalid JSON