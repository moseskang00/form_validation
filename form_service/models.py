from sqlalchemy import Boolean, Column, Integer, String
from database import Base

class Form(Base):
    __tablename__ = "forms"

    formID = Column(String, primary_key=True, index=True)
    firstName = Column(String)
    lastName = Column(String)
    email = Column(String)
    gender = Column(String)
    veteran_status = Column(String)
    age = Column(Integer)
    income_range = Column(String)
    previous_homebuyer = Column(Boolean)
