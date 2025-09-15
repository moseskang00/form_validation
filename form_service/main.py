from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from database import SessionLocal, engine
import models
import uuid
from sqlalchemy.orm import Session
from fastapi import Depends
from fastapi.middleware.cors import CORSMiddleware

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

class FormBase(BaseModel):
    firstName: str
    lastName: str
    email: str
    gender: str
    veteran_status: str
    age: int
    income_range: str
    previous_homebuyer: bool

class Form(FormBase):
    formID: str
    class Config:
        orm_mode = True

@app.get("/")
def root():
    return {"message": "Welcome to the Form Service"}

@app.post("/forms/", response_model=Form)
def create_form(form: FormBase, db: Session = Depends(get_db)):
    db_form = models.Form(
        formID=str(uuid.uuid4()),
        firstName=form.firstName,
        lastName=form.lastName,
        email=form.email,
        gender=form.gender,
        veteran_status=form.veteran_status,
        age=form.age,
        income_range=form.income_range,
        previous_homebuyer=form.previous_homebuyer
    )

    db.add(db_form)
    db.commit()
    db.refresh(db_form)
    return db_form

@app.get("/forms/", response_model=List[Form])
def get_all_forms(db: Session = Depends(get_db)):
    forms = db.query(models.Form).all()
    return forms

@app.get("/forms/{form_id}", response_model=Form)
def get_form(form_id: str, db: Session = Depends(get_db)):
    form = db.query(models.Form).filter(models.Form.formID == form_id).first()
    if form is None:
        raise HTTPException(status_code=404, detail="Form not found")
    return form
