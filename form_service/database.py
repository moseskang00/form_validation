from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy_utils import database_exists, create_database
from sqlalchemy.ext.declarative import declarative_base
import os
from dotenv import load_dotenv

load_dotenv()

DB_USER = os.getenv("DB_USER", 'postgres')
DB_PASSWORD = os.getenv("DB_PASSWORD", 'hyunwoo')
DB_HOST = os.getenv("DB_HOST", 'localhost')
DB_PORT = os.getenv("DB_PORT", '5432')
DB_NAME = os.getenv("DB_NAME", 'form_db')

Base = declarative_base()

def get_engine():
    DATABASE_URL = f"postgresql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"
    if not database_exists(DATABASE_URL):
        create_database(DATABASE_URL)
    engine = create_engine(DATABASE_URL, echo=False, pool_size=50)
    return engine

engine = get_engine()

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
