# user class 
class User:
    def __init__(self, username, email, password):
        self.username = username
        self.email = email
        self.password = password

    def to_dict(self):
        return {
            "username": self.username,
            "email": self.email,
            "password": self.password
        }

    def check_password(self, password):
        return self.password == password
    

# transaction class 
class Transaction:

    def __init__(
        self,
        id,
        username,
        amount,
        category,
        transaction_type,
        date
    ):

        self.id = id
        self.username = username
        self.amount = float(amount)
        self.category = category
        self.transaction_type = transaction_type
        self.date = date

    def to_dict(self):

        return {

            "id": self.id,
            "username": self.username,
            "amount": self.amount,
            "category": self.category,
            "transaction_type": self.transaction_type,
            "date": self.date

        }